/**
 * Widget UI constants
 * Centralized option lists used across multiple components
 */

export const VIEW_OPTIONS: [string, string][] = [
  ['active', 'Active'],
  ['needs_action', 'Needs action'],
  ['unread', 'Unread'],
  ['completed', 'Completed'],
  ['all', 'All'],
]

export const SORT_OPTIONS: [string, string][] = [
  ['updated_desc', 'Newest'],
  ['updated_asc', 'Oldest'],
]

export const STATUS_OPTIONS: [string, string][] = [
  ['new', 'New'],
  ['queued', 'Queued'],
  ['pr_draft', 'PR draft'],
  ['pr_open', 'PR open'],
  ['pr_closed_unmerged', 'PR closed'],
  ['pr_merge_requested', 'Merge requested'],
  ['merged', 'Merged'],
  ['closed_unmerged', 'Closed'],
]

export const MERGE_POLICY_OPTIONS: [string, string][] = [
  ['manual', 'Manual merge'],
  ['auto_unblocked', 'Auto-merge when unblocked'],
]
