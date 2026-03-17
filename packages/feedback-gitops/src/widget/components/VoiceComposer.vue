<template>
  <div :class="mobile ? 'cfw-m-voice' : 'cfw-voice-shell'">
    <template v-if="!mobile">
      <div class="cfw-settings-row">
        <p class="cfw-muted-note">Current URL is attached automatically to the issue payload.</p>
        <button
          id="cfw-draft-settings-toggle"
          type="button"
          class="cfw-btn cfw-btn-outline cfw-settings-toggle"
          :aria-expanded="store.draftSettingsOpen ? 'true' : 'false'"
          aria-controls="cfw-draft-settings"
          @click="store.draftSettingsOpen = !store.draftSettingsOpen; persist()"
        >&#9881;</button>
      </div>
      <div id="cfw-draft-settings" :class="['cfw-settings-panel', { active: store.draftSettingsOpen }]">
        <label class="cfw-label" for="cfw-merge-policy">Merge policy</label>
        <select id="cfw-merge-policy" class="cfw-select" v-model="store.draftMergePolicy" @change="persist">
          <option value="manual">Manual merge</option>
          <option value="auto_unblocked">Auto-merge when unblocked</option>
        </select>
      </div>
    </template>

    <div :class="mobile ? 'cfw-m-vstatus' : 'cfw-voice-status'">
      <div :class="mobile ? 'cfw-m-vstatus-line' : 'cfw-voice-status-line'">{{ statusLine }}</div>
      <div :class="mobile ? 'cfw-m-vmeta' : 'cfw-voice-meta'">
        <span>Draft recording</span>
        <strong>{{ formatDuration(store.voiceDraftDurationMs) }}</strong>
      </div>
    </div>

    <div :class="mobile ? 'cfw-m-vcontrols' : 'cfw-voice-controls'">
      <button
        type="button"
        :class="['cfw-btn', store.voiceDraftState === 'recording' ? 'cfw-btn-primary' : 'cfw-btn-outline']"
        :disabled="store.creating"
        @click="$emit('toggle-recording')"
      >{{ store.voiceDraftState === 'recording' ? 'Pause' : 'Record' }}</button>
      <button
        type="button"
        class="cfw-btn cfw-btn-danger"
        :disabled="store.creating || (!store.voiceDraftReady && store.voiceDraftState === 'idle')"
        @click="$emit('reset')"
      >Reset</button>
      <button
        type="button"
        class="cfw-btn cfw-btn-primary"
        :disabled="store.creating || store.voiceDraftState === 'recording' || !store.voiceDraftReady"
        @click="$emit('send')"
      >Send</button>
    </div>

    <div :class="mobile ? 'cfw-m-vhint' : 'cfw-voice-hint'">
      {{ store.voiceDraftReady ? 'Recording is ready to send.' : 'Tap Record to start a draft. Settings &#9881; contains merge policy.' }}
    </div>

    <div v-if="store.createError && mobile" class="cfw-m-verror active">{{ store.createError }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'

defineProps<{ mobile?: boolean }>()
defineEmits<{
  'toggle-recording': []
  'reset': []
  'send': []
}>()

const store = useWidgetStore()
const { persist } = useWidgetState()

const statusLine = computed(() => {
  if (store.voiceDraftState === 'recording') return 'Recording in progress'
  if (store.voiceDraftState === 'paused' && store.voiceDraftReady) return 'Recording paused'
  return 'Ready to record'
})

function formatDuration(ms: number): string {
  const total = Math.max(0, Math.floor((ms || 0) / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0')
}
</script>
