<template>
  <div class="cfw-text-form-wrap">

    <div class="cfw-textarea-wrap">
      <textarea
        ref="descRef"
        :id="descId"
        v-model="store.draftDescription"
        :placeholder="composerPlaceholder"
        maxlength="5000"
        @input="onDescInput"
        @keydown.ctrl.enter="hasDraftContent && !store.creating && $emit('create', true)"
        @keydown.meta.enter="hasDraftContent && !store.creating && $emit('create', true)"
      ></textarea>
    </div>


    <div v-if="store.createError" :class="['cfw-error', mobile ? 'cfw-mf-error' : '']" class="active">
      {{ store.createError }}
    </div>

    <div v-if="mobile" class="cfw-mf-actions">
      <button
        v-if="hasDraftContent"
        id="cfw-m-clear"
        class="cfw-btn cfw-btn-outline"
        type="button"
        @click="clearDraft"
      >Clear</button>
      <button
        id="cfw-m-submit"
        class="cfw-btn cfw-btn-primary"
        type="button"
        :disabled="store.creating"
        @click="$emit('create', false)"
      >{{ store.creating ? 'Saving...' : 'Submit' }}</button>
    </div>
    <template v-else>
      <div id="cfw-new-actions">
        <button
          id="cfw-submit"
          type="button"
          class="cfw-btn cfw-btn-primary"
          :disabled="store.creating"
          @click="$emit('create', false)"
        >{{ store.creating ? 'Saving...' : 'Submit' }}</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'

const props = defineProps<{
  mobile?: boolean
  titleId?: string
  descId?: string
}>()

const emit = defineEmits<{
  create: [execute: boolean]
}>()

const store = useWidgetStore()
const { persist } = useWidgetState()

const descId = computed(() => props.descId ?? (props.mobile ? 'cfw-m-description' : 'cfw-description'))

const composerPlaceholder = computed(() => {
  switch (store.mode) {
    case 'personal_todo': return 'Capture a personal todo...'
    case 'feature_request': return 'Describe the requested feature...'
    case 'technical_issue':
    default: return 'Describe the technical issue...'
  }
})

const hasDraftContent = computed(() => !!store.draftDescription.trim())

function onPersist() {
  persist()
}

function clearDraft() {
  store.draftTitle = ''
  store.draftDescription = ''
  persist()
}

const descRef = ref<HTMLTextAreaElement | null>(null)

function resizeDesc() {
  const el = descRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
  // CSS max-height caps growth; show scroll only when capped
  el.style.overflowY = el.offsetHeight < el.scrollHeight ? 'auto' : 'hidden'
}

function onDescInput() {
  resizeDesc()
  onPersist()
}

onMounted(() => resizeDesc())

defineExpose({ focusTitle: () => descRef.value?.focus() })
</script>
