<template>
  <div id="cfw-mv-list" :class="['cfw-mv', { active: store.mobileTab === 'list' }]">
    <div class="cfw-panel-handle" @touchstart.passive="onPanelTouchStart" @touchend="onPanelTouchEnd"><div class="cfw-panel-handle-bar"></div></div>
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
        <template v-if="pinnedIssues.length">
          <div class="cfw-ml-section-label">Pinned</div>
          <IssueRow
            v-for="issue in pinnedIssues"
            :key="issue.number"
            :issue="issue"
            @open-issue="$emit('open-issue', $event)"
            @swipe-action="a => $emit('swipe-action', a, issue)"
            @edit-issue="$emit('edit-issue', issue)"
          />
        </template>
        <template v-if="unpinnedIssues.length">
          <div v-if="pinnedIssues.length" class="cfw-ml-section-label">Activity</div>
          <IssueRow
            v-for="issue in unpinnedIssues"
            :key="issue.number"
            :issue="issue"
            @open-issue="$emit('open-issue', $event)"
            @swipe-action="a => $emit('swipe-action', a, issue)"
            @edit-issue="$emit('edit-issue', issue)"
          />
        </template>
      </template>
    </div>
    </div><!-- /cfw-tab-body -->
    <!-- Bottom dragger for middle position -->
    <div v-if="store.panelSnap === 'middle'" class="cfw-panel-handle cfw-panel-handle-bottom" @touchstart.passive="onPanelTouchStart" @touchend="onPanelTouchEnd"><div class="cfw-panel-handle-bar"></div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useApi } from '../composables/useApi'
import { usePanelSwipe } from '../composables/usePanelSwipe'
import type { IssueListItem, SwipeActionType } from '../types'
import IssueRow from './IssueRow.vue'

const emit = defineEmits<{
  refresh: []
  'open-issue': [issue: IssueListItem]
  'open-filter': []
  'swipe-action': [action: SwipeActionType, issue: IssueListItem]
  'edit-issue': [issue: IssueListItem]
}>()

const store = useWidgetStore()
const { hasAccess } = useApi()
const { onPanelTouchStart, onPanelTouchEnd } = usePanelSwipe()

const PTR_THRESHOLD = 56
const ptrActive = ref(false)
const ptrText = ref('')
let ptrStartY = 0
let ptrTracking = false

const isUnresolved = (i: IssueListItem) => !['completed', 'closed_unmerged', 'merged'].includes(i.status || '') && i.state !== 'closed'
const pinnedIssues = computed(() => store.issues.filter(i => !!i.pinned && isUnresolved(i)))
const unpinnedIssues = computed(() => store.issues.filter(i => !i.pinned || !isUnresolved(i)))

const emptyText = computed(() => {
  if (!hasAccess()) return 'Authentication required to view requests.'
  if (store.loadingIssues) return 'Loading\u2026'
  if (store.listError) return store.listError
  return 'No requests yet.'
})


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
