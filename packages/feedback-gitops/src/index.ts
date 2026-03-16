import { createIssueConsumer, type ConsumerConfig, type FeedbackSubmission } from "./consumer";
import { generateWidgetScript } from "./widget";

interface Env {
  FEEDBACK_QUEUE: Queue;
  feedback_gitops_audio: R2Bucket;
  GITHUB_PAT: string;
  GITHUB_REPO_OWNER: string;
  GITHUB_REPO_NAME: string;
  GITHUB_BASE_BRANCH?: string;
  API_KEY: string;
  ADMIN_TOKEN?: string;
  AI?: Ai;
  CANCELLATIONS?: KVNamespace;
}

interface GitHubIssueSummary {
  number: number;
  title: string;
  state: string;
  html_url: string;
  updated_at: string;
  body?: string;
  labels: Array<{ name?: string }>;
  pull_request?: unknown;
}

interface IssueListItem {
  number: number;
  title: string;
  state: "open" | "closed";
  url: string;
  updatedAt: string;
  labels: string[];
  status: IssueStatus;
  statusDetail: string;
  pullRequest: PullRequestSummary | null;
  issueActions: GitHubAction[];
  pullRequestActions: GitHubAction[];
  mergePolicy: 'auto_unblocked' | 'manual';
}

type AgentWorkState = "working" | "finished" | "unknown";

type IssueStatus =
  | "new"
  | "queued"
  | "pr_draft"
  | "pr_open"
  | "pr_closed_unmerged"
  | "pr_merge_requested"
  | "merged"
  | "closed_unmerged";

interface PullRequestSummary {
  id: string;
  number: number;
  url: string;
  state: "OPEN" | "CLOSED" | "MERGED";
  isDraft: boolean;
  reviewDecision: "APPROVED" | "CHANGES_REQUESTED" | "REVIEW_REQUIRED" | "UNKNOWN";
  mergeStateStatus: string;
  autoMergeRequestedAt: string | null;
  mergedAt: string | null;
  updatedAt: string;
  headRefOid: string;
  agentWorkState: AgentWorkState;
  agentWorkUpdatedAt: string | null;
}

type IssueActionId = "execute" | "hold" | "close" | "reopen";
type PullRequestActionId = "merge" | "cancel_merge" | "close" | "reopen";

interface GitHubAction {
  id: IssueActionId | PullRequestActionId;
  label: string;
  disabled?: boolean;
  reason?: string;
}

class ActionError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "ActionError";
  }
}

interface ErrorPayload {
  ok: false;
  error: {
    error: string;
    code: string;
  };
}

interface SuccessPayload {
  success: true;
  submissionId?: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message?: string }>;
}

interface LinkedPullRequest {
  id: string;
  number: number;
  url: string;
  state: string;
  updatedAt: string;
  isDraft: boolean;
  mergedAt?: string | null;
  merged?: boolean;
  reviewDecision?: string | null;
  mergeStateStatus?: string | null;
  autoMergeRequest?: {
    enabledAt?: string | null;
  } | null;
  headRefOid?: string | null;
}

interface PullRequestTimelineEvent {
  event?: string;
  created_at?: string;
}

function getServiceName(request: Request): string {
  const hostname = new URL(request.url).hostname;
  return hostname.split(".")[0] || "feedback-gitops";
}

function json(data: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { ...init, headers });
}

function errorPayload(message: string, code: string): ErrorPayload {
  return { ok: false, error: { error: message, code } };
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (!error) return fallback;
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  return fallback;
}

function normalizeSubmission(value: unknown): FeedbackSubmission | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const title = typeof item.title === "string" ? item.title.trim() : "";
  if (!title) return null;

  const labels = Array.isArray(item.labels) ? item.labels.filter((label) => typeof label === "string") as string[] : undefined;
  return {
    input: {
      type: "text",
      title,
      description: typeof item.description === "string" ? item.description : "",
    },
    url: typeof item.url === "string" ? item.url : undefined,
    userAgent: typeof item.userAgent === "string" ? item.userAgent : undefined,
    labels,
    mergePolicy: item.mergePolicy === 'auto_unblocked' ? 'auto_unblocked' : undefined,
  };
}

function parseLabelsField(raw: FormDataEntryValue | null): string[] | undefined {
  if (typeof raw !== "string" || !raw.trim()) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const labels = parsed.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
      return labels.length ? labels : undefined;
    }
  } catch {
    // Fall back to comma-separated labels.
  }
  const labels = raw.split(",").map((item) => item.trim()).filter(Boolean);
  return labels.length ? labels : undefined;
}

function getAudioExtension(mimeType: string): string {
  if (mimeType.includes("webm")) return "webm";
  if (mimeType.includes("mp4") || mimeType.includes("m4a")) return "m4a";
  if (mimeType.includes("mpeg")) return "mp3";
  if (mimeType.includes("wav")) return "wav";
  return "bin";
}

async function normalizeAudioSubmission(request: Request, env: Env): Promise<FeedbackSubmission | null> {
  const formData = await request.formData();
  const audioValue = formData.get("audio");
  if (!(audioValue instanceof Blob) || audioValue.size < 1) return null;

  const mimeType = String(formData.get("mimeType") || audioValue.type || "audio/webm");
  const durationMsRaw = Number(formData.get("durationMs"));
  const durationMs = Number.isFinite(durationMsRaw) && durationMsRaw > 0 ? Math.round(durationMsRaw) : undefined;
  const extension = getAudioExtension(mimeType);
  const audioKey = `audio-requests/${crypto.randomUUID()}.${extension}`;

  await env.feedback_gitops_audio.put(audioKey, await audioValue.arrayBuffer(), {
    httpMetadata: { contentType: mimeType },
  });

  return {
    input: {
      type: "audio",
      audioKey,
      mimeType,
      durationMs,
    },
    url: typeof formData.get("url") === "string" ? String(formData.get("url")) : undefined,
    userAgent: typeof formData.get("userAgent") === "string" ? String(formData.get("userAgent")) : undefined,
    labels: parseLabelsField(formData.get("labels")),
    mergePolicy: formData.get("mergePolicy") === "auto_unblocked" ? "auto_unblocked" : undefined,
  };
}

function getCorsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("Origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-API-Key, X-Admin-Token",
  };
}

function getAdminTokenFromRequest(request: Request): string {
  return request.headers.get("X-Admin-Token") || "";
}

function isAuthorizedRequest(request: Request, env: Env): boolean {
  const adminToken = getAdminTokenFromRequest(request);
  if (env.ADMIN_TOKEN && adminToken) {
    return adminToken === env.ADMIN_TOKEN;
  }
  const apiKey = request.headers.get("X-API-Key");
  return apiKey === env.API_KEY;
}

async function githubRequest(env: Env, path: string, init: RequestInit = {}): Promise<Response> {
  const url = `https://api.github.com/repos/${env.GITHUB_REPO_OWNER}/${env.GITHUB_REPO_NAME}${path}`;
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/vnd.github+json");
  headers.set("Authorization", `Bearer ${env.GITHUB_PAT}`);
  headers.set("X-GitHub-Api-Version", "2022-11-28");
  headers.set("User-Agent", "feedback-gitops-worker");
  if (init.body && !headers.get("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(url, { ...init, headers });
}

async function githubGraphqlRequest<T>(env: Env, query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${env.GITHUB_PAT}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "feedback-gitops-worker",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json().catch(() => null) as GraphQLResponse<T> | null;
  if (!response.ok) {
    const errorMessage = payload?.errors?.map((error) => error.message).filter(Boolean).join("; ")
      || `GitHub GraphQL request failed (${response.status})`;
    throw new Error(errorMessage);
  }

  if (!payload || payload.errors?.length || !payload.data) {
    const errorMessage = payload?.errors?.map((error) => error.message).filter(Boolean).join("; ")
      || "GitHub GraphQL request returned no data";
    throw new Error(errorMessage);
  }

  return payload.data;
}

async function listLinkedPullRequests(env: Env, issueNumber: number): Promise<PullRequestSummary[]> {
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

async function resolvePullRequestAgentWorkState(
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

async function withPullRequestAgentWorkState(env: Env, pullRequest: PullRequestSummary): Promise<PullRequestSummary> {
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

async function resolveOpenLinkedPullRequest(env: Env, issueNumber: number): Promise<PullRequestSummary> {
  const linked = (await listLinkedPullRequests(env, issueNumber))
    .filter((item) => item.state === "OPEN")
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

  if (!linked.length) {
    throw new Error("No open linked pull request found for this issue");
  }

  return linked[0];
}

async function resolveLatestLinkedPullRequest(env: Env, issueNumber: number): Promise<PullRequestSummary | null> {
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

async function enableAutoMergeForPullRequest(env: Env, pullRequestId: string): Promise<void> {
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

async function disableAutoMergeForPullRequest(env: Env, pullRequestId: string): Promise<void> {
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

async function markPullRequestReadyForReview(env: Env, pullRequestId: string): Promise<void> {
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

async function mergePullRequestNow(
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

function isMergeRequested(labels: string[]): boolean {
  return labels.includes("agent-merge-requested");
}

function deriveMergePolicy(labels: string[]): 'auto_unblocked' | 'manual' {
  if (labels.includes('agent-policy-auto-merge')) return 'auto_unblocked';
  return 'manual';
}

function deriveMergeStatusDetail(labels: string[], pullRequest: PullRequestSummary | null): string {
  if (!pullRequest || pullRequest.state !== "OPEN" || !isMergeRequested(labels)) return "";
  if (pullRequest.isDraft) return "Merge requested · waiting until PR is ready for review.";

  if (pullRequest.reviewDecision === "CHANGES_REQUESTED") {
    return "Merge requested · reviewer requested changes.";
  }
  if (pullRequest.reviewDecision === "REVIEW_REQUIRED") {
    return "Merge requested · waiting for required approval.";
  }

  const state = String(pullRequest.mergeStateStatus || "UNKNOWN").toUpperCase();
  if (state === "DIRTY") return "Merge requested · merge conflicts must be resolved.";
  if (state === "BEHIND") return "Merge requested · branch is behind base branch.";
  if (state === "BLOCKED") return "Merge requested · blocked by branch rules or checks.";
  if (state === "UNSTABLE") return "Merge requested · checks are still in progress.";
  if (state === "HAS_HOOKS") return "Merge requested · waiting on required checks.";
  if (state === "UNKNOWN") return "Merge requested · GitHub is computing mergeability.";
  if (state === "CLEAN") return "Merge requested · ready for direct merge.";

  if (pullRequest.autoMergeRequestedAt) {
    return "Merge requested · auto-merge enabled.";
  }

  return "Merge requested · auto-merge not enabled (retry needed).";
}

async function maybeEnableAutoMergeForIssue(env: Env, issueNumber: number, pullRequest: PullRequestSummary | null): Promise<void> {
  if (!pullRequest || pullRequest.state !== "OPEN") return;
  if (pullRequest.isDraft) return;
  if (pullRequest.autoMergeRequestedAt) return;

  await enableAndConfirmAutoMergeForIssue(env, issueNumber, pullRequest);
}

async function enableAndConfirmAutoMergeForIssue(
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

async function reconcileMergeRequestedIssues(env: Env, limit = 200): Promise<ReconcileMergeRequestsResult> {
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

function deriveIssueStatus(issueState: "open" | "closed", labels: string[], pullRequest: PullRequestSummary | null): IssueStatus {
  if (pullRequest) {
    if (pullRequest.state === "OPEN" && isMergeRequested(labels)) return "pr_merge_requested";
    if (pullRequest.state === "MERGED") return "merged";
    if (pullRequest.state === "CLOSED") return issueState === "closed" ? "closed_unmerged" : "pr_closed_unmerged";
    if (pullRequest.state === "OPEN" && pullRequest.isDraft) return "pr_draft";
    if (pullRequest.state === "OPEN") return "pr_open";
    if (issueState === "closed") return "closed_unmerged";
  }
  if (issueState === "closed") return "closed_unmerged";
  if (labels.includes("agent-execute")) return "queued";
  return "new";
}

function deriveIssueActions(issueState: "open" | "closed", labels: string[]): GitHubAction[] {
  const actions: GitHubAction[] = [];
  if (issueState === "open" && !labels.includes("agent-execute")) {
    actions.push({ id: "execute", label: "Execute" });
    if (labels.includes("agent-policy-auto-merge")) {
      actions.push({ id: "hold", label: "Hold" });
    }
  }
  if (issueState === "open") {
    actions.push({ id: "close", label: "Close" });
  } else {
    actions.push({ id: "reopen", label: "Reopen" });
  }
  return actions;
}

function derivePullRequestActions(labels: string[], pullRequest: PullRequestSummary | null): GitHubAction[] {
  if (!pullRequest) return [];

  const actions: GitHubAction[] = [];
  if (pullRequest.state === "OPEN") {
    if (isMergeRequested(labels)) {
      actions.push({ id: "cancel_merge", label: "Cancel" });
      return actions;
    } else if (pullRequest.isDraft) {
      if (pullRequest.agentWorkState === "working") {
        // While Copilot is still working, do not expose finalization/merge controls.
      } else {
        actions.push({ id: "merge", label: "Finalize & merge" });
      }
    } else {
      actions.push({ id: "merge", label: "Request merge" });
    }
    actions.push({ id: "close", label: "Close" });
  } else if (pullRequest.state === "CLOSED") {
    actions.push({ id: "reopen", label: "Reopen" });
  }
  return actions;
}

interface IssueListOptions {
  statusFilter: Set<IssueStatus>;
  view: "active" | "needs_action" | "completed" | "all";
  query: string;
  sort: "updated_desc" | "updated_asc";
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

async function listIssues(env: Env, limit: number, options: IssueListOptions): Promise<IssueListItem[]> {
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

async function assignIssueToCopilot(env: Env, issueNumber: number): Promise<void> {
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

async function markIssueMergeRequested(env: Env, issueNumber: number): Promise<void> {
  const issueResponse = await githubRequest(env, `/issues/${issueNumber}`);
  if (!issueResponse.ok) {
    const text = await issueResponse.text();
    throw new Error(`GitHub issue read failed (${issueResponse.status}): ${text}`);
  }

  const issue = await issueResponse.json() as GitHubIssueSummary;
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

async function unmarkIssueMergeRequested(env: Env, issueNumber: number): Promise<void> {
  const issueResponse = await githubRequest(env, `/issues/${issueNumber}`);
  if (!issueResponse.ok) {
    const text = await issueResponse.text();
    throw new Error(`GitHub issue read failed (${issueResponse.status}): ${text}`);
  }

  const issue = await issueResponse.json() as GitHubIssueSummary;
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

async function setIssueState(env: Env, issueNumber: number, state: "open" | "closed"): Promise<void> {
  const patchResponse = await githubRequest(env, `/issues/${issueNumber}`, {
    method: "PATCH",
    body: JSON.stringify({ state }),
  });
  if (!patchResponse.ok) {
    const text = await patchResponse.text();
    throw new Error(`GitHub issue update failed (${patchResponse.status}): ${text}`);
  }
}

async function resolveClosedUnmergedLinkedPullRequest(env: Env, issueNumber: number): Promise<PullRequestSummary> {
  const linked = (await listLinkedPullRequests(env, issueNumber))
    .filter((item) => item.state === "CLOSED")
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

  if (!linked.length) {
    throw new Error("No closed linked pull request found for this issue");
  }
  return linked[0];
}

async function setPullRequestState(env: Env, pullRequestNumber: number, state: "open" | "closed"): Promise<void> {
  const patchResponse = await githubRequest(env, `/pulls/${pullRequestNumber}`, {
    method: "PATCH",
    body: JSON.stringify({ state }),
  });
  if (!patchResponse.ok) {
    const text = await patchResponse.text();
    throw new Error(`GitHub pull request update failed (${patchResponse.status}): ${text}`);
  }
}

async function executeAction(env: Env, issueNumber: number, target: "issue" | "pull_request", action: string): Promise<{ pullRequest: PullRequestSummary | null }> {
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const corsHeaders = getCorsHeaders(request);

    if (!env.API_KEY) {
      return json(errorPayload("API_KEY not configured", "CONFIG_ERROR"), { status: 500, headers: corsHeaders });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === "GET" && url.pathname === "/widget.js") {
      const repo = `${env.GITHUB_REPO_OWNER}/${env.GITHUB_REPO_NAME}`;
      const script = generateWidgetScript(`${url.origin}/api/issue`, repo, [], env.GITHUB_REPO_NAME);
      return new Response(script, {
        headers: {
          "Content-Type": "application/javascript; charset=utf-8",
          "Cache-Control": "no-store",
          ...corsHeaders,
        },
      });
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true, service: getServiceName(request) }, { headers: corsHeaders });
    }

    if (request.method === "POST" && url.pathname === "/api/issue") {
      if (!isAuthorizedRequest(request, env)) {
        return json(errorPayload("Unauthorized", "UNAUTHORIZED"), { status: 401, headers: corsHeaders });
      }

      let submission: FeedbackSubmission | null = null;
      try {
        const contentType = (request.headers.get("content-type") || "").toLowerCase();
        if (contentType.includes("multipart/form-data")) {
          submission = await normalizeAudioSubmission(request, env);
        } else {
          submission = normalizeSubmission(await request.json());
        }
      } catch {
        return json(errorPayload("Invalid request body", "INVALID_JSON"), { status: 400, headers: corsHeaders });
      }

      if (!submission) {
        return json(errorPayload("Invalid submission payload", "VALIDATION_ERROR"), { status: 400, headers: corsHeaders });
      }

      const submissionId = crypto.randomUUID();
      submission.submissionId = submissionId;

      if (env.CANCELLATIONS && submission.input.type === "audio") {
        await env.CANCELLATIONS.put(
          `sub:${submissionId}`,
          (submission.input as { audioKey: string }).audioKey,
          { expirationTtl: 600 },
        );
      }

      try {
        await env.FEEDBACK_QUEUE.send(submission);
      } catch (err) {
        console.error("Failed to enqueue feedback:", err);
        return json(errorPayload("Failed to enqueue feedback", "QUEUE_ERROR"), { status: 500, headers: corsHeaders });
      }

      return json({ success: true, submissionId } satisfies SuccessPayload, { headers: corsHeaders });
    }

    if (request.method === "GET" && url.pathname === "/api/issues") {
      if (!isAuthorizedRequest(request, env)) {
        return json(errorPayload("Unauthorized", "UNAUTHORIZED"), { status: 401, headers: corsHeaders });
      }

      const limit = Number(url.searchParams.get("limit") || "20");
      const statusParam = String(url.searchParams.get("status") || "");
      const viewParam = String(url.searchParams.get("view") || "all");
      const queryParam = String(url.searchParams.get("q") || "");
      const sortParam = String(url.searchParams.get("sort") || "updated_desc");

      const allowedStatuses = new Set<IssueStatus>(["new", "queued", "pr_draft", "pr_open", "pr_closed_unmerged", "pr_merge_requested", "merged", "closed_unmerged"]);
      const statusFilter = new Set(
        statusParam
          .split(",")
          .map((item) => item.trim())
          .filter((item): item is IssueStatus => allowedStatuses.has(item as IssueStatus)),
      );
      const view = (["active", "needs_action", "completed", "all"].includes(viewParam) ? viewParam : "all") as IssueListOptions["view"];
      const sort = (["updated_desc", "updated_asc"].includes(sortParam) ? sortParam : "updated_desc") as IssueListOptions["sort"];
      try {
        const issues = await listIssues(
          env,
          Number.isFinite(limit) ? limit : 20,
          {
            statusFilter,
            view,
            query: queryParam,
            sort,
          },
        );
        return json({ issues }, { headers: corsHeaders });
      } catch (err) {
        console.error("Failed to list issues:", err);
        return json(errorPayload("Failed to load issues", "GITHUB_ERROR"), { status: 502, headers: corsHeaders });
      }
    }

    if (request.method === "POST" && url.pathname === "/api/action") {
      if (!isAuthorizedRequest(request, env)) {
        return json(errorPayload("Unauthorized", "UNAUTHORIZED"), { status: 401, headers: corsHeaders });
      }

      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return json(errorPayload("Invalid JSON body", "INVALID_JSON"), { status: 400, headers: corsHeaders });
      }

      const issueNumber = typeof (body as { issueNumber?: unknown })?.issueNumber === "number"
        ? (body as { issueNumber: number }).issueNumber
        : Number.NaN;
      if (!Number.isInteger(issueNumber) || issueNumber < 1) {
        return json(errorPayload("Invalid issue number", "VALIDATION_ERROR"), { status: 400, headers: corsHeaders });
      }

      const target = String((body as { target?: unknown })?.target || "").trim();
      const action = String((body as { action?: unknown })?.action || "").trim();
      if (!target || !action || !["issue", "pull_request"].includes(target)) {
        return json(errorPayload("Invalid action payload", "VALIDATION_ERROR"), { status: 400, headers: corsHeaders });
      }

      try {
        const result = await executeAction(env, issueNumber, target as "issue" | "pull_request", action);
        return json({ success: true, target, action, pullRequest: result.pullRequest }, { headers: corsHeaders });
      } catch (err) {
        if (err instanceof ActionError) {
          return json(errorPayload(err.message, err.code), { status: 422, headers: corsHeaders });
        }
        const message = getErrorMessage(err, "Failed to apply action");
        console.error("Failed to apply action:", { issueNumber, target, action, message, err });
        return json(errorPayload(message, "GITHUB_ERROR"), { status: 502, headers: corsHeaders });
      }
    }

    if (request.method === "POST" && url.pathname === "/api/reconcile-merge-requests") {
      if (!isAuthorizedRequest(request, env)) {
        return json(errorPayload("Unauthorized", "UNAUTHORIZED"), { status: 401, headers: corsHeaders });
      }

      try {
        const result = await reconcileMergeRequestedIssues(env);
        return json({ success: true, ...result }, { headers: corsHeaders });
      } catch (err) {
        const message = getErrorMessage(err, "Failed to reconcile merge requests");
        console.error("Failed to reconcile merge requests:", { message, err });
        return json(errorPayload(message, "GITHUB_ERROR"), { status: 502, headers: corsHeaders });
      }
    }

    if (request.method === "POST" && url.pathname === "/api/cancel") {
      if (!isAuthorizedRequest(request, env)) {
        return json(errorPayload("Unauthorized", "UNAUTHORIZED"), { status: 401, headers: corsHeaders });
      }

      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return json(errorPayload("Invalid JSON body", "INVALID_JSON"), { status: 400, headers: corsHeaders });
      }

      const submissionId = typeof (body as { submissionId?: unknown })?.submissionId === "string"
        ? (body as { submissionId: string }).submissionId.trim()
        : "";
      if (!submissionId) {
        return json(errorPayload("submissionId required", "VALIDATION_ERROR"), { status: 400, headers: corsHeaders });
      }

      if (env.CANCELLATIONS) {
        const audioKey = await env.CANCELLATIONS.get(`sub:${submissionId}`);
        if (audioKey) {
          await env.feedback_gitops_audio.delete(audioKey).catch(() => {});
          await env.CANCELLATIONS.delete(`sub:${submissionId}`);
        }
        await env.CANCELLATIONS.put(`cancel:${submissionId}`, "1", { expirationTtl: 300 });
      }

      return json({ success: true } satisfies SuccessPayload, { headers: corsHeaders });
    }

    return json(errorPayload("Not Found", "NOT_FOUND"), { status: 404, headers: corsHeaders });
  },

  async queue(batch: MessageBatch<unknown>, env: Env): Promise<void> {
    const config: ConsumerConfig = {
      github: {
        pat: env.GITHUB_PAT,
        owner: env.GITHUB_REPO_OWNER,
        repo: env.GITHUB_REPO_NAME,
        labels: [],
        baseBranch: env.GITHUB_BASE_BRANCH || "main",
      },
      audio: {
        bucket: env.feedback_gitops_audio,
        ai: env.AI,
      },
      cancellations: env.CANCELLATIONS,
    };

    const consumer = createIssueConsumer<unknown>(config);
    return consumer(batch);
  },

  async scheduled(controller: ScheduledController, env: Env): Promise<void> {
    try {
      const result = await reconcileMergeRequestedIssues(env);
      console.log("Merge request reconcile finished:", { cron: controller.cron, ...result });
    } catch (error) {
      console.error("Merge request reconcile failed:", {
        cron: controller.cron,
        error: getErrorMessage(error, "Reconcile failed"),
      });
    }
  },
};
