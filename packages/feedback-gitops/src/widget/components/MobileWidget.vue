<template>
  <!-- Mobile launcher button -->
  <button
    id="cfw-mobile-launcher"
    type="button"
    aria-label="Open feedback widget"
    :class="{ 'panel-left': store.handedness === 'left' }"
    v-show="!launcher.isOpen.value"
    @touchstart.passive="launcher.onTouchStart"
    @touchend="launcher.onTouchEnd"
    @click="onLauncherClick()"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"/>
    </svg>
  </button>

  <!-- Swipe hint -->
  <div
    id="cfw-swipe-hint"
    :class="{ visible: launcher.swipeHintVisible.value }"
    :style="launcher.swipeHintStyle.value"
  >&#8592; swipe &#8594;</div>

  <!-- Desktop backdrop -->
  <div id="cfw-desktop-backdrop" v-show="launcher.isOpen.value" @click="closeWidget(false)" />

  <!-- Mobile full-screen overlay -->
  <div
    id="cfw-mobile"
    v-show="launcher.isOpen.value"
    :class="{ 'panel-left': store.handedness === 'left' }"
    :style="panelStyle"
    :data-font-size="store.fontSize"
    :data-density="store.density"
    :data-theme="store.theme"
  >
    <div id="cfw-mobile-body" :class="{ 'snap-bottom': store.panelSnap === 'bottom', 'snap-top': store.panelSnap === 'top', 'snap-middle': store.panelSnap === 'middle' }">
      <!-- Text tab -->
      <div id="cfw-mv-text" :class="['cfw-mv', { active: store.mobileTab === 'text' }]">
        <div v-if="!composeSuccessActive" class="cfw-panel-handle" @touchstart.passive="onPanelTouchStart" @touchend="onPanelTouchEnd"><div class="cfw-panel-handle-bar"></div></div>
        <div class="cfw-tab-body">
          <div v-if="!composeSuccessActive" class="cfw-compose-mode-toggle">
            <button
              type="button"
              class="cfw-compose-mode-btn"
              :class="{ active: store.composeMode === 'text' }"
              @click="setComposeMode('text')"
            >Text</button>
            <button
              type="button"
              class="cfw-compose-mode-btn"
              :class="{ active: store.composeMode === 'voice' }"
              @click="setComposeMode('voice')"
            >Voice</button>
          </div>

          <div
            v-if="composeSuccessActive"
            id="cfw-mv-compose-success"
            class="cfw-m-success"
            @click="dismissComposeSuccess()"
          >
            <div class="cfw-m-success-ring">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div class="cfw-m-success-hint">{{ composeSuccessText }}</div>
            <button
              v-if="composeUndoSeconds > 0 && store.lastSubmissionId"
              id="cfw-mv-compose-undo"
              class="cfw-m-undo-btn"
              @click.stop="undoComposeSuccess()"
            >Undo ({{ composeUndoSeconds }})</button>
          </div>

          <template v-else-if="store.composeMode === 'text'">
            <div id="cfw-mv-text-form" class="cfw-mf">
              <TextForm
                ref="textFormRef"
                :mobile="true"
                title-id="cfw-m-title"
                desc-id="cfw-m-description"
                @create="text.submit"
              />
            </div>
          </template>

          <template v-else>
            <VoiceComposer
              :mobile="true"
              @toggle-recording="voice.toggleRecording"
              @reset="voice.reset"
              @send="voice.submit"
            />
          </template>
        </div>
        <!-- Bottom dragger for middle position (hidden when showing success) -->
        <div v-if="store.panelSnap === 'middle' && !composeSuccessActive" class="cfw-panel-handle cfw-panel-handle-bottom" @touchstart.passive="onPanelTouchStart" @touchend="onPanelTouchEnd"><div class="cfw-panel-handle-bar"></div></div>
      </div>


      <!-- Issues list tab -->
      <IssuesList
        @refresh="loadIssues(true)"
        @open-issue="onOpenIssue"
        @open-filter="onOpenFilter"
        @swipe-action="onSwipeAction"
      />

      <!-- Settings tab -->
      <SettingsPane
        @handedness="launcher.applyHandedness"
        @token-changed="onTokenChanged"
      />
    </div>

    <!-- Bottom navigation -->
    <nav id="cfw-mobile-nav">
      <button
        v-if="store.handedness === 'left'"
        class="cfw-nav-btn"
        type="button"
        @click="closeWidget(false)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        <span>Close</span>
      </button>

      <button
        id="cfw-nav-text"
        class="cfw-nav-btn"
        type="button"
        :class="{ active: store.mobileTab === 'text' }"
        @click="setMobileTab('text')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"/>
        </svg>
        <span>Compose</span>
      </button>


      <button
        id="cfw-nav-list"
        class="cfw-nav-btn"
        type="button"
        :class="{ active: store.mobileTab === 'list' }"
        @click="setMobileTab('list')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <span>Activity</span>
      </button>

      <button
        id="cfw-nav-settings"
        class="cfw-nav-btn"
        type="button"
        :class="{ active: store.mobileTab === 'settings' }"
        @click="setMobileTab('settings')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span>Settings</span>
      </button>

      <button
        v-if="store.handedness !== 'left'"
        class="cfw-nav-btn"
        type="button"
        @click="closeWidget(false)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        <span>Close</span>
      </button>
    </nav>
  </div>

  <!-- Issue detail / filter bottom sheet -->
  <IssueSheet
    :open="sheet.sheetOpen.value"
    :issue="sheet.sheetIssue.value"
    :filter-mode="sheet.filterMode.value"
    :edit-mode="sheet.editMode.value"
    @action-done="onActionDone"
    @close="onLayerClose(2)"
    @cancel-edit="sheet.editMode.value = false"
    @filter-changed="loadIssues(true)"
    @compose-sheet="openComposeSheet"
    @edit-issue="onEditIssue"
  />

  <ComposeSheet
    :open="composeOpen"
    :mode="composeMode"
    :issue="composeIssue"
    @close="onLayerClose(3)"
    @action-done="onActionDone"
  />
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onUnmounted } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'
import { usePanelSwipe } from '../composables/usePanelSwipe'
import { useApi } from '../composables/useApi'
import { useTextSubmission } from '../composables/useTextSubmission'
import { useVoiceSubmission } from '../composables/useVoiceSubmission'
import { useIssueSheet } from '../composables/useIssueSheet'
import { useWidgetLauncher } from '../composables/useWidgetLauncher'
import TextForm from './TextForm.vue'
import IssuesList from './IssuesList.vue'
import IssueSheet from './IssueSheet.vue'
import SettingsPane from './SettingsPane.vue'
import ComposeSheet from './ComposeSheet.vue'
import VoiceComposer from './VoiceComposer.vue'
import type { SwipeActionType, IssueListItem } from '../types'

const store = useWidgetStore()
const { persist } = useWidgetState()
const { onPanelTouchStart, onPanelTouchEnd } = usePanelSwipe()
const { loadIssues, authorize, executeAction } = useApi()

// Feature composables
const text = useTextSubmission()
const voice = useVoiceSubmission()
const sheet = useIssueSheet()
const launcher = useWidgetLauncher()

const textFormRef = ref<InstanceType<typeof TextForm> | null>(null)

const panelStyle = computed(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
}))
const composeSuccessActive = computed(() => store.textCreateSuccess || store.voiceCreateSuccess)
const composeSuccessText = computed(() => store.voiceCreateSuccess ? 'Voice request submitted' : 'Tap to submit another')
const composeUndoSeconds = computed(() => store.voiceCreateSuccess ? voice.undoSecondsLeft.value : text.undoSecondsLeft.value)

function setMobileTab(tab: 'text' | 'list' | 'settings') {
  store.mobileTab = tab
  if (tab === 'list') {
    loadIssues(false)
  }
  if (tab === 'text') {
    nextTick(() => textFormRef.value?.focusTitle())
  }
  persist()
}

function setComposeMode(mode: 'text' | 'voice') {
  store.composeMode = mode
  store.createError = ''
  if (mode === 'text') {
    nextTick(() => textFormRef.value?.focusTitle())
  }
  persist()
}

function dismissComposeSuccess() {
  if (store.voiceCreateSuccess) voice.dismissSuccess()
  else text.reset()
}

function undoComposeSuccess() {
  if (store.voiceCreateSuccess) {
    void voice.undo()
  } else {
    void text.undo()
  }
}

const composeOpen = ref(false)
const composeMode = ref<'comment' | 'linked_item'>('comment')
const composeIssue = ref<IssueListItem | null>(null)

function openComposeSheet(mode: 'comment' | 'linked_item', issue: IssueListItem) {
  composeMode.value = mode
  composeIssue.value = issue
  composeOpen.value = true
  pushWidgetDepth(3)
}

async function onSwipeAction(action: SwipeActionType, issue: IssueListItem) {
  if (action === 'none') return
  
  if (action === 'mark_viewed') {
    store.itemViews[issue.number] = Date.now()
    persist()
    return
  }
  
  if (action === 'comment' || action === 'create_linked_item') {
    openComposeSheet(action as any, issue)
    return
  }
  
  try {
    await executeAction(issue.number, action, 'issue')
    await loadIssues(true)
  } catch (err) {
    console.warn('Action failed', err)
  }
}

function onEditIssue(issue: IssueListItem) {
  sheet.openIssue(issue, true)
  pushWidgetDepth(2)
}

function onOpenIssue(issue: IssueListItem) {
  sheet.openIssue(issue)
  pushWidgetDepth(2)
}

function onOpenFilter() {
  sheet.openFilter()
  pushWidgetDepth(2)
}

async function onActionDone() {
  await loadIssues(true)
}

function onLauncherClick() {
  if (!authorize()) return
  launcher.open()
  pushWidgetDepth(1)
}

function onTokenChanged() {
  loadIssues(true)
}

function closeWidget(fromPopstate = false) {
  composeOpen.value = false
  sheet.close()
  launcher.close()
  
  if (!fromPopstate) {
    const depth = window.history.state?.widgetDepth || 0
    if (depth > 0) {
      history.go(-depth)
    }
  }
}

function pushWidgetDepth(targetDepth: number) {
  const currentDepth = window.history.state?.widgetDepth || 0
  if (currentDepth < targetDepth) {
    history.pushState({ widgetDepth: targetDepth }, '')
  }
}

function onLayerClose(layerDepth: number) {
  if (layerDepth === 3) composeOpen.value = false
  else if (layerDepth === 2) sheet.close()
  else if (layerDepth === 1) closeWidget(false)

  const depth = window.history.state?.widgetDepth || 0
  if (depth >= layerDepth) {
    history.go(-(depth - layerDepth + 1))
  }
}

function initPopstateAction() {
  window.addEventListener('popstate', handlePopstate)
}

function handlePopstate(e: PopStateEvent) {
  const currentDepth = window.history.state?.widgetDepth || 0
  
  if (currentDepth < 3 && composeOpen.value) {
    composeOpen.value = false
  }
  if (currentDepth < 2 && sheet.sheetOpen.value) {
    sheet.close()
  }
  if (currentDepth < 1 && launcher.isOpen.value) {
    launcher.close()
  }
}

// Cleanup timers and listeners on unmount
onUnmounted(() => {
  text.stopUndoCountdown()
  voice.stopUndoCountdown()
  voice.stopVoiceTimer()
  window.removeEventListener('popstate', handlePopstate)
})

initPopstateAction()
function openItem(id: string | number) {
  if (!authorize()) return
  const num = typeof id === 'string' ? parseInt(id, 10) : id
  if (!launcher.isOpen.value) {
    launcher.open()
    pushWidgetDepth(1)
  }
  setMobileTab('list')
  const found = store.issues.find(i => i.number === num)
  if (found) {
    onOpenIssue(found)
  } else {
    loadIssues(true).then(() => {
      const issue = store.issues.find(i => i.number === num)
      if (issue) onOpenIssue(issue)
    })
  }
}

defineExpose({ openItem })
</script>
