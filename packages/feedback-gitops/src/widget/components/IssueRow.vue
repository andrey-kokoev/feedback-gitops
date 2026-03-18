<template>
  <div
    class="cfw-ml-row-wrap"
    :class="{ 'menu-open': menuOpen }"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div
      class="cfw-ml-row-bg"
      :class="swipeBgClass"
    >
      <div v-if="swipePreviewLabel" class="cfw-swipe-preview" :class="swipePreviewDirection">
        {{ swipePreviewLabel }}
      </div>
    </div>
    
    <div
      class="cfw-ml-row"
      :class="{ unread: isUnread, 'menu-open': menuOpen }"
      :style="rowStyle"
      @click="onClick"
      tabindex="0"
      @keydown.enter="onClick"
      @keydown.space.prevent="onClick"
    >
      <div class="cfw-ml-row-main">
        <div class="cfw-ml-row-header">
          <span class="cfw-ml-row-status">{{ issue.status || issue.state }}</span>
          <span v-if="issue.commentCount" class="cfw-ml-row-comments">{{ issue.commentCount }} comment{{ issue.commentCount === 1 ? '' : 's' }}</span>
          <span v-if="isUnread" class="cfw-ml-unread-dot"></span>
          <span class="cfw-ml-row-time">{{ metaText }}</span>
        </div>
        <div class="cfw-ml-row-title">{{ issue.title }}</div>
      </div>
      
      <!-- Desktop dots menu button (only visible on non-touch devices ideally) -->
      <button class="cfw-ml-row-menu" @click.stop="menuOpen = !menuOpen">&#8942;</button>

      <!-- Desktop dots menu dropdown -->
      <div v-if="menuOpen" class="cfw-desktop-menu">
        <button v-for="action in menuActions" :key="action.id" @click.stop="onMenuAction(action.id)">
          {{ action.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'
import type { IssueListItem, SwipeActionType } from '../types'

const props = defineProps<{
  issue: IssueListItem
}>()

const emit = defineEmits<{
  'open-issue': [issue: IssueListItem]
  'swipe-action': [action: SwipeActionType, issue: IssueListItem]
  'edit-issue': [issue: IssueListItem]
}>()

const store = useWidgetStore()
const { persist } = useWidgetState()

const isUnread = computed(() => {
  const lastView = store.itemViews[props.issue.number] || 0
  const updatedAt = new Date(props.issue.updatedAt).getTime()
  return updatedAt > lastView
})

const metaText = computed(() => {
  const date = new Date(props.issue.updatedAt)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
})

// Gestures
let startX = 0
let currentX = 0
const offsetX = ref(0)
const isSwiping = ref(false)

const SWIPE_SHORT = 80
const SWIPE_LONG = 160

const swipePreviewLabel = computed(() => {
  if (!isSwiping.value) return ''
  const dir = offsetX.value > 0 ? 'right' : 'left'
  const abs = Math.abs(offsetX.value)
  const actionId = abs > SWIPE_LONG ? store.swipeMapping[dir === 'right' ? 'longRight' : 'longLeft'] 
                    : abs > SWIPE_SHORT ? store.swipeMapping[dir === 'right' ? 'shortRight' : 'shortLeft'] 
                    : 'none'
  return formatActionLabel(actionId as SwipeActionType)
})

const swipePreviewDirection = computed(() => offsetX.value > 0 ? 'preview-left' : 'preview-right')

const swipeBgClass = computed(() => {
  if (!swipePreviewLabel.value || swipePreviewLabel.value === 'None') return ''
  return offsetX.value > 0 ? 'bg-right' : 'bg-left'
})

const rowStyle = computed(() => ({
  transform: `translateX(${offsetX.value}px)`,
  transition: isSwiping.value ? 'none' : 'transform 0.25s ease-out'
}))

function onTouchStart(e: TouchEvent) {
  startX = e.touches[0].clientX
  isSwiping.value = true
}

function onTouchMove(e: TouchEvent) {
  if (!isSwiping.value) return
  currentX = e.touches[0].clientX
  offsetX.value = currentX - startX
}

function onTouchEnd() {
  isSwiping.value = false
  const abs = Math.abs(offsetX.value)
  if (abs > SWIPE_SHORT) {
    const dir = offsetX.value > 0 ? 'right' : 'left'
    const actionId = abs > SWIPE_LONG ? store.swipeMapping[dir === 'right' ? 'longRight' : 'longLeft'] 
                      : store.swipeMapping[dir === 'right' ? 'shortRight' : 'shortLeft']
    if (actionId !== 'none') {
      emit('swipe-action', actionId as SwipeActionType, props.issue)
    }
  }
  offsetX.value = 0
}

function onClick() {
  store.itemViews[props.issue.number] = Date.now()
  persist()
  emit('open-issue', props.issue)
}

// Desktop menu
const menuOpen = ref(false)
const menuActions = computed(() => {
  const actions = [
    { id: 'done_archive', label: 'Done / Archive' },
    { id: 'pin_unpin', label: 'Pin / Unpin' },
    { id: 'comment', label: 'Comment' },
    { id: 'create_linked_item', label: 'Create linked item' },
    { id: 'mark_viewed', label: 'Mark viewed' },
  ]
  const isActedOn = (props.issue.comments && props.issue.comments.length > 0) || props.issue.status !== 'new'
  if (!isActedOn) {
    actions.unshift({ id: 'edit', label: 'Edit' })
  }
  return actions
})

function onMenuAction(id: string) {
  menuOpen.value = false
  if (id === 'edit') {
    emit('edit-issue', props.issue)
  } else {
    emit('swipe-action', id as SwipeActionType, props.issue)
  }
}

function formatActionLabel(actionId: SwipeActionType): string {
  const map: Record<SwipeActionType, string> = {
    'done_archive': 'Archive',
    'pin_unpin': 'Pin',
    'comment': 'Comment',
    'create_linked_item': 'Link',
    'mark_viewed': 'Mark viewed',
    'none': 'None'
  }
  return map[actionId] || 'None'
}
</script>
