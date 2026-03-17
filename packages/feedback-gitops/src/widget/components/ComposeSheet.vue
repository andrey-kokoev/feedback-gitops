<template>
  <div id="cfw-compose-overlay" :class="{ active: open }" @click="$emit('close')"></div>
  <div id="cfw-compose-sheet" :class="{ active: open, 'panel-left': store.handedness === 'left' }">
    <div id="cfw-compose-handle"></div>
    <div class="cfw-compose-header">
      <span class="cfw-compose-title">{{ mode === 'comment' ? 'New Comment' : 'Create Linked Item' }}</span>
      <button class="cfw-compose-close" @click="$emit('close')">&times;</button>
    </div>
    
    <div v-if="issue" class="cfw-compose-context">
      <div class="cfw-compose-context-quote">
        <strong>#{{ issue.number }}</strong> {{ issue.title }}
      </div>
    </div>
    
    <div class="cfw-compose-body">
      <div class="cfw-textarea-wrap" style="flex: 1; padding: 14px;">
        <textarea
          ref="descRef"
          v-model="store.draftDescription"
          :placeholder="mode === 'comment' ? 'Write a comment...' : 'Describe the linked item...'"
          maxlength="5000"
          style="height: 100%; border: none; background: transparent; color: #d9e7f7; font-size: 14px; width: 100%; resize: none; outline: none; padding: 0;"
          @keydown.ctrl.enter="onSubmit"
          @keydown.meta.enter="onSubmit"
        ></textarea>
      </div>
      <div class="cfw-compose-actions" style="padding: 14px; border-top: 1px solid rgba(124,187,255,0.15); display: flex; justify-content: flex-end; gap: 8px;">
        <button class="cfw-btn cfw-btn-outline" @click="$emit('close')">Cancel</button>
        <button class="cfw-btn cfw-btn-primary" :disabled="!hasDraft" @click="onSubmit">
          {{ store.creating ? 'Submitting...' : 'Submit' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useApi } from '../composables/useApi'
import type { IssueListItem } from '../types'

const props = defineProps<{
  open: boolean
  mode: 'comment' | 'linked_item'
  issue: IssueListItem | null
}>()

const emit = defineEmits<{
  close: []
  'action-done': []
}>()

const store = useWidgetStore()
const { submitComment, createLinkedItem } = useApi()

const descRef = ref<HTMLTextAreaElement | null>(null)

const hasDraft = computed(() => !!store.draftDescription.trim())

watch(() => props.open, (val) => {
  if (val) {
    store.draftDescription = '' // clear draft for follow-on
    nextTick(() => descRef.value?.focus())
  }
})

async function onSubmit() {
  if (!props.issue) return
  if (store.creating) return
  
  const description = store.draftDescription.trim()
  if (!description) {
    store.createError = 'Please provide text.'
    return
  }
  
  store.createError = ''
  store.creating = true
  try {
    if (props.mode === 'comment') {
      await submitComment(props.issue.number, description)
    } else {
      const titleLine = description.split('\n')[0]
      const title = titleLine.length > 50 ? titleLine.slice(0, 50) + '...' : titleLine
      await createLinkedItem(props.issue.number, title, description, false)
    }
    
    store.draftDescription = ''
    emit('action-done')
    emit('close')
  } catch (err) {
    store.createError = err instanceof Error ? err.message : 'Failed to submit'
  } finally {
    store.creating = false
  }
}
</script>
