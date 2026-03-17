<template>
  <!-- Mobile launcher button -->
  <button
    id="cfw-mobile-launcher"
    type="button"
    aria-label="Open feedback widget"
    :style="launcherStyle"
    v-show="!mobileOpen"
    @touchstart.passive="onLauncherTouchStart"
    @touchend="onLauncherTouchEnd"
    @click="onLauncherClick"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"/>
    </svg>
  </button>

  <!-- Swipe hint -->
  <div
    id="cfw-swipe-hint"
    :class="{ visible: swipeHintVisible }"
    :style="swipeHintStyle"
  >&#8592; swipe &#8594;</div>

  <!-- Desktop backdrop -->
  <div id="cfw-desktop-backdrop" v-show="mobileOpen" @click="store.mobileOpen = false" />

  <!-- Mobile full-screen overlay -->
  <div id="cfw-mobile" v-show="mobileOpen" :style="panelStyle">
    <div id="cfw-mobile-body">
      <!-- Text tab -->
      <div id="cfw-mv-text" :class="['cfw-mv', { active: store.mobileTab === 'text' }]">
        <template v-if="!store.textCreateSuccess">
          <div id="cfw-mv-text-form" class="cfw-mf">
            <TextForm
              :mobile="true"
              title-id="cfw-m-title"
              desc-id="cfw-m-description"
              @create="onTextCreate"
            />
          </div>
        </template>
        <div
          v-else
          id="cfw-mv-text-success"
          class="cfw-m-success"
          @click="store.textCreateSuccess = false; stopUndoCountdown()"
        >
          <div class="cfw-m-success-ring">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div class="cfw-m-success-hint">Tap to submit another</div>
          <button
            v-if="undoSecondsLeft > 0 && store.lastSubmissionId"
            id="cfw-mv-text-undo"
            class="cfw-m-undo-btn"
            @click.stop="onUndoText"
          >Undo ({{ undoSecondsLeft }})</button>
        </div>
      </div>

      <!-- Voice tab -->
      <div id="cfw-mv-voice" :class="['cfw-mv', { active: store.mobileTab === 'voice' }]">
        <template v-if="!store.voiceCreateSuccess">
          <div id="cfw-mv-voice-form" class="cfw-m-voice">
            <VoiceComposer
              :mobile="true"
              @toggle-recording="onToggleRecording"
              @reset="onVoiceReset"
              @send="onVoiceSend"
            />
          </div>
        </template>
        <div
          v-else
          id="cfw-mv-voice-success"
          class="cfw-m-success"
          @click="store.voiceCreateSuccess = false; stopUndoCountdown()"
        >
          <div class="cfw-m-success-ring">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div class="cfw-m-success-hint">Tap to record another</div>
          <button
            v-if="undoSecondsLeft > 0 && store.lastSubmissionId"
            id="cfw-mv-voice-undo"
            class="cfw-m-undo-btn"
            @click.stop="onUndoVoice"
          >Undo ({{ undoSecondsLeft }})</button>
        </div>
      </div>

      <!-- Issues list tab -->
      <IssuesList
        @refresh="loadIssues(true)"
        @open-issue="openIssueSheet"
        @open-filter="openFilterSheet"
      />

      <!-- Settings tab -->
      <SettingsPane
        @handedness="applyHandedness"
        @token-changed="onTokenChanged"
      />
    </div>

    <!-- Bottom navigation -->
    <nav id="cfw-mobile-nav">
      <button
        v-if="store.handedness === 'left'"
        class="cfw-nav-btn"
        type="button"
        @click="mobileOpen = false"
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
        <span>Text</span>
      </button>

      <button
        id="cfw-nav-voice"
        class="cfw-nav-btn"
        type="button"
        :class="{ active: store.mobileTab === 'voice' }"
        @click="setMobileTab('voice')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 10a7 7 0 01-14 0M12 19v4M8 23h8"/>
        </svg>
        <span>Voice</span>
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
        <span>Requests</span>
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
        @click="mobileOpen = false"
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
    :open="sheetOpen"
    :issue="sheetIssue"
    :filter-mode="filterMode"
    @close="closeSheet"
    @action-done="onActionDone"
    @filter-changed="loadIssues(true)"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'
import { useAdminToken } from '../composables/useAdminToken'
import { useApi } from '../composables/useApi'
import { useAudioRecorder } from '../composables/useAudioRecorder'
import TextForm from './TextForm.vue'
import VoiceComposer from './VoiceComposer.vue'
import IssuesList from './IssuesList.vue'
import IssueSheet from './IssueSheet.vue'
import SettingsPane from './SettingsPane.vue'
import type { IssueListItem } from '../types'

const store = useWidgetStore()
const { persist } = useWidgetState()
const { readToken, requireToken } = useAdminToken()
const { loadIssues: apiLoadIssues, submitText, submitVoice, cancelSubmission, mapActionError, getIssueUrlFromCreateResponse } = useApi()

const mobileOpen = ref(false)
const swipeHintVisible = ref(false)

// Bottom sheet state
const sheetOpen = ref(false)
const sheetIssue = ref<IssueListItem | null>(null)
const filterMode = ref(false)

// Undo
const undoSecondsLeft = ref(0)
let undoTimer: ReturnType<typeof setInterval> | null = null

// Voice recorder
const recorder = useAudioRecorder()
let voiceTimerHandle: ReturnType<typeof setInterval> | null = null

// Launcher swipe
let swipeStartX = 0

const launcherStyle = computed(() => {
  const isLeft = store.handedness === 'left'
  return { left: isLeft ? '10px' : '', right: isLeft ? '' : '10px', bottom: '20px' }
})

const panelStyle = computed(() => {
  const isLeft = store.handedness === 'left'
  return {
    display: 'flex',
    flexDirection: 'column' as const,
    // desktop side: panel hugs the chosen edge (overrides inset set in CSS)
    left: isLeft ? '0' : 'auto',
    right: isLeft ? 'auto' : '0',
    borderLeft: isLeft ? 'none' : undefined,
    borderRight: isLeft ? undefined : 'none',
  }
})

const swipeHintStyle = computed(() => {
  if (store.handedness === 'left') {
    return { left: '10px', right: '' }
  }
  return { right: '10px', left: '' }
})

function setMobileTab(tab: 'text' | 'voice' | 'list' | 'settings') {
  store.mobileTab = tab
  store.activeTab = tab
  if (tab === 'list') {
    loadIssues(false)
  }
  persist()
}

function applyHandedness(side: 'left' | 'right') {
  store.handedness = side
  persist()
}

function onLauncherTouchStart(e: TouchEvent) {
  swipeStartX = e.touches[0].clientX
}

function onLauncherTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - swipeStartX
  if (Math.abs(dx) >= 40) {
    applyHandedness(dx < 0 ? 'left' : 'right')
    e.preventDefault()
    return
  }
}

function onLauncherClick() {
  mobileOpen.value = true
  if (!readToken()) {
    setMobileTab('settings')
  }
}

// Issues loading
async function loadIssues(force: boolean) {
  await apiLoadIssues(force)
  persist()
}

// Text submission
async function onTextCreate(execute: boolean) {
  if (store.creating) return
  const title = store.draftTitle.trim()
  if (!title) { store.createError = 'Please provide title.'; return }
  store.createError = ''
  store.creating = true
  try {
    const data = await submitText(title, store.draftDescription.trim(), execute)
    store.lastSubmissionId = typeof data?.submissionId === 'string' ? data.submissionId : null
    store.lastTextTitle = title
    store.lastTextDescription = store.draftDescription
    store.draftTitle = ''
    store.draftDescription = ''
    store.textCreateSuccess = true
    startUndoCountdown()
    void loadIssues(true)
    persist()
  } catch (err) {
    store.createError = err instanceof Error ? err.message : 'Failed to create request'
  } finally {
    store.creating = false
  }
}

// Voice
function stopVoiceTimer() {
  if (voiceTimerHandle !== null) { clearInterval(voiceTimerHandle); voiceTimerHandle = null }
}
function startVoiceTimer() {
  stopVoiceTimer()
  voiceTimerHandle = setInterval(() => { store.voiceDraftDurationMs += 1000; persist() }, 1000)
}

async function onToggleRecording() {
  store.createError = ''
  try {
    if (store.voiceDraftState === 'recording') {
      await recorder.pause()
      store.voiceDraftState = 'paused'
      store.voiceDraftReady = recorder.hasContent.value
      stopVoiceTimer()
    } else {
      await recorder.start()
      store.voiceDraftState = 'recording'
      store.voiceDraftReady = recorder.hasContent.value
      startVoiceTimer()
    }
    persist()
  } catch (err) {
    store.createError = err instanceof Error ? err.message : 'Failed to access microphone'
  }
}

async function onVoiceReset() {
  stopVoiceTimer()
  await recorder.reset()
  store.voiceDraftState = 'idle'
  store.voiceDraftReady = false
  store.voiceDraftDurationMs = 0
  store.createError = ''
  persist()
}

async function onVoiceSend() {
  if (!store.voiceDraftReady) return
  const blob = await recorder.exportRecording()
  if (!blob || blob.size < 1) { store.createError = 'No recorded audio available yet.'; return }
  store.createError = ''
  store.creating = true
  try {
    const data = await submitVoice(blob, recorder.getMimeType(), store.voiceDraftDurationMs)
    store.lastSubmissionId = typeof data?.submissionId === 'string' ? data.submissionId : null
    await onVoiceReset()
    store.voiceCreateSuccess = true
    startUndoCountdown()
    void loadIssues(true)
    persist()
  } catch (err) {
    store.createError = err instanceof Error ? err.message : 'Failed to submit voice request'
  } finally {
    store.creating = false
  }
}

// Undo countdown
function stopUndoCountdown() {
  if (undoTimer !== null) { clearInterval(undoTimer); undoTimer = null }
  undoSecondsLeft.value = 0
}

function startUndoCountdown() {
  stopUndoCountdown()
  if (!store.lastSubmissionId) return
  undoSecondsLeft.value = 10
  undoTimer = setInterval(() => {
    undoSecondsLeft.value -= 1
    if (undoSecondsLeft.value <= 0) stopUndoCountdown()
  }, 1000)
}

async function onUndoText() {
  if (!store.lastSubmissionId) return
  const id = store.lastSubmissionId
  await cancelSubmission(id)
  store.lastSubmissionId = null
  store.textCreateSuccess = false
  store.draftTitle = store.lastTextTitle
  store.draftDescription = store.lastTextDescription
  stopUndoCountdown()
  persist()
}

async function onUndoVoice() {
  if (!store.lastSubmissionId) return
  const id = store.lastSubmissionId
  await cancelSubmission(id)
  store.lastSubmissionId = null
  store.voiceCreateSuccess = false
  stopUndoCountdown()
  persist()
}

// Issue sheet
function openIssueSheet(issue: IssueListItem) {
  sheetIssue.value = issue
  filterMode.value = false
  sheetOpen.value = true
}

function openFilterSheet() {
  sheetIssue.value = null
  filterMode.value = true
  sheetOpen.value = true
}

function closeSheet() {
  sheetOpen.value = false
  setTimeout(() => {
    sheetIssue.value = null
    filterMode.value = false
  }, 260)
}

async function onActionDone() {
  await loadIssues(true)
}

// Token changed
function onTokenChanged() {
  loadIssues(true)
}

// Show swipe hint once
const HINT_KEY = computed(() => store.config.storageKey + ':swipe-hint-shown')

onMounted(() => {
  try {
    if (!localStorage.getItem(HINT_KEY.value)) {
      localStorage.setItem(HINT_KEY.value, '1')
      setTimeout(() => {
        swipeHintVisible.value = true
        setTimeout(() => { swipeHintVisible.value = false }, 2500)
      }, 900)
    }
  } catch { /* */ }
})

onUnmounted(() => {
  stopVoiceTimer()
  stopUndoCountdown()
})
</script>
