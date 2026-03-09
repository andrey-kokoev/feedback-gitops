export interface FeedbackSubmission {
  title: string;
  description: string;
  url?: string;
  userAgent?: string;
  labels?: string[];
}

export interface ConsumerConfig {
  github: {
    pat: string;
    owner: string;
    repo: string;
    labels: string[];
    baseBranch?: string;
  };
}

interface GitHubIssuePayload {
  title: string;
  body: string;
  labels: string[];
}

export function createIssueConsumer<T>(config: ConsumerConfig) {
  return async (batch: MessageBatch<T>): Promise<void> => {
    const failures: string[] = [];

    for (const message of batch.messages) {
      try {
        await processMessage(message.body as FeedbackSubmission, config);
      } catch (error) {
        console.error(`Failed to process message ${message.id}:`, error);
        failures.push(message.id);
      }
    }

    if (failures.length > 0) {
      batch.retryAll();
    } else {
      batch.ackAll();
    }
  };
}

function isValidSubmission(value: unknown): value is FeedbackSubmission {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.title === "string" && item.title.trim().length > 0;
}

async function processMessage(payload: FeedbackSubmission, config: ConsumerConfig): Promise<void> {
  if (!isValidSubmission(payload)) {
    throw new Error("Invalid submission payload");
  }

  const issuePayload = buildIssuePayload(payload, config.github.labels);
  const created = await createGitHubIssue(issuePayload, config.github);
  const labels = issuePayload.labels || [];
  if (labels.includes("agent-execute")) {
    await assignIssueToCopilot(created.number, config.github);
  }
}

function buildIssuePayload(submission: FeedbackSubmission, defaultLabels: string[]): GitHubIssuePayload {
  const labels = [...new Set([...(defaultLabels || []), ...((submission.labels || []).filter(Boolean))])];

  const contextLines: string[] = [];
  if (submission.url) contextLines.push(`URL: ${submission.url}`);
  if (submission.userAgent) contextLines.push(`User-Agent: ${submission.userAgent}`);
  contextLines.push(`Timestamp: ${new Date().toISOString()}`);
  contextLines.push("Source: agent-change-request");
  const description = String(submission.description || "").trim();

  return {
    title: submission.title,
    body: [
      ...(description ? [description, ""] : []),
      "**Context:**",
      ...contextLines.map((line) => `- ${line}`),
    ].join("\n"),
    labels,
  };
}

async function createGitHubIssue(
  payload: GitHubIssuePayload,
  github: { pat: string; owner: string; repo: string },
): Promise<{ number: number; html_url?: string }> {
  const url = `https://api.github.com/repos/${github.owner}/${github.repo}/issues`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${github.pat}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "feedback-gitops-worker",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error (${response.status}): ${errorText}`);
  }

  return await response.json() as { number: number; html_url?: string };
}

async function assignIssueToCopilot(
  issueNumber: number,
  github: { pat: string; owner: string; repo: string; baseBranch?: string },
): Promise<void> {
  const url = `https://api.github.com/repos/${github.owner}/${github.repo}/issues/${issueNumber}/assignees`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${github.pat}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "feedback-gitops-worker",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assignees: ["copilot-swe-agent[bot]"],
      agent_assignment: {
        target_repo: `${github.owner}/${github.repo}`,
        base_branch: github.baseBranch || "main",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Copilot assignment API error (${response.status}): ${errorText}`);
  }
}
