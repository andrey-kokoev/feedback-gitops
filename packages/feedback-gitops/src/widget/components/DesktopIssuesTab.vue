<template>
  <section id="cfw-view-requests" :class="{ active: true }">
    <div id="cfw-requests-head">
      <h4>Recent requests</h4>
      <button
        id="cfw-refresh-issues"
        type="button"
        class="cfw-btn cfw-btn-outline"
        :disabled="store.loadingIssues"
        @click="$emit('refresh')"
      >{{ store.loadingIssues ? 'Loading...' : 'Refresh' }}</button>
    </div>

    <div id="cfw-requests-controls">
      <div id="cfw-requests-controls-top">
        <input
          id="cfw-requests-search"
          type="search"
          placeholder="Search title, #, labels, status, policy"
          v-model="store.listQuery"
          @change="onFilterChange"
        />
        <select id="cfw-requests-view" v-model="store.listView" @change="onFilterChange">
          <option value="active">Active</option>
          <option value="needs_action">Needs action</option>
          <option value="completed">Completed</option>
          <option value="all">All</option>
        </select>
        <select id="cfw-requests-sort" v-model="store.listSort" @change="onFilterChange">
          <option value="updated_desc">Newest</option>
          <option value="updated_asc">Oldest</option>
        </select>
        <button
          id="cfw-clear-filters"
          type="button"
          class="cfw-btn cfw-btn-outline"
          @click="clearFilters"
        >Clear</button>
      </div>

      <div id="cfw-status-filters">
        <button
          v-for="[val, label] in STATUS_CHIPS"
          :key="val"
          type="button"
          class="cfw-chip"
          :class="{ active: store.listStatusFilter.includes(val) }"
          @click="toggleStatus(val)"
        >{{ label }}</button>
      </div>
    </div>

    <div v-if="store.listError" id="cfw-issues-error" class="cfw-error active">{{ store.listError }}</div>
    <div v-if="store.executeError" id="cfw-execute-error" class="cfw-error active">{{ store.executeError }}</div>

    <div v-if="!store.issues.length" id="cfw-issues-empty">No requests yet.</div>

    <template v-else>
      <div id="cfw-issues-table-wrap">
        <table id="cfw-issues-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>PR</th>
              <th>Labels</th>
              <th>Policy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="cfw-issues-body">
            <template v-for="issue in store.issues" :key="issue.number">
              <tr>
                <td>#{{ issue.number }}</td>
                <td>
                  <a :href="issue.url" target="_blank" rel="noopener noreferrer" class="cfw-link">{{ issue.title }}</a>
                </td>
                <td>
                  {{ issue.status || issue.state }}
                  <div v-if="issue.statusDetail" class="muted">{{ issue.statusDetail }}</div>
                </td>
                <td>
                  <template v-if="issue.pullRequest?.url">
                    <a :href="issue.pullRequest.url" target="_blank" rel="noopener noreferrer" class="cfw-link">
                      #{{ issue.pullRequest.number }} &middot; {{ (issue.pullRequest.state || '').toLowerCase() }}
                    </a>
                    <div v-if="getAgentWorkLabel(issue.pullRequest)" class="muted">{{ getAgentWorkLabel(issue.pullRequest) }}</div>
                  </template>
                  <template v-else>-</template>
                </td>
                <td>
                  <template v-if="issue.labels?.length">
                    <span v-for="label in issue.labels" :key="label" class="cfw-badge">{{ label }}</span>
                  </template>
                  <template v-else>-</template>
                </td>
                <td>
                  <span class="cfw-badge">{{ issue.mergePolicy === 'auto_unblocked' ? 'Policy: Auto' : 'Policy: Manual' }}</span>
                </td>
                <td>
                  <div class="cfw-row-actions">
                    <template v-for="action in (issue.issueActions || [])" :key="action.id">
                      <div class="cfw-action-wrap">
                        <button
                          type="button"
                          :class="['cfw-btn', 'cfw-btn-outline', { 'cfw-btn-disabled': action.disabled }]"
                          :disabled="action.disabled || store.executingIssue === issue.number"
                          @click="!action.disabled && $emit('action', issue.number, 'issue', action.id)"
                        >{{ action.label || action.id }}</button>
                        <span v-if="action.disabled && action.reason" class="cfw-action-reason">{{ action.reason }}</span>
                      </div>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="issue.pullRequest?.url" class="cfw-sub-row">
                <td></td>
                <td>
                  <div class="cfw-sub-item">
                    <strong>PR</strong>
                    <a :href="issue.pullRequest.url" target="_blank" rel="noopener noreferrer" class="cfw-link">#{{ issue.pullRequest.number }}</a>
                  </div>
                </td>
                <td>
                  {{ (issue.pullRequest.state || '').toLowerCase() }}{{ issue.pullRequest.isDraft ? ' · draft' : '' }}{{ issue.pullRequest.statusDetail ? ' · ' + issue.pullRequest.statusDetail : '' }}{{ getAgentWorkLabel(issue.pullRequest) ? ' · ' + getAgentWorkLabel(issue.pullRequest) : '' }}
                </td>
                <td>-</td>
                <td>-</td>
                <td></td>
                <td>
                  <div class="cfw-row-actions">
                    <template v-for="action in (issue.pullRequestActions || [])" :key="action.id">
                      <div class="cfw-action-wrap">
                        <button
                          type="button"
                          :class="['cfw-btn', 'cfw-btn-outline', { 'cfw-btn-disabled': action.disabled }]"
                          :disabled="action.disabled || store.executingIssue === issue.number"
                          @click="!action.disabled && $emit('action', issue.number, 'pull_request', action.id)"
                        >{{ action.label || action.id }}</button>
                        <span v-if="action.disabled && action.reason" class="cfw-action-reason">{{ action.reason }}</span>
                      </div>
                    </template>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'
import type { PullRequestSummary } from '../types'

const emit = defineEmits<{
  refresh: []
  action: [issueNumber: number, target: 'issue' | 'pull_request', actionId: string]
}>()

const store = useWidgetStore()
const { persist } = useWidgetState()

const STATUS_CHIPS: [string, string][] = [
  ['new', 'New'],
  ['queued', 'Queued'],
  ['pr_draft', 'PR draft'],
  ['pr_open', 'PR open'],
  ['pr_closed_unmerged', 'PR closed'],
  ['pr_merge_requested', 'Merge requested'],
  ['merged', 'Merged'],
  ['closed_unmerged', 'Closed'],
]

function getAgentWorkLabel(pr: PullRequestSummary | null): string {
  if (!pr) return ''
  const s = String(pr.agentWorkState || '').toLowerCase()
  if (s === 'working') return 'Copilot: Working'
  if (s === 'finished') return 'Copilot: Finished'
  return ''
}

function toggleStatus(val: string) {
  const next = store.listStatusFilter.slice()
  const idx = next.indexOf(val)
  if (idx >= 0) next.splice(idx, 1)
  else next.push(val)
  store.listStatusFilter = next
  persist()
  emit('refresh')
}

function clearFilters() {
  store.listView = 'active'
  store.listQuery = ''
  store.listStatusFilter = []
  persist()
  emit('refresh')
}

function onFilterChange() {
  persist()
  emit('refresh')
}
</script>
