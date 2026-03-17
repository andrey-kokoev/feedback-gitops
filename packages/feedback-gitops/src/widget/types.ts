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

export interface IssueListItem {
  number: number
  title: string
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
}

export type CaptureMode = 'text' | 'voice'
export type ActiveTab = 'new' | 'requests'
export type MobileTab = 'text' | 'voice' | 'list' | 'settings'
export type ListView = 'active' | 'needs_action' | 'completed' | 'all'
export type ListSort = 'updated_desc' | 'updated_asc'
export type VoiceDraftState = 'idle' | 'recording' | 'paused'
