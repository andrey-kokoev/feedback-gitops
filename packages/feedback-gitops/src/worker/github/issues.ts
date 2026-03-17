import type { Env } from '../env';
import type { PullRequestSummary, GitHubIssueSummary, IssueListItem, IssueListOptions } from '../types';
import { ActionError, getErrorMessage } from '../utils/errors';
import { deriveIssueStatus, deriveIssueActions, derivePullRequestActions, deriveMergePolicy, deriveMergeStatusDetail } from '../utils/derive';
import { githubRequest } from './client';
import {
  resolveLatestLinkedPullRequest,
  resolveOpenLinkedPullRequest,
  resolveClosedUnmergedLinkedPullRequest,
  withPullRequestAgentWorkState,
  markPullRequestReadyForReview,
  markIssueMergeRequested,
  unmarkIssueMergeRequested,
  setPullRequestState,
  enableAndConfirmAutoMergeForIssue,
  maybeEnableAutoMergeForIssue,
  mergePullRequestNow,
  disableAutoMergeForPullRequest,
} from './pullRequests';

export function getServiceName(request: Request): string {
  const hostname = new URL(request.url).hostname;
  return hostname.split(".")[0] || "feedback-gitops";
}

function applyIssueFilters(items: IssueListItem[], options: IssueListOptions): IssueListItem[] {
  const query = options.query.trim().toLowerCase();
  let filtered = items.slice();

  if (options.view === "active") {
    filtered = filtered.filter((item) => ["new", "queued", "pr_draft", "pr_open", "pr_closed_unmerged", "pr_merge_requested"].includes(item.status));
  } else if (options.view === "needs_action") {
    filtered = filtered.filter((item) => ["new", "pr_draft", "pr_open", "pr_closed_unmerged"].includes(item.status));
  } else if (options.view === "completed") {
    filtered = filtered.filter((item) => ["merged", "closed_unmerged"].includes(item.status));
  }

  if (options.statusFilter.size > 0) {
    filtered = filtered.filter((item) => options.statusFilter.has(item.status));
  }

  if (query) {
    filtered = filtered.filter((item) => (
      item.title.toLowerCase().includes(query)
      || String(item.number).includes(query)
      || (item.pullRequest && String(item.pullRequest.number).includes(query))
      || item.labels.some((label) => String(label).toLowerCase().includes(query))
      || String(item.status || "").toLowerCase().includes(query)
      || String(item.statusDetail || "").toLowerCase().includes(query)
      || String(item.mergePolicy || "").toLowerCase().includes(query)
      || String(item.pullRequest?.agentWorkState || "").toLowerCase().includes(query)
    ));
  }

  filtered.sort((a, b) => {
    const diff = Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    return options.sort === "updated_asc" ? -diff : diff;
  });
  return filtered;
}

export async function listIssues(env: Env, limit: number, options: IssueListOptions): Promise<IssueListItem[]> {
  const safeLimit = Math.min(Math.max(limit, 1), 50);
  const maxPages = 5;
  const perPage = 100;
  const managedIssues: Array<{
    number: number;
    title: string;
    state: "open" | "closed";
    url: string;
    updatedAt: string;
    labels: string[];
    managed: boolean;
  }> = [];

  for (let page = 1; page <= maxPages; page += 1) {
    const response = await githubRequest(
      env,
      `/issues?state=all&per_page=${perPage}&page=${page}&sort=updated&direction=desc`,
    );
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`GitHub issues list failed (${response.status}): ${text}`);
    }

    const data = await response.json() as GitHubIssueSummary[];
    if (!Array.isArray(data) || data.length === 0) break;

    const pageManaged = data
      .filter((issue) => !issue.pull_request)
      .map((issue) => {
        const labels = issue.labels.map((item) => item.name).filter((name): name is string => Boolean(name));
        const body = String(issue.body || "");
        const managed = labels.includes("agent-change-request")
          || labels.includes("agent-execute")
          || body.includes("Source: agent-change-request");
        return {
          number: issue.number,
          title: issue.title,
          state: issue.state === "closed" ? "closed" as const : "open" as const,
          url: issue.html_url,
          updatedAt: issue.updated_at,
          labels,
          managed,
        };
      })
      .filter((issue) => issue.managed)
      .filter((issue) => !issue.labels.includes("agent-deleted"));

    managedIssues.push(...pageManaged);
    if (data.length < perPage) break;
  }

  managedIssues.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  const issues = managedIssues.slice();

  const enriched = await Promise.all(issues.map(async (issue) => {
    let pullRequest: PullRequestSummary | null = null;
    try {
      pullRequest = await resolveLatestLinkedPullRequest(env, issue.number);
      if (pullRequest) {
        pullRequest = await withPullRequestAgentWorkState(env, pullRequest);
      }
    } catch (error) {
      console.error("Failed to resolve linked pull request:", { issueNumber: issue.number, error });
    }

    const status = deriveIssueStatus(issue.state, issue.labels, pullRequest);
    const statusDetail = deriveMergeStatusDetail(issue.labels, pullRequest);
    return {
      ...issue,
      status,
      statusDetail,
      pullRequest,
      mergePolicy: deriveMergePolicy(issue.labels),
      issueActions: deriveIssueActions(issue.state, issue.labels),
      pullRequestActions: derivePullRequestActions(issue.labels, pullRequest),
    };
  }));

  return applyIssueFilters(enriched, options).slice(0, safeLimit);
}

async function ensureExecuteLabel(env: Env, issueNumber: number): Promise<void> {
  const issueResponse = await githubRequest(env, `/issues/${issueNumber}`);
  if (!issueResponse.ok) {
    const text = await issueResponse.text();
    throw new Error(`GitHub issue read failed (${issueResponse.status}): ${text}`);
  }

  const issue = await issueResponse.json() as GitHubIssueSummary;
  const labels = issue.labels.map((item) => item.name).filter((name): name is string => Boolean(name));
  if (!labels.includes("agent-execute")) {
    labels.push("agent-execute");
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

export async function assignIssueToCopilot(env: Env, issueNumber: number): Promise<void> {
  const response = await githubRequest(env, `/issues/${issueNumber}/assignees`, {
    method: "POST",
    body: JSON.stringify({
      assignees: ["copilot-swe-agent[bot]"],
      agent_assignment: {
        target_repo: `${env.GITHUB_REPO_OWNER}/${env.GITHUB_REPO_NAME}`,
        base_branch: env.GITHUB_BASE_BRANCH || "main",
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Copilot assignment failed (${response.status}): ${text}`);
  }
}

export async function setIssueState(env: Env, issueNumber: number, state: "open" | "closed"): Promise<void> {
  const patchResponse = await githubRequest(env, `/issues/${issueNumber}`, {
    method: "PATCH",
    body: JSON.stringify({ state }),
  });
  if (!patchResponse.ok) {
    const text = await patchResponse.text();
    throw new Error(`GitHub issue update failed (${patchResponse.status}): ${text}`);
  }
}

export async function executeAction(env: Env, issueNumber: number, target: "issue" | "pull_request", action: string): Promise<{ pullRequest: PullRequestSummary | null }> {
  if (target === "issue") {
    if (action === "execute") {
      await ensureExecuteLabel(env, issueNumber);
      await assignIssueToCopilot(env, issueNumber);
      return { pullRequest: null };
    }
    if (action === "hold") {
      const issueResponse = await githubRequest(env, `/issues/${issueNumber}`);
      if (!issueResponse.ok) {
        const text = await issueResponse.text();
        throw new Error(`GitHub issue read failed (${issueResponse.status}): ${text}`);
      }
      const issue = await issueResponse.json() as { labels: Array<{ name?: string }> };
      const labels = issue.labels.map((l) => l.name).filter((n): n is string => Boolean(n));
      const nextLabels = labels.filter((l) => l !== "agent-policy-auto-merge");
      if (!nextLabels.includes("agent-policy-manual-merge")) {
        nextLabels.push("agent-policy-manual-merge");
      }
      const patchResponse = await githubRequest(env, `/issues/${issueNumber}`, {
        method: "PATCH",
        body: JSON.stringify({ labels: nextLabels }),
      });
      if (!patchResponse.ok) {
        const text = await patchResponse.text();
        throw new Error(`GitHub issue update failed (${patchResponse.status}): ${text}`);
      }
      return { pullRequest: null };
    }
    if (action === "close") {
      await setIssueState(env, issueNumber, "closed");
      return { pullRequest: null };
    }
    if (action === "reopen") {
      await setIssueState(env, issueNumber, "open");
      return { pullRequest: null };
    }
    throw new Error(`Unsupported issue action: ${action}`);
  }

  if (action === "merge") {
    let pullRequest = await resolveOpenLinkedPullRequest(env, issueNumber);
    pullRequest = await withPullRequestAgentWorkState(env, pullRequest);
    if (pullRequest.isDraft) {
      if (pullRequest.agentWorkState === "working") {
        throw new ActionError(
          "AGENT_WORKING",
          "Copilot is still working on this draft pull request.",
        );
      }
      await markPullRequestReadyForReview(env, pullRequest.id);
      await markIssueMergeRequested(env, issueNumber);
      pullRequest = await enableAndConfirmAutoMergeForIssue(env, issueNumber, pullRequest);
    } else {
      await markIssueMergeRequested(env, issueNumber);
      const mergeState = String(pullRequest.mergeStateStatus || "UNKNOWN").toUpperCase();
      if (mergeState === "CLEAN") {
        await mergePullRequestNow(env, pullRequest);
      } else {
        await maybeEnableAutoMergeForIssue(env, issueNumber, pullRequest);
      }
      const refreshedPullRequest = await resolveLatestLinkedPullRequest(env, issueNumber);
      if (refreshedPullRequest && refreshedPullRequest.state === "OPEN") {
        pullRequest = await withPullRequestAgentWorkState(env, refreshedPullRequest);
      } else if (refreshedPullRequest) {
        pullRequest = refreshedPullRequest;
      }
    }
    return { pullRequest };
  }
  if (action === "cancel_merge") {
    const pullRequest = await resolveOpenLinkedPullRequest(env, issueNumber);
    if (pullRequest.autoMergeRequestedAt) {
      await disableAutoMergeForPullRequest(env, pullRequest.id);
    }
    await unmarkIssueMergeRequested(env, issueNumber);
    return { pullRequest };
  }
  if (action === "close") {
    const pullRequest = await resolveOpenLinkedPullRequest(env, issueNumber);
    await setPullRequestState(env, pullRequest.number, "closed");
    return { pullRequest };
  }
  if (action === "reopen") {
    const pullRequest = await resolveClosedUnmergedLinkedPullRequest(env, issueNumber);
    await setPullRequestState(env, pullRequest.number, "open");
    return { pullRequest };
  }
  throw new Error(`Unsupported pull request action: ${action}`);
}

async function listOpenMergeRequestedIssueNumbers(env: Env, limit: number): Promise<number[]> {
  const safeLimit = Math.min(Math.max(limit, 1), 500);
  const maxPages = Math.min(Math.ceil(safeLimit / 100), 10);
  const numbers: number[] = [];

  for (let page = 1; page <= maxPages; page += 1) {
    const response = await githubRequest(
      env,
      `/issues?state=open&labels=${encodeURIComponent("agent-merge-requested")}&per_page=100&page=${page}&sort=updated&direction=desc`,
    );
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`GitHub merge-requested issues list failed (${response.status}): ${text}`);
    }

    const data = await response.json() as GitHubIssueSummary[];
    if (!Array.isArray(data) || data.length === 0) break;

    for (const issue of data) {
      if (issue.pull_request) continue;
      if (!Number.isInteger(issue.number) || issue.number < 1) continue;
      numbers.push(issue.number);
      if (numbers.length >= safeLimit) return numbers;
    }

    if (data.length < 100) break;
  }

  return numbers;
}

async function listOpenAutoPolicyIssueNumbers(env: Env, limit: number): Promise<number[]> {
  const safeLimit = Math.min(Math.max(limit, 1), 500);
  const maxPages = Math.min(Math.ceil(safeLimit / 100), 10);
  const numbers: number[] = [];

  for (let page = 1; page <= maxPages; page += 1) {
    const response = await githubRequest(
      env,
      `/issues?state=open&labels=${encodeURIComponent("agent-policy-auto-merge")}&per_page=100&page=${page}&sort=updated&direction=desc`,
    );
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`GitHub auto-policy issues list failed (${response.status}): ${text}`);
    }

    const data = await response.json() as GitHubIssueSummary[];
    if (!Array.isArray(data) || data.length === 0) break;

    for (const issue of data) {
      if (issue.pull_request) continue;
      if (!Number.isInteger(issue.number) || issue.number < 1) continue;
      numbers.push(issue.number);
      if (numbers.length >= safeLimit) return numbers;
    }

    if (data.length < 100) break;
  }

  return numbers;
}

interface ReconcileMergeRequestsResult {
  scanned: number;
  attempted: number;
  failures: ReconcileMergeRequestFailure[];
}

interface ReconcileMergeRequestFailure {
  issueNumber: number;
  pullRequestNumber?: number;
  code: string;
  message: string;
}

export async function reconcileMergeRequestedIssues(env: Env, limit = 200): Promise<ReconcileMergeRequestsResult> {
  const mergeRequestedIssueNumbers = await listOpenMergeRequestedIssueNumbers(env, limit);
  const autoPolicyIssueNumbers = await listOpenAutoPolicyIssueNumbers(env, limit);
  const mergeRequestedSet = new Set(mergeRequestedIssueNumbers);
  const issueNumbers = mergeRequestedIssueNumbers.slice();
  for (const issueNumber of autoPolicyIssueNumbers) {
    if (!mergeRequestedSet.has(issueNumber)) issueNumbers.push(issueNumber);
  }
  let attempted = 0;
  const failures: ReconcileMergeRequestFailure[] = [];

  for (const issueNumber of issueNumbers) {
    const explicitMergeRequested = mergeRequestedSet.has(issueNumber);
    if (!explicitMergeRequested) {
      try {
        await markIssueMergeRequested(env, issueNumber);
      } catch (error) {
        const message = getErrorMessage(error, "Failed to mark merge requested");
        console.warn("Failed to auto-request merge for auto policy issue:", {
          issueNumber,
          error: message,
        });
        failures.push({ issueNumber, code: "MARK_MERGE_REQUESTED_FAILED", message });
        continue;
      }
      mergeRequestedSet.add(issueNumber);
    }

    let pullRequest: PullRequestSummary | null = null;
    try {
      pullRequest = await resolveLatestLinkedPullRequest(env, issueNumber);
    } catch (error) {
      console.warn("Failed to resolve linked pull request during merge reconcile:", {
        issueNumber,
        error: getErrorMessage(error, "Failed to resolve linked pull request"),
      });
      continue;
    }

    if (!pullRequest || pullRequest.state !== "OPEN") continue;
    pullRequest = await withPullRequestAgentWorkState(env, pullRequest);

    if (pullRequest.isDraft) {
      if (pullRequest.agentWorkState === "working") continue;
      try {
        await markPullRequestReadyForReview(env, pullRequest.id);
      } catch (error) {
        const message = getErrorMessage(error, "Failed to mark ready for review");
        console.warn("Failed to mark PR ready for review during reconcile:", {
          issueNumber,
          pullRequestNumber: pullRequest.number,
          error: message,
        });
        failures.push({
          issueNumber,
          pullRequestNumber: pullRequest.number,
          code: "MARK_READY_FOR_REVIEW_FAILED",
          message,
        });
        continue;
      }
      attempted += 1;
      try {
        await enableAndConfirmAutoMergeForIssue(env, issueNumber, pullRequest);
      } catch (error) {
        const message = getErrorMessage(error, "Failed to enable auto-merge");
        const code = error instanceof ActionError ? error.code : "AUTO_MERGE_ENABLE_FAILED";
        console.warn("Failed to enable auto-merge after finalization during reconcile:", {
          issueNumber,
          pullRequestNumber: pullRequest.number,
          code,
          error: message,
        });
        failures.push({
          issueNumber,
          pullRequestNumber: pullRequest.number,
          code,
          message,
        });
      }
      continue;
    }

    if (pullRequest.autoMergeRequestedAt) continue;
    attempted += 1;
    const mergeState = String(pullRequest.mergeStateStatus || "UNKNOWN").toUpperCase();
    if (mergeState === "CLEAN") {
      try {
        await mergePullRequestNow(env, pullRequest);
      } catch (error) {
        const message = getErrorMessage(error, "Failed to directly merge pull request");
        const code = error instanceof ActionError ? error.code : "DIRECT_MERGE_FAILED";
        console.warn("Failed to directly merge during reconcile:", {
          issueNumber,
          pullRequestNumber: pullRequest.number,
          code,
          error: message,
        });
        failures.push({
          issueNumber,
          pullRequestNumber: pullRequest.number,
          code,
          message,
        });
      }
      continue;
    }
    try {
      await maybeEnableAutoMergeForIssue(env, issueNumber, pullRequest);
    } catch (error) {
      const message = getErrorMessage(error, "Failed to enable auto-merge");
      const code = error instanceof ActionError ? error.code : "AUTO_MERGE_ENABLE_FAILED";
      console.warn("Failed to enable auto-merge during reconcile:", {
        issueNumber,
        pullRequestNumber: pullRequest.number,
        code,
        error: message,
      });
      failures.push({
        issueNumber,
        pullRequestNumber: pullRequest.number,
        code,
        message,
      });
    }
  }

  return { scanned: issueNumbers.length, attempted, failures };
}
