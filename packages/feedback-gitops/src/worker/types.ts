export type AgentWorkState = "working" | "finished" | "unknown";

export type IssueStatus =
  | "new"
  | "queued"
  | "pr_draft"
  | "pr_open"
  | "pr_closed_unmerged"
  | "pr_merge_requested"
  | "merged"
  | "closed_unmerged";

export interface PullRequestSummary {
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

export type IssueActionId = "execute" | "hold" | "close" | "reopen";
export type PullRequestActionId = "merge" | "cancel_merge" | "close" | "reopen";

export interface GitHubAction {
  id: IssueActionId | PullRequestActionId;
  label: string;
  disabled?: boolean;
  reason?: string;
}

export interface IssueListItem {
  number: number;
  title: string;
  body?: string;
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

export interface GitHubIssueSummary {
  number: number;
  title: string;
  state: string;
  html_url: string;
  updated_at: string;
  body?: string;
  labels: Array<{ name?: string }>;
  pull_request?: unknown;
}

export interface ErrorPayload {
  ok: false;
  error: {
    error: string;
    code: string;
  };
}

export interface SuccessPayload {
  success: true;
  submissionId?: string;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message?: string }>;
}

export interface LinkedPullRequest {
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

export interface PullRequestTimelineEvent {
  event?: string;
  created_at?: string;
}

export interface IssueListOptions {
  statusFilter: Set<IssueStatus>;
  view: "active" | "needs_action" | "completed" | "all";
  query: string;
  sort: "updated_desc" | "updated_asc";
}
