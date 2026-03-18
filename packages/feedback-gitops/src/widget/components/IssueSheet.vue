<template>
  <div id="cfw-mbs-overlay" :class="{ active: open }" @click="$emit('close')"></div>
  <div id="cfw-mbs" :class="{ active: open, 'panel-left': store.handedness === 'left' }">
    <div id="cfw-mbs-handle"></div>
    <div v-if="issue" id="cfw-mbs-content">
      <div class="cfw-is-status">{{ issue.status || issue.state }}{{ issue.statusDetail ? ' \u00b7 ' + issue.statusDetail : '' }}</div>
      <div class="cfw-is-num">#{{ issue.number }} &middot; {{ formatTime(issue.updatedAt) }}</div>

      <a class="cfw-is-title" :href="issue.url" target="_blank" rel="noopener noreferrer">{{ issue.title }}</a>
      <div v-if="issue.body" class="cfw-is-body" style="font-size: 14px; color: #a9c2df; margin-top: 12px; white-space: pre-wrap; line-height: 1.5; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px;">{{ issue.body }}</div>

      <div v-if="issue.labels?.length" class="cfw-is-badges">
        <span v-for="label in issue.labels" :key="label" class="cfw-badge">{{ label }}</span>
      </div>

      <!-- Action-first CTA -->
      <div class="cfw-is-primary-box">
        <button class="cfw-is-pill cfw-is-pill-primary" @click="$emit('compose-sheet', 'comment', issue)">Comment</button>
      </div>



      <!-- Comments Section -->
      <div v-if="hasComments" class="cfw-is-section cfw-comments-section">
        <!-- Newest Comment -->
        <div v-if="newestComment" class="cfw-comment cfw-comment-newest">
          <div class="cfw-comment-meta">
            <strong>{{ newestComment.author || 'User' }}</strong> &middot; {{ formatTime(newestComment.createdAt) }}
          </div>
          <div class="cfw-comment-body">{{ newestComment.body }}</div>
        </div>

        <!-- Collapsible older items -->
        <template v-if="olderComments.length > 0">
          <button v-if="!expandedComments" class="cfw-comments-expand" @click="expandedComments = true">
            Show {{ olderComments.length }} previous comment{{ olderComments.length > 1 ? 's' : '' }}
          </button>
          <template v-else>
            <div v-for="c in olderComments" :key="c.id" class="cfw-comment">
              <div class="cfw-comment-meta">
                <strong>{{ c.author || 'User' }}</strong> &middot; {{ formatTime(c.createdAt) }}
              </div>
              <div class="cfw-comment-body">{{ c.body }}</div>
            </div>
          </template>
        </template>
      </div>

      <!-- Source section -->
      <div v-if="issue.sourceIssue" class="cfw-is-section">
        <div class="cfw-is-section-label">Source Item</div>
        <a class="cfw-is-pr-link" :href="issue.sourceIssue.url" target="_blank" rel="noopener noreferrer">
          #{{ issue.sourceIssue.number }} {{ issue.sourceIssue.title }}
        </a>
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

      <button class="cfw-mbs-close" @click.stop="$emit('close')">Close</button>
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
            @click="store.listView = val as any; persist(); $emit('filter-changed')"
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
            @click="store.listSort = val as any; persist(); $emit('filter-changed')"
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
      <button class="cfw-mbs-close" style="margin-bottom: 8px" @click.stop="clearFilters">Clear filters</button>
      <button class="cfw-mbs-close" @click.stop="$emit('close')">Done</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'
import { useApi } from '../composables/useApi'
import { VIEW_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS } from '../constants'
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
  'compose-sheet': [mode: 'comment' | 'linked_item', issue: IssueListItem]
}>()

const store = useWidgetStore()
const { persist } = useWidgetState()
const { executeAction, mapActionError } = useApi()

const executing = ref(false)
const actionError = ref('')
const expandedComments = ref(false)

const isActedOn = computed(() => {
  if (!props.issue) return false
  return (props.issue.comments && props.issue.comments.length > 0) || props.issue.status !== 'new'
})

const sortedComments = computed(() => {
  if (!props.issue?.comments) return []
  return [...props.issue.comments].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

const hasComments = computed(() => sortedComments.value.length > 0)
const newestComment = computed(() => sortedComments.value[0] || null)
const olderComments = computed(() => sortedComments.value.slice(1))

function formatTime(isoStr: string) {
  const date = new Date(isoStr)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}


const issueActions = computed(() => Array.isArray(props.issue?.issueActions) ? props.issue!.issueActions : [])
const prActions = computed(() => Array.isArray(props.issue?.pullRequestActions) ? props.issue!.pullRequestActions : [])

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
