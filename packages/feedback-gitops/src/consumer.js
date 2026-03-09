export function createIssueConsumer(config) {
    return async (batch) => {
        const failures = [];
        for (const message of batch.messages) {
            try {
                await processMessage(message.body, config);
            }
            catch (error) {
                console.error(`Failed to process message ${message.id}:`, error);
                failures.push(message.id);
            }
        }
        if (failures.length > 0) {
            batch.retryAll();
        }
        else {
            batch.ackAll();
        }
    };
}
function isValidSubmission(value) {
    if (!value || typeof value !== "object")
        return false;
    const item = value;
    return typeof item.title === "string" && item.title.trim().length > 0;
}
async function processMessage(payload, config) {
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
function buildIssuePayload(submission, defaultLabels) {
    const labels = [...new Set(["agent-change-request", ...(defaultLabels || []), ...((submission.labels || []).filter(Boolean))])];
    const contextLines = [];
    if (submission.url)
        contextLines.push(`URL: ${submission.url}`);
    if (submission.userAgent)
        contextLines.push(`User-Agent: ${submission.userAgent}`);
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
async function createGitHubIssue(payload, github) {
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
    return await response.json();
}
async function assignIssueToCopilot(issueNumber, github) {
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
