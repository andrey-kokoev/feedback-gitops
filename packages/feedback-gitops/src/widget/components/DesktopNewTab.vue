<template>
  <section id="cfw-view-new" :class="{ active: true }">
    <div class="cfw-capture-modes">
      <button
        id="cfw-mode-voice"
        type="button"
        :class="{ active: store.captureMode === 'voice' }"
        @click="store.captureMode = 'voice'; persist()"
      >Voice</button>
      <button
        id="cfw-mode-text"
        type="button"
        :class="{ active: store.captureMode === 'text' }"
        @click="store.captureMode = 'text'; persist()"
      >Type</button>
    </div>

    <div id="cfw-pane-voice" :class="['cfw-capture-pane', { active: store.captureMode === 'voice' }]">
      <VoiceComposer
        @toggle-recording="$emit('toggle-recording')"
        @reset="$emit('voice-reset')"
        @send="$emit('voice-send')"
      />
    </div>

    <div id="cfw-pane-text" :class="['cfw-capture-pane', { active: store.captureMode === 'text' }]">
      <TextForm @create="(execute) => $emit('create', execute)" />
    </div>

    <div v-if="store.captureMode === 'voice' && store.createError" id="cfw-new-error" class="cfw-error active">
      {{ store.createError }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'
import VoiceComposer from './VoiceComposer.vue'
import TextForm from './TextForm.vue'

defineEmits<{
  'toggle-recording': []
  'voice-reset': []
  'voice-send': []
  'create': [execute: boolean]
}>()

const store = useWidgetStore()
const { persist } = useWidgetState()
</script>
