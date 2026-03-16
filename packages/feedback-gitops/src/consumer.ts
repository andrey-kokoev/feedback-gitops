export interface TextFeedbackInput {
  type: "text";
  title: string;
  description: string;
}

export interface AudioFeedbackInput {
  type: "audio";
  audioKey: string;
  mimeType?: string;
  durationMs?: number;
}

export interface FeedbackSubmission {
  submissionId?: string;
  input: TextFeedbackInput | AudioFeedbackInput;
  url?: string;
  userAgent?: string;
  labels?: string[];
  mergePolicy?: 'auto_unblocked' | 'manual';
}

export interface ConsumerConfig {
  github: {
    pat: string;
    owner: string;
    repo: string;
    labels: string[];
    baseBranch?: string;
  };
  audio: {
    bucket: R2Bucket;
    ai?: Ai;
  };
  cancellations?: KVNamespace;
}

interface GitHubIssuePayload {
  title: string;
  body: string;
  labels: string[];
}

interface ResolvedRequestContent {
  title: string;
  description: string;
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
  const input = item.input as Record<string, unknown> | undefined;
  if (!input || typeof input !== "object" || typeof input.type !== "string") return false;
  if (input.type === "text") {
    return typeof input.title === "string" && input.title.trim().length > 0;
  }
  if (input.type === "audio") {
    return typeof input.audioKey === "string" && input.audioKey.trim().length > 0;
  }
  return false;
}

async function processMessage(payload: FeedbackSubmission, config: ConsumerConfig): Promise<void> {
  if (!isValidSubmission(payload)) {
    throw new Error("Invalid submission payload");
  }

  if (payload.submissionId && config.cancellations) {
    const tombstone = await config.cancellations.get(`cancel:${payload.submissionId}`);
    if (tombstone !== null) {
      console.log(`[pipeline:0] submission ${payload.submissionId} cancelled, skipping`);
      if (payload.input.type === "audio") {
        await config.audio.bucket.delete(payload.input.audioKey).catch(() => {});
      }
      return;
    }
  }

  const inputType = payload.input.type;
  console.log(`[pipeline:1] processing message type=${inputType}`);

  const content = await resolveRequestContent(payload, config.audio);
  console.log(`[pipeline:5] content resolved: title="${content.title}" description_len=${content.description.length}`);

  const issuePayload = buildIssuePayload(payload, content, config.github.labels);
  console.log(`[pipeline:6] issue payload built: labels=${JSON.stringify(issuePayload.labels)}`);

  console.log(`[pipeline:7] creating GitHub issue`);
  const created = await createGitHubIssue(issuePayload, config.github);
  console.log(`[pipeline:8] GitHub issue created: #${created.number} url=${created.html_url}`);

  const labels = issuePayload.labels || [];
  if (labels.includes("agent-execute")) {
    await assignIssueToCopilot(created.number, config.github);
  }
  if (payload.input.type === "audio") {
    await config.audio.bucket.delete(payload.input.audioKey);
    console.log(`[pipeline:9] audio object deleted: ${payload.input.audioKey}`);
  }
}

async function resolveRequestContent(
  submission: FeedbackSubmission,
  audio: ConsumerConfig["audio"],
): Promise<ResolvedRequestContent> {
  if (submission.input.type === "text") {
    return {
      title: submission.input.title,
      description: submission.input.description,
    };
  }

  console.log(`[pipeline:2] fetching R2 object: ${submission.input.audioKey}`);
  const object = await audio.bucket.get(submission.input.audioKey);
  if (!object) {
    console.error(`[pipeline:2] R2 object not found: ${submission.input.audioKey}`);
    throw new Error(`Audio object not found: ${submission.input.audioKey}`);
  }
  if (!audio.ai) {
    console.error(`[pipeline:2] AI binding missing`);
    throw new Error("Missing AI binding (Workers AI)");
  }

  const bytes = new Uint8Array(await object.arrayBuffer());
  console.log(`[pipeline:3] R2 object fetched: ${bytes.length} bytes, mimeType=${submission.input.mimeType}`);

  console.log(`[pipeline:4] whisper transcription start`);
  const response = await audio.ai.run("@cf/openai/whisper", {
    audio: Array.from(bytes),
  }) as { text?: string };
  const transcript = String(response?.text || "").trim();
  if (!transcript) {
    console.error(`[pipeline:4] whisper returned no text`);
    throw new Error("Workers AI whisper returned no text");
  }
  console.log(`[pipeline:4] whisper transcription complete: transcript_len=${transcript.length}`);

  return {
    title: deriveTitleFromTranscript(transcript),
    description: transcript,
  };
}

function deriveTitleFromTranscript(transcript: string): string {
  const collapsed = transcript.replace(/\s+/g, " ").trim();
  if (!collapsed) return "Voice request";
  const sentence = collapsed.split(/[.!?]/, 1)[0]?.trim() || collapsed;
  const limited = sentence.split(" ").slice(0, 12).join(" ").trim();
  return limited.length > 80 ? limited.slice(0, 77).trimEnd() + "..." : limited;
}

function buildIssuePayload(
  submission: FeedbackSubmission,
  content: ResolvedRequestContent,
  defaultLabels: string[],
): GitHubIssuePayload {
  const policyLabel = submission.mergePolicy === 'auto_unblocked'
    ? 'agent-policy-auto-merge'
    : 'agent-policy-manual-merge';
  const labels = [...new Set(["agent-change-request", policyLabel, ...(defaultLabels || []), ...((submission.labels || []).filter(Boolean))])];

  const contextLines: string[] = [];
  if (submission.url) contextLines.push(`URL: ${submission.url}`);
  if (submission.userAgent) contextLines.push(`User-Agent: ${submission.userAgent}`);
  if (submission.input.type === "audio") {
    contextLines.push(`Input-Type: audio`);
    if (submission.input.durationMs) contextLines.push(`Audio-Duration-Ms: ${submission.input.durationMs}`);
    if (submission.input.mimeType) contextLines.push(`Audio-Mime-Type: ${submission.input.mimeType}`);
  } else {
    contextLines.push("Input-Type: text");
  }
  contextLines.push(`Timestamp: ${new Date().toISOString()}`);
  contextLines.push("Source: agent-change-request");
  const description = String(content.description || "").trim();

  return {
    title: content.title,
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
