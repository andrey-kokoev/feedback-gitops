<template>
  <div id="cfw-mv-settings" :class="['cfw-mv', { active: store.mobileTab === 'settings' }]">
    <div class="cfw-panel-handle" @touchstart.passive="onPanelTouchStart" @touchend="onPanelTouchEnd"><div class="cfw-panel-handle-bar"></div></div>
    <div class="cfw-tab-body">
    <div class="cfw-m-settings">
      <h3>Admin token</h3>
      <div id="cfw-m-token-status" class="cfw-m-settings-token">{{ tokenStatus }}</div>
      <div class="cfw-m-hand-toggle">
        <button class="cfw-m-hand-btn" @click="onUpdateToken">Update</button>
        <button class="cfw-m-hand-btn" @click="onClearToken">Clear</button>
      </div>
      <p class="cfw-m-settings-note">Token authenticates all widget actions.</p>

      <h3>Capture Mode</h3>
      <div class="cfw-m-hand-toggle" style="margin-bottom: 8px;">
        <button class="cfw-m-hand-btn" :class="{ active: store.mode === 'technical_issue' }" @click="store.mode = 'technical_issue'; persist()">Issue</button>
        <button class="cfw-m-hand-btn" :class="{ active: store.mode === 'personal_todo' }" @click="store.mode = 'personal_todo'; persist()">Todo</button>
        <button class="cfw-m-hand-btn" :class="{ active: store.mode === 'feature_request' }" @click="store.mode = 'feature_request'; persist()">Feature</button>
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
          :class="{ active: store.panelSnap === 'middle' }"
          type="button"
          @click="store.panelSnap = 'middle'; persist()"
        >Middle</button>
        <button
          class="cfw-m-hand-btn"
          :class="{ active: store.panelSnap === 'bottom' }"
          type="button"
          @click="store.panelSnap = 'bottom'; persist()"
        >Bottom &#9660;</button>
      </div>
      <p class="cfw-m-settings-note">Or swipe the panel handle up or down.</p>
      <h3>Swipe Actions</h3>
      <div class="cfw-m-swipe-settings">
        <div class="cfw-m-swipe-row">
          <label>Short Right (&rarr;)</label>
          <select v-model="store.swipeMapping.shortRight" class="cfw-select" @change="persist()">
            <option v-for="opt in swipeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
        <div class="cfw-m-swipe-row">
          <label>Long Right (&rarr;&rarr;)</label>
          <select v-model="store.swipeMapping.longRight" class="cfw-select" @change="persist()">
            <option v-for="opt in swipeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
        <div class="cfw-m-swipe-row">
          <label>Short Left (&larr;)</label>
          <select v-model="store.swipeMapping.shortLeft" class="cfw-select" @change="persist()">
            <option v-for="opt in swipeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
        <div class="cfw-m-swipe-row">
          <label>Long Left (&larr;&larr;)</label>
          <select v-model="store.swipeMapping.longLeft" class="cfw-select" @change="persist()">
            <option v-for="opt in swipeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
      </div>

      <div class="cfw-m-gesture-ref">
        <h4>Gesture Reference</h4>
        <div class="cfw-m-gesture-row"><span>Short Swipe:</span> <span>Gentle flick (acts immediately)</span></div>
        <div class="cfw-m-gesture-row"><span>Long Swipe:</span> <span>Pull across screen to edge</span></div>
      </div>
    </div>
    </div><!-- /cfw-tab-body -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'
import { useAdminToken } from '../composables/useAdminToken'
import { usePanelSwipe } from '../composables/usePanelSwipe'

const emit = defineEmits<{
  handedness: [side: 'left' | 'right']
  'token-changed': []
}>()

const store = useWidgetStore()
const { persist } = useWidgetState()
const { readToken, writeToken, promptToken } = useAdminToken()
const { onPanelTouchStart, onPanelTouchEnd } = usePanelSwipe()

const tokenStatus = computed(() => {
  const tok = store.adminToken
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

const swipeOptions = [
  { value: 'done_archive', label: 'Done / Archive' },
  { value: 'pin_unpin', label: 'Pin / Unpin' },
  { value: 'comment', label: 'Comment' },
  { value: 'create_linked_item', label: 'Create linked item' },
  { value: 'mark_viewed', label: 'Mark viewed' },
  { value: 'none', label: 'None' }
]
</script>
