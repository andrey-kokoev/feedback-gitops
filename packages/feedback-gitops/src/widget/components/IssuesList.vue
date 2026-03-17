<template>
  <div id="cfw-mv-list" :class="['cfw-mv', { active: store.mobileTab === 'list' }]">
    <div class="cfw-tab-body">
    <div id="cfw-ml-head">
      <span id="cfw-ml-head-title">Requests</span>
      <div id="cfw-ml-head-actions">
        <button :disabled="store.loadingIssues" @click="$emit('open-filter')">&#x229E; Filter</button>
        <button :disabled="store.loadingIssues" @click="$emit('refresh')">
          {{ store.loadingIssues ? '&#8230;' : '&#8635;' }}
        </button>
      </div>
    </div>

    <div v-if="store.listError" id="cfw-ml-error" class="cfw-error active">{{ store.listError }}</div>

    <div id="cfw-ml-ptr" :class="{ 'cfw-ml-ptr-active': ptrActive }">{{ ptrText }}</div>

    <div
      id="cfw-ml-body"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="onTouchMove"
      @touchend.passive="onTouchEnd"
    >
      <div v-if="!store.issues.length" class="cfw-ml-empty">
        {{ emptyText }}
      </div>
      <template v-else>
        <div
          v-for="issue in store.issues"
          :key="issue.number"
          class="cfw-ml-row"
          @click="$emit('open-issue', issue)"
        >
          <div class="cfw-ml-row-left">
            <div class="cfw-ml-row-num">#{{ issue.number }}</div>
            <div class="cfw-ml-row-title">{{ issue.title }}</div>
            <div class="cfw-ml-row-meta">{{ getIssueMeta(issue) }}</div>
          </div>
          <div class="cfw-ml-row-status">{{ issue.status || issue.state }}</div>
        </div>
      </template>
    </div>
    </div><!-- /cfw-tab-body -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useAdminToken } from '../composables/useAdminToken'
import type { IssueListItem } from '../types'

const emit = defineEmits<{
  refresh: []
  'open-issue': [issue: IssueListItem]
  'open-filter': []
}>()

const store = useWidgetStore()
const { readToken } = useAdminToken()

const PTR_THRESHOLD = 56
const ptrActive = ref(false)
const ptrText = ref('')
let ptrStartY = 0
let ptrTracking = false

const emptyText = computed(() => {
  const token = readToken()
  if (!token) return 'Enter admin token in Settings \u2699 to view requests.'
  if (store.loadingIssues) return 'Loading\u2026'
  if (store.listError) return store.listError
  return 'No requests yet.'
})

function getIssueMeta(issue: IssueListItem): string {
  if (issue.pullRequest?.url) {
    return 'PR #' + issue.pullRequest.number + ' \u00b7 ' + (issue.pullRequest.state || '').toLowerCase()
  }
  const labels = Array.isArray(issue.labels) ? issue.labels.filter(l => !l.startsWith('agent-')) : []
  return labels.slice(0, 2).join(', ')
}

function onTouchStart(e: TouchEvent) {
  const body = e.currentTarget as HTMLElement
  if (body.scrollTop === 0) {
    ptrStartY = e.touches[0].clientY
    ptrTracking = true
  }
}

function onTouchMove(e: TouchEvent) {
  if (!ptrTracking) return
  const dy = e.touches[0].clientY - ptrStartY
  if (dy > 0) {
    ptrActive.value = true
    ptrText.value = dy > PTR_THRESHOLD ? '\u2191 Release to refresh' : '\u2193 Pull to refresh'
  } else {
    ptrTracking = false
    ptrActive.value = false
  }
}

function onTouchEnd(e: TouchEvent) {
  if (!ptrTracking) return
  const dy = e.changedTouches[0].clientY - ptrStartY
  ptrTracking = false
  if (dy > PTR_THRESHOLD) {
    ptrText.value = 'Refreshing\u2026'
    emit('refresh')
    // ptr will be reset by parent after refresh
    setTimeout(() => {
      ptrActive.value = false
      ptrText.value = ''
    }, 1000)
  } else {
    ptrActive.value = false
    ptrText.value = ''
  }
}
</script>
