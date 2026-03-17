<template>
  <div id="cfw-mv-settings" :class="['cfw-mv', { active: store.mobileTab === 'settings' }]">
    <div class="cfw-tab-body">
    <div class="cfw-m-settings">
      <h3>Admin token</h3>
      <div id="cfw-m-token-status" class="cfw-m-settings-token">{{ tokenStatus }}</div>
      <div class="cfw-m-hand-toggle">
        <button class="cfw-m-hand-btn" @click="onUpdateToken">Update</button>
        <button class="cfw-m-hand-btn" @click="onClearToken">Clear</button>
      </div>
      <p class="cfw-m-settings-note">Token authenticates all widget actions.</p>

      <h3>Merge policy</h3>
      <div class="cfw-m-hand-toggle">
        <button
          class="cfw-m-hand-btn"
          :class="{ active: store.draftMergePolicy === 'manual' }"
          type="button"
          @click="store.draftMergePolicy = 'manual'; persist()"
        >Manual</button>
        <button
          class="cfw-m-hand-btn"
          :class="{ active: store.draftMergePolicy === 'auto_unblocked' }"
          type="button"
          @click="store.draftMergePolicy = 'auto_unblocked'; persist()"
        >Auto-merge</button>
      </div>

      <h3>Button side</h3>
      <div class="cfw-m-hand-toggle">
        <button
          class="cfw-m-hand-btn"
          :class="{ active: store.handedness === 'left' }"
          @click="$emit('handedness', 'left')"
        >&#9664; Left</button>
        <button
          class="cfw-m-hand-btn"
          :class="{ active: store.handedness === 'right' }"
          @click="$emit('handedness', 'right')"
        >Right &#9654;</button>
      </div>
      <p class="cfw-m-settings-note">Or swipe the open button left or right.</p>

      <h3>Panel position</h3>
      <div class="cfw-m-hand-toggle">
        <button
          class="cfw-m-hand-btn"
          :class="{ active: store.panelSnap === 'top' }"
          type="button"
          @click="store.panelSnap = 'top'; persist()"
        >&#9650; Top</button>
        <button
          class="cfw-m-hand-btn"
          :class="{ active: store.panelSnap === 'bottom' }"
          type="button"
          @click="store.panelSnap = 'bottom'; persist()"
        >Bottom &#9660;</button>
      </div>
      <p class="cfw-m-settings-note">Or swipe the panel handle up or down.</p>
    </div>
    </div><!-- /cfw-tab-body -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'
import { useAdminToken } from '../composables/useAdminToken'

const emit = defineEmits<{
  handedness: [side: 'left' | 'right']
  'token-changed': []
}>()

const store = useWidgetStore()
const { persist } = useWidgetState()
const { readToken, writeToken, promptToken } = useAdminToken()

const tokenStatus = computed(() => {
  const tok = readToken()
  return tok ? 'Token is set: ' + tok.slice(0, 3) + '\u2026' : 'No token set.'
})

function onUpdateToken() {
  promptToken()
  emit('token-changed')
}

function onClearToken() {
  if (!window.confirm('Clear saved admin token?')) return
  writeToken('')
  emit('token-changed')
}
</script>
