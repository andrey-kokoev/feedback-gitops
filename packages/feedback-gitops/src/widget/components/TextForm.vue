<template>
  <div class="cfw-text-form-wrap">
    <input
      ref="titleInputRef"
      :id="titleId"
      v-model="store.draftTitle"
      type="text"
      placeholder="Title"
      maxlength="500"
      @input="onPersist"
    />
    <textarea
      :id="descId"
      v-model="store.draftDescription"
      :placeholder="'Describe the requested change...'"
      maxlength="5000"
      @input="onPersist"
    ></textarea>

    <div v-if="mobile" class="cfw-mf-policy">
      <label>Merge policy</label>
      <div class="cfw-m-hand-toggle">
        <button
          type="button"
          class="cfw-m-hand-btn"
          :class="{ active: store.draftMergePolicy === 'manual' }"
          @click="setPolicy('manual')"
        >Manual</button>
        <button
          type="button"
          class="cfw-m-hand-btn"
          :class="{ active: store.draftMergePolicy === 'auto_unblocked' }"
          @click="setPolicy('auto_unblocked')"
        >Auto-merge</button>
      </div>
    </div>
    <template v-else>
      <div class="cfw-field-group">
        <label class="cfw-label" for="cfw-text-merge-policy">Merge policy</label>
        <select id="cfw-text-merge-policy" class="cfw-select" v-model="store.draftMergePolicy" @change="onPersist">
          <option value="manual">Manual merge</option>
          <option value="auto_unblocked">Auto-merge when unblocked</option>
        </select>
      </div>
      <p class="cfw-muted-note">Current URL is attached automatically to the issue payload.</p>
    </template>

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
        id="cfw-m-create-only"
        class="cfw-btn cfw-btn-outline"
        type="button"
        :disabled="store.creating"
        @click="$emit('create', false)"
      >Create</button>
      <button
        id="cfw-m-create-execute"
        class="cfw-btn cfw-btn-primary"
        type="button"
        :disabled="store.creating"
        @click="$emit('create', true)"
      >{{ store.creating ? 'Saving...' : 'Create &amp; Execute' }}</button>
    </div>
    <template v-else>
      <div id="cfw-new-actions">
        <button
          id="cfw-create-only"
          type="button"
          class="cfw-btn cfw-btn-outline"
          :disabled="store.creating"
          @click="$emit('create', false)"
        >Create only</button>
        <button
          id="cfw-create-execute"
          type="button"
          class="cfw-btn cfw-btn-primary"
          :disabled="store.creating"
          @click="$emit('create', true)"
        >{{ store.creating ? 'Saving...' : 'Create &amp; Execute' }}</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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

const titleId = computed(() => props.titleId ?? (props.mobile ? 'cfw-m-title' : 'cfw-title'))
const descId = computed(() => props.descId ?? (props.mobile ? 'cfw-m-description' : 'cfw-description'))

const hasDraftContent = computed(() => !!(store.draftTitle.trim() || store.draftDescription.trim()))

function onPersist() {
  persist()
}

function setPolicy(val: 'manual' | 'auto_unblocked') {
  store.draftMergePolicy = val
  persist()
}

function clearDraft() {
  store.draftTitle = ''
  store.draftDescription = ''
  persist()
}

const titleInputRef = ref<HTMLInputElement | null>(null)
defineExpose({ focusTitle: () => titleInputRef.value?.focus() })
</script>
