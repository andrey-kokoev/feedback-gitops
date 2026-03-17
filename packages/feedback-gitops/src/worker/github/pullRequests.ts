import type { Env } from '../env';
import type { AgentWorkState, PullRequestSummary, LinkedPullRequest, PullRequestTimelineEvent } from '../types';
import { ActionError, getErrorMessage } from '../utils/errors';
import { githubRequest, githubGraphqlRequest } from './client';

export async function listLinkedPullRequests(env: Env, issueNumber: number): Promise<PullRequestSummary[]> {
  interface LinkedPrQueryData {
    repository?: {
      issue?: {
        closedByPullRequestsReferences?: {
          nodes?: LinkedPullRequest[];
        };
      };
    };
  }

  const data = await githubGraphqlRequest<LinkedPrQueryData>(
    env,
    `query ResolveLinkedPullRequests($owner: String!, $repo: String!, $issueNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        issue(number: $issueNumber) {
          closedByPullRequestsReferences(first: 20) {
            nodes {
              id
              number
              url
              state
              updatedAt
              isDraft
              merged
              mergedAt
              reviewDecision
              mergeStateStatus
              headRefOid
              autoMergeRequest {
                enabledAt
              }
            }
          }
        }
      }
    }`,
    {
      owner: env.GITHUB_REPO_OWNER,
      repo: env.GITHUB_REPO_NAME,
      issueNumber,
    },
  );

  return (data.repository?.issue?.closedByPullRequestsReferences?.nodes || [])
    .filter((item): item is LinkedPullRequest => Boolean(item && item.id && item.number && item.url))
    .map((item) => ({
      id: item.id,
      number: item.number,
      url: item.url,
      state: item.state === "OPEN"
        ? "OPEN"
        : (item.state === "MERGED" || item.merged)
          ? "MERGED"
          : "CLOSED",
      isDraft: Boolean(item.isDraft),
      reviewDecision: item.reviewDecision === "APPROVED"
        ? "APPROVED"
        : item.reviewDecision === "CHANGES_REQUESTED"
          ? "CHANGES_REQUESTED"
          : item.reviewDecision === "REVIEW_REQUIRED"
            ? "REVIEW_REQUIRED"
            : "UNKNOWN",
      mergeStateStatus: String(item.mergeStateStatus || "UNKNOWN"),
      autoMergeRequestedAt: item.autoMergeRequest?.enabledAt || null,
      mergedAt: item.mergedAt || null,
      updatedAt: item.updatedAt,
      headRefOid: String(item.headRefOid || ""),
      agentWorkState: "unknown" as AgentWorkState,
      agentWorkUpdatedAt: null,
    }));
}

export async function resolvePullRequestAgentWorkState(
  env: Env,
  pullRequestNumber: number,
): Promise<{ agentWorkState: AgentWorkState; agentWorkUpdatedAt: string | null }> {
  const response = await githubRequest(env, `/issues/${pullRequestNumber}/timeline?per_page=100`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub pull request timeline failed (${response.status}): ${text}`);
  }

  const timeline = await response.json() as PullRequestTimelineEvent[];
  if (!Array.isArray(timeline) || timeline.length === 0) {
    return { agentWorkState: "unknown", agentWorkUpdatedAt: null };
  }

  let latestEventName = "";
  let latestEventTime = "";
  let latestEventAt = 0;
  for (const event of timeline) {
    const eventName = String(event?.event || "");
    const createdAt = String(event?.created_at || "");
    if (!eventName.startsWith("copilot_work_") || !createdAt) continue;
    const eventTs = Date.parse(createdAt);
    if (Number.isNaN(eventTs)) continue;
    if (eventTs <= latestEventAt) continue;
    latestEventAt = eventTs;
    latestEventName = eventName;
    latestEventTime = createdAt;
  }

  if (!latestEventName) {
    return { agentWorkState: "unknown", agentWorkUpdatedAt: null };
  }

  if (latestEventName === "copilot_work_started") {
    return { agentWorkState: "working", agentWorkUpdatedAt: latestEventTime };
  }
  return { agentWorkState: "finished", agentWorkUpdatedAt: latestEventTime };
}

export async function withPullRequestAgentWorkState(env: Env, pullRequest: PullRequestSummary): Promise<PullRequestSummary> {
  try {
    const state = await resolvePullRequestAgentWorkState(env, pullRequest.number);
    return { ...pullRequest, ...state };
  } catch (error) {
    console.warn("Failed to resolve pull request agent work state:", {
      pullRequestNumber: pullRequest.number,
      error: getErrorMessage(error, "Failed to resolve agent work state"),
    });
    return pullRequest;
  }
}

export async function resolveOpenLinkedPullRequest(env: Env, issueNumber: number): Promise<PullRequestSummary> {
  const linked = (await listLinkedPullRequests(env, issueNumber))
    .filter((item) => item.state === "OPEN")
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

  if (!linked.length) {
    throw new Error("No open linked pull request found for this issue");
  }

  return linked[0];
}

export async function resolveLatestLinkedPullRequest(env: Env, issueNumber: number): Promise<PullRequestSummary | null> {
  const nodes = await listLinkedPullRequests(env, issueNumber);
  if (!nodes.length) return null;

  const rank = (item: PullRequestSummary) => {
    if (item.state === "OPEN") return 3;
    if (item.state === "MERGED") return 2;
    return 1;
  };

  nodes.sort((a, b) => {
    const rankDiff = rank(b) - rank(a);
    if (rankDiff !== 0) return rankDiff;
    return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
  });

  return nodes[0];
}

export async function enableAutoMergeForPullRequest(env: Env, pullRequestId: string): Promise<void> {
  await githubGraphqlRequest(
    env,
    `mutation EnablePullRequestAutoMerge($pullRequestId: ID!) {
      enablePullRequestAutoMerge(input: { pullRequestId: $pullRequestId, mergeMethod: SQUASH }) {
        pullRequest {
          id
          autoMergeRequest {
            enabledAt
          }
        }
      }
    }`,
    { pullRequestId },
  );
}

export async function disableAutoMergeForPullRequest(env: Env, pullRequestId: string): Promise<void> {
  await githubGraphqlRequest(
    env,
    `mutation DisablePullRequestAutoMerge($pullRequestId: ID!) {
      disablePullRequestAutoMerge(input: { pullRequestId: $pullRequestId }) {
        pullRequest {
          id
          autoMergeRequest {
            enabledAt
          }
        }
      }
    }`,
    { pullRequestId },
  );
}

export async function markPullRequestReadyForReview(env: Env, pullRequestId: string): Promise<void> {
  await githubGraphqlRequest(
    env,
    `mutation MarkPullRequestReadyForReview($pullRequestId: ID!) {
      markPullRequestReadyForReview(input: { pullRequestId: $pullRequestId }) {
        pullRequest {
          id
          isDraft
        }
      }
    }`,
    { pullRequestId },
  );
}

export async function mergePullRequestNow(
  env: Env,
  pullRequest: PullRequestSummary,
  commitHeadline = "Auto-merge via feedback-gitops",
): Promise<void> {
  interface MergePullRequestData {
    mergePullRequest?: {
      pullRequest?: {
        id?: string;
        merged?: boolean;
        mergedAt?: string | null;
      } | null;
    } | null;
  }

  const data = await githubGraphqlRequest<MergePullRequestData>(
    env,
    `mutation MergePullRequestNow($pullRequestId: ID!, $expectedHeadOid: GitObjectID!, $commitHeadline: String!) {
      mergePullRequest(input: {
        pullRequestId: $pullRequestId
        mergeMethod: SQUASH
        expectedHeadOid: $expectedHeadOid
        commitHeadline: $commitHeadline
      }) {
        pullRequest {
          id
          merged
          mergedAt
        }
      }
    }`,
    {
      pullRequestId: pullRequest.id,
      expectedHeadOid: pullRequest.headRefOid,
      commitHeadline,
    },
  );

  const merged = Boolean(data.mergePullRequest?.pullRequest?.merged);
  if (!merged) {
    throw new ActionError(
      "DIRECT_MERGE_FAILED",
      `GitHub did not confirm direct merge for pull request #${pullRequest.number}.`,
    );
  }
}

export async function enableAndConfirmAutoMergeForIssue(
  env: Env,
  issueNumber: number,
  pullRequest: PullRequestSummary,
): Promise<PullRequestSummary> {
  try {
    await enableAutoMergeForPullRequest(env, pullRequest.id);
  } catch (error) {
    const message = getErrorMessage(error, "Failed to enable auto-merge");
    throw new ActionError(
      "AUTO_MERGE_ENABLE_FAILED",
      `Failed to enable auto-merge for pull request #${pullRequest.number}: ${message}`,
    );
  }

  let refreshed: PullRequestSummary | null = null;
  try {
    refreshed = await resolveLatestLinkedPullRequest(env, issueNumber);
  } catch (error) {
    const message = getErrorMessage(error, "Failed to reload pull request after enabling auto-merge");
    throw new ActionError("AUTO_MERGE_CONFIRM_FAILED", message);
  }

  if (!refreshed || refreshed.number !== pullRequest.number || refreshed.state !== "OPEN") {
    throw new ActionError(
      "AUTO_MERGE_CONFIRM_FAILED",
      `Unable to confirm auto-merge state for pull request #${pullRequest.number}.`,
    );
  }
  if (!refreshed.autoMergeRequestedAt) {
    throw new ActionError(
      "AUTO_MERGE_NOT_ENABLED",
      `GitHub did not report auto-merge as enabled for pull request #${pullRequest.number}. Retry merge request.`,
    );
  }

  return refreshed;
}

export async function maybeEnableAutoMergeForIssue(env: Env, issueNumber: number, pullRequest: PullRequestSummary | null): Promise<void> {
  if (!pullRequest || pullRequest.state !== "OPEN") return;
  if (pullRequest.isDraft) return;
  if (pullRequest.autoMergeRequestedAt) return;

  await enableAndConfirmAutoMergeForIssue(env, issueNumber, pullRequest);
}

export async function markIssueMergeRequested(env: Env, issueNumber: number): Promise<void> {
  const issueResponse = await githubRequest(env, `/issues/${issueNumber}`);
  if (!issueResponse.ok) {
    const text = await issueResponse.text();
    throw new Error(`GitHub issue read failed (${issueResponse.status}): ${text}`);
  }

  const issue = await issueResponse.json() as { labels: Array<{ name?: string }> };
  const labels = issue.labels.map((item) => item.name).filter((name): name is string => Boolean(name));
  if (!labels.includes("agent-merge-requested")) {
    labels.push("agent-merge-requested");
  }

  const patchResponse = await githubRequest(env, `/issues/${issueNumber}`, {
    method: "PATCH",
    body: JSON.stringify({ labels }),
  });
  if (!patchResponse.ok) {
    const text = await patchResponse.text();
    throw new Error(`GitHub issue update failed (${patchResponse.status}): ${text}`);
  }
}

export async function unmarkIssueMergeRequested(env: Env, issueNumber: number): Promise<void> {
  const issueResponse = await githubRequest(env, `/issues/${issueNumber}`);
  if (!issueResponse.ok) {
    const text = await issueResponse.text();
    throw new Error(`GitHub issue read failed (${issueResponse.status}): ${text}`);
  }

  const issue = await issueResponse.json() as { labels: Array<{ name?: string }> };
  const labels = issue.labels.map((item) => item.name).filter((name): name is string => Boolean(name));
  const nextLabels = labels.filter((label) => label !== "agent-merge-requested");

  if (nextLabels.length === labels.length) return;

  const patchResponse = await githubRequest(env, `/issues/${issueNumber}`, {
    method: "PATCH",
    body: JSON.stringify({ labels: nextLabels }),
  });
  if (!patchResponse.ok) {
    const text = await patchResponse.text();
    throw new Error(`GitHub issue update failed (${patchResponse.status}): ${text}`);
  }
}

export async function resolveClosedUnmergedLinkedPullRequest(env: Env, issueNumber: number): Promise<PullRequestSummary> {
  const linked = (await listLinkedPullRequests(env, issueNumber))
    .filter((item) => item.state === "CLOSED")
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

  if (!linked.length) {
    throw new Error("No closed linked pull request found for this issue");
  }
  return linked[0];
}

export async function setPullRequestState(env: Env, pullRequestNumber: number, state: "open" | "closed"): Promise<void> {
  const patchResponse = await githubRequest(env, `/pulls/${pullRequestNumber}`, {
    method: "PATCH",
    body: JSON.stringify({ state }),
  });
  if (!patchResponse.ok) {
    const text = await patchResponse.text();
    throw new Error(`GitHub pull request update failed (${patchResponse.status}): ${text}`);
  }
}
