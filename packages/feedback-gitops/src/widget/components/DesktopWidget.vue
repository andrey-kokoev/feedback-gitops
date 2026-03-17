<template>
  <!-- Desktop launcher button -->
  <div id="cfw-feedback-widget">
    <button
      id="cfw-feedback-launcher"
      type="button"
      :class="{ 'needs-token': !hasToken }"
      aria-label="Open change request panel"
      @click="openPanel"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z" />
      </svg>
    </button>
  </div>

  <!-- Overlay -->
  <div
    id="cfw-feedback-overlay"
    :class="{ active: store.panelOpen }"
    @click="closePanel"
  ></div>

  <!-- Panel -->
  <aside id="cfw-feedback-panel" :class="{ active: store.panelOpen }">
    <div id="cfw-feedback-header">
      <div id="cfw-feedback-title">Change Requests</div>
      <div id="cfw-feedback-header-actions">
        <button
          id="cfw-token-menu-btn"
          type="button"
          aria-label="Open token actions"
          @click.stop="tokenMenuOpen = !tokenMenuOpen"
        >...</button>
        <div id="cfw-token-menu" :class="{ active: tokenMenuOpen }">
          <button id="cfw-token-update" type="button" @click="onUpdateToken">Update token</button>
          <button id="cfw-token-clear" type="button" :disabled="!hasToken" @click="onClearToken">Clear token</button>
        </div>
        <button id="cfw-panel-close" type="button" aria-label="Close panel" @click="closePanel">&#x2715;</button>
      </div>
    </div>

    <div id="cfw-tabs">
      <button
        id="cfw-tab-new"
        type="button"
        :class="{ active: store.activeTab === 'new' }"
        @click="store.activeTab = 'new'; persist()"
      >New request</button>
      <button
        id="cfw-tab-requests"
        type="button"
        :class="{ active: store.activeTab === 'requests' }"
        @click="store.activeTab = 'requests'; loadIssues(false)"
      >Requests</button>
    </div>

    <div id="cfw-panel-body">
      <DesktopNewTab
        v-if="store.activeTab === 'new'"
        @toggle-recording="onToggleRecording"
        @voice-reset="onVoiceReset"
        @voice-send="onVoiceSend"
        @create="onCreate"
      />
      <DesktopIssuesTab
        v-if="store.activeTab === 'requests'"
        @refresh="loadIssues(true)"
        @action="onAction"
      />
    </div>
  </aside>

  <!-- Toast -->
  <Toast />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from '../composables/useWidgetState'
import { useAdminToken } from '../composables/useAdminToken'
import { useApi } from '../composables/useApi'
import { useAudioRecorder } from '../composables/useAudioRecorder'
import DesktopNewTab from './DesktopNewTab.vue'
import DesktopIssuesTab from './DesktopIssuesTab.vue'
import Toast from './Toast.vue'

const store = useWidgetStore()
const { persist } = useWidgetState()
const { readToken, writeToken, promptToken, requireToken } = useAdminToken()
const { loadIssues: apiLoadIssues, submitText, submitVoice, executeAction, mapActionError, getIssueUrlFromCreateResponse } = useApi()

const tokenMenuOpen = ref(false)
const hasToken = computed(() => !!readToken())

const recorder = useAudioRecorder()
let voiceTimerHandle: ReturnType<typeof setInterval> | null = null

function closeTokenMenu() {
  tokenMenuOpen.value = false
}

function openPanel() {
  const token = requireToken()
  if (!token) return
  store.panelOpen = true
  store.activeTab = (store.issuesLoaded && store.issues.length > 0) ? 'requests' : (store.activeTab === 'requests' || store.activeTab === 'new' ? store.activeTab : 'new')
  loadIssues(false)
  persist()
}

function closePanel() {
  store.panelOpen = false
  closeTokenMenu()
  persist()
}

function onUpdateToken() {
  closeTokenMenu()
  promptToken()
  loadIssues(true)
}

function onClearToken() {
  closeTokenMenu()
  if (!window.confirm('Clear saved admin token?')) return
  writeToken('')
  closePanel()
}

async function loadIssues(force: boolean) {
  if (!force && store.issuesLoaded) return
  await apiLoadIssues(force)
  if (!force && store.issues.length > 0) store.activeTab = 'requests'
  else if (!force && !store.issuesLoaded) store.activeTab = 'new'
  persist()
}

function stopVoiceTimer() {
  if (voiceTimerHandle !== null) {
    clearInterval(voiceTimerHandle)
    voiceTimerHandle = null
  }
}

function startVoiceTimer() {
  stopVoiceTimer()
  voiceTimerHandle = setInterval(() => {
    store.voiceDraftDurationMs += 1000
    persist()
  }, 1000)
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
  if (!blob || blob.size < 1) {
    store.createError = 'No recorded audio available yet.'
    return
  }
  store.createError = ''
  store.creating = true
  try {
    await submitVoice(blob, recorder.getMimeType(), store.voiceDraftDurationMs)
    await onVoiceReset()
    store.toastText = 'Voice request queued.'
    store.toastLink = ''
    await loadIssues(true)
    store.activeTab = 'requests'
    persist()
  } catch (err) {
    store.createError = err instanceof Error ? err.message : 'Failed to submit voice request'
  } finally {
    store.creating = false
  }
}

async function onCreate(execute: boolean) {
  if (store.creating) return
  const title = store.draftTitle.trim()
  const description = store.draftDescription.trim()
  if (!title) { store.createError = 'Please provide title.'; return }

  store.createError = ''
  store.creating = true
  try {
    const data = await submitText(title, description, execute)
    store.lastSubmissionId = typeof data?.submissionId === 'string' ? data.submissionId : null
    const issueUrl = getIssueUrlFromCreateResponse(data)
    store.lastTextTitle = title
    store.lastTextDescription = description
    store.draftTitle = ''
    store.draftDescription = ''
    store.toastText = execute ? 'Request queued for execution.' : 'Request queued.'
    store.toastLink = issueUrl
    await loadIssues(true)
    store.activeTab = 'requests'
    persist()
  } catch (err) {
    store.createError = err instanceof Error ? err.message : 'Failed to create request'
  } finally {
    store.creating = false
  }
}

async function onAction(issueNumber: number, target: 'issue' | 'pull_request', actionId: string) {
  store.executeError = ''
  store.executingIssue = issueNumber
  try {
    const data = await executeAction(issueNumber, actionId, target)
    const prUrl = data?.pullRequest?.url ?? ''
    let toastText = 'Action applied: ' + actionId.replaceAll('_', ' ')
    if (target === 'pull_request' && actionId === 'merge') {
      toastText = 'Merge requested. It will merge automatically when GitHub rules/checks are satisfied.'
    } else if (target === 'pull_request' && actionId === 'cancel_merge') {
      toastText = 'Merge request canceled.'
    } else if (target === 'issue' && actionId === 'hold') {
      toastText = 'Auto-processing paused. Issue switched to manual policy.'
    }
    store.toastText = toastText
    store.toastLink = prUrl
    await loadIssues(true)
  } catch (err) {
    store.executeError = mapActionError(err instanceof Error ? err.message : '')
  } finally {
    store.executingIssue = null
  }
}

// Close token menu on outside click
function onDocClick(e: Event) {
  if (!tokenMenuOpen.value) return
  const target = e.target as HTMLElement
  // Check within shadow root
  const menu = document.querySelector('#cfw-token-menu')
  const btn = document.querySelector('#cfw-token-menu-btn')
  if (menu?.contains(target) || btn?.contains(target)) return
  closeTokenMenu()
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  if (store.panelOpen && readToken()) {
    store.panelOpen = false // re-open to re-hydrate
    openPanel()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  stopVoiceTimer()
})
</script>
