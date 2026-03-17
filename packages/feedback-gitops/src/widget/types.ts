export interface WidgetConfig {
  endpoint: string
  issuesEndpoint: string
  actionEndpoint: string
  cancelEndpoint: string
  repo: string
  labels: string
  storageKey: string
}

export type IssueStatus =
  | 'new' | 'queued' | 'pr_draft' | 'pr_open'
  | 'pr_closed_unmerged' | 'pr_merge_requested'
  | 'merged' | 'closed_unmerged'

export interface GitHubAction {
  id: string
  label: string
  disabled?: boolean
  reason?: string
}

export interface PullRequestSummary {
  id: string
  number: number
  url: string
  state: 'OPEN' | 'CLOSED' | 'MERGED'
  isDraft: boolean
  reviewDecision: string
  mergeStateStatus: string
  autoMergeRequestedAt: string | null
  mergedAt: string | null
  updatedAt: string
  headRefOid: string
  agentWorkState: 'working' | 'finished' | 'unknown'
  agentWorkUpdatedAt: string | null
  statusDetail?: string
}

export interface IssueComment {
  id: string
  body: string
  createdAt: string
  author?: string
}

export interface IssueListItem {
  number: number
  title: string
  body?: string
  state: 'open' | 'closed'
  url: string
  updatedAt: string
  labels: string[]
  status: IssueStatus
  statusDetail: string
  pullRequest: PullRequestSummary | null
  issueActions: GitHubAction[]
  pullRequestActions: GitHubAction[]
  mergePolicy: 'auto_unblocked' | 'manual'
  commentCount?: number
  comments?: IssueComment[]
  pinned?: boolean
  sourceIssue?: {
    number: number
    title: string
    url: string
  }
}

export type WidgetMode = 'technical_issue' | 'personal_todo' | 'feature_request'

export type SwipeActionType =
  | 'done_archive'
  | 'pin_unpin'
  | 'comment'
  | 'create_linked_item'
  | 'mark_viewed'
  | 'none'

export interface SwipeMapping {
  shortLeft: SwipeActionType
  shortRight: SwipeActionType
  longLeft: SwipeActionType
  longRight: SwipeActionType
}

export type MobileTab = 'text' | 'list' | 'settings' // Note: 'text' is compose, 'list' is Activity
export type ListView = 'active' | 'needs_action' | 'completed' | 'all'
export type ListSort = 'updated_desc' | 'updated_asc'
