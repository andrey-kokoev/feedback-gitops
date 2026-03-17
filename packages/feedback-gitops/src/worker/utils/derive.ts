import type { IssueStatus, PullRequestSummary, GitHubAction } from '../types';

export function isMergeRequested(labels: string[]): boolean {
  return labels.includes("agent-merge-requested");
}

export function deriveMergePolicy(labels: string[]): 'auto_unblocked' | 'manual' {
  if (labels.includes('agent-policy-auto-merge')) return 'auto_unblocked';
  return 'manual';
}

export function deriveMergeStatusDetail(labels: string[], pullRequest: PullRequestSummary | null): string {
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

export function deriveIssueStatus(issueState: "open" | "closed", labels: string[], pullRequest: PullRequestSummary | null): IssueStatus {
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

export function deriveIssueActions(issueState: "open" | "closed", labels: string[]): GitHubAction[] {
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

export function derivePullRequestActions(labels: string[], pullRequest: PullRequestSummary | null): GitHubAction[] {
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
