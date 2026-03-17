<template>
  <div id="cfw-mbs-overlay" :class="{ active: open }" @click="$emit('close')"></div>
  <div id="cfw-mbs" :class="{ active: open, 'panel-left': store.handedness === 'left' }">
    <div id="cfw-mbs-handle"></div>
    <div v-if="issue" id="cfw-mbs-content">
      <div class="cfw-is-num">#{{ issue.number }}</div>
      <a class="cfw-is-title" :href="issue.url" target="_blank" rel="noopener noreferrer">{{ issue.title }}</a>
      <div class="cfw-is-status">{{ issue.status || issue.state }}{{ issue.statusDetail ? ' \u00b7 ' + issue.statusDetail : '' }}</div>

      <div v-if="issue.labels?.length" class="cfw-is-badges">
        <span v-for="label in issue.labels" :key="label" class="cfw-badge">{{ label }}</span>
      </div>

      <!-- Issue actions -->
      <div v-if="issueActions.length" class="cfw-is-section">
        <div class="cfw-is-section-label">Issue actions</div>
        <div class="cfw-is-actions">
          <div v-for="action in issueActions" :key="action.id">
            <button
              class="cfw-is-action-btn"
              :disabled="action.disabled || executing"
              @click="!action.disabled && onAction(issue.number, 'issue', action.id)"
            >{{ action.label || action.id }}</button>
            <span v-if="action.disabled && action.reason" class="cfw-is-action-reason">{{ action.reason }}</span>
          </div>
        </div>
      </div>

      <!-- PR section -->
      <div v-if="issue.pullRequest?.url" class="cfw-is-section">
        <div class="cfw-is-section-label">Pull request</div>
        <a
          class="cfw-is-pr-link"
          :href="issue.pullRequest.url"
          target="_blank"
          rel="noopener noreferrer"
        >PR #{{ issue.pullRequest.number }} &middot; {{ (issue.pullRequest.state || '').toLowerCase() }}{{ issue.pullRequest.isDraft ? ' \u00b7 draft' : '' }}</a>

        <div v-if="prActions.length" class="cfw-is-actions" style="margin-top: 10px">
          <div v-for="action in prActions" :key="action.id">
            <button
              class="cfw-is-action-btn"
              :disabled="action.disabled || executing"
              @click="!action.disabled && onAction(issue.number, 'pull_request', action.id)"
            >{{ action.label || action.id }}</button>
            <span v-if="action.disabled && action.reason" class="cfw-is-action-reason">{{ action.reason }}</span>
          </div>
        </div>
      </div>

      <div v-if="actionError" class="cfw-is-error active">{{ actionError }}</div>

      <button class="cfw-mbs-close" @click="$emit('close')">Close</button>
    </div>

    <!-- Filter sheet content (shown when no issue, via filterMode) -->
    <div v-else-if="filterMode" id="cfw-mbs-content">
      <div class="cfw-fs-section">
        <div class="cfw-fs-label">View</div>
        <div class="cfw-fs-pills">
          <button
            v-for="[val, label] in VIEW_OPTIONS"
            :key="val"
            class="cfw-fs-pill"
            :class="{ active: store.listView === val }"
            @click="store.listView = val; persist(); $emit('filter-changed')"
          >{{ label }}</button>
        </div>
      </div>
      <div class="cfw-fs-section">
        <div class="cfw-fs-label">Sort</div>
        <div class="cfw-fs-pills">
          <button
            v-for="[val, label] in SORT_OPTIONS"
            :key="val"
            class="cfw-fs-pill"
            :class="{ active: store.listSort === val }"
            @click="store.listSort = val; persist(); $emit('filter-changed')"
          >{{ label }}</button>
        </div>
      </div>
      <div class="cfw-fs-section">
        <div class="cfw-fs-label">Status</div>
        <div class="cfw-fs-chips">
          <button
            v-for="[val, label] in STATUS_OPTIONS"
            :key="val"
            class="cfw-fs-chip"
            :class="{ active: store.listStatusFilter.includes(val) }"
            @click="toggleStatus(val)"
          >{{ label }}</button>
        </div>
      </div>
      <button class="cfw-mbs-close" style="margin-bottom: 8px" @click="clearFilters">Clear filters</button>
      <button class="cfw-mbs-close" @click="$emit('close')">Done</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'
import { useApi } from '../composables/useApi'
import type { IssueListItem } from '../types'

const props = defineProps<{
  open: boolean
  issue?: IssueListItem | null
  filterMode?: boolean
}>()

const emit = defineEmits<{
  close: []
  'action-done': []
  'filter-changed': []
}>()

const store = useWidgetStore()
const { persist } = useWidgetState()
const { executeAction, mapActionError } = useApi()

const executing = ref(false)
const actionError = ref('')


const issueActions = computed(() => Array.isArray(props.issue?.issueActions) ? props.issue!.issueActions : [])
const prActions = computed(() => Array.isArray(props.issue?.pullRequestActions) ? props.issue!.pullRequestActions : [])

const VIEW_OPTIONS: [string, string][] = [
  ['active', 'Active'], ['needs_action', 'Needs action'], ['completed', 'Completed'], ['all', 'All'],
]
const SORT_OPTIONS: [string, string][] = [
  ['updated_desc', 'Newest'], ['updated_asc', 'Oldest'],
]
const STATUS_OPTIONS: [string, string][] = [
  ['new', 'New'], ['queued', 'Queued'], ['pr_draft', 'PR draft'], ['pr_open', 'PR open'],
  ['pr_closed_unmerged', 'PR closed'], ['pr_merge_requested', 'Merge requested'],
  ['merged', 'Merged'], ['closed_unmerged', 'Closed'],
]

async function onAction(issueNumber: number, target: 'issue' | 'pull_request', actionId: string) {
  actionError.value = ''
  executing.value = true
  try {
    await executeAction(issueNumber, actionId, target)
    emit('action-done')
    emit('close')
  } catch (err) {
    actionError.value = mapActionError(err instanceof Error ? err.message : '')
  } finally {
    executing.value = false
  }
}

function toggleStatus(val: string) {
  const next = store.listStatusFilter.slice()
  const idx = next.indexOf(val)
  if (idx >= 0) next.splice(idx, 1)
  else next.push(val)
  store.listStatusFilter = next
  persist()
  emit('filter-changed')
}

function clearFilters() {
  store.listView = 'active'
  store.listQuery = ''
  store.listStatusFilter = []
  persist()
  emit('filter-changed')
  emit('close')
}
</script>
