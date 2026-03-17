import { ref } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from './useWidgetState'
import { useApi } from './useApi'
import { useAudioRecorder } from './useAudioRecorder'

const UNDO_SECONDS = 10

export function useVoiceSubmission() {
  const store = useWidgetStore()
  const { persist } = useWidgetState()
  const { submitVoice, cancelSubmission, loadIssues } = useApi()
  const recorder = useAudioRecorder()

  const undoSecondsLeft = ref(0)
  let undoTimer: ReturnType<typeof setInterval> | null = null
  let voiceTimerHandle: ReturnType<typeof setInterval> | null = null

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

  function stopUndoCountdown() {
    if (undoTimer !== null) {
      clearInterval(undoTimer)
      undoTimer = null
    }
    undoSecondsLeft.value = 0
  }

  function startUndoCountdown() {
    stopUndoCountdown()
    if (!store.lastSubmissionId) return
    undoSecondsLeft.value = UNDO_SECONDS
    undoTimer = setInterval(() => {
      undoSecondsLeft.value -= 1
      if (undoSecondsLeft.value <= 0) stopUndoCountdown()
    }, 1000)
  }

  async function toggleRecording() {
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

  async function reset() {
    stopVoiceTimer()
    await recorder.reset()
    store.voiceDraftState = 'idle'
    store.voiceDraftReady = false
    store.voiceDraftDurationMs = 0
    store.createError = ''
    persist()
  }

  async function submit() {
    if (!store.voiceDraftReady) return
    const blob = await recorder.exportRecording()
    if (!blob || blob.size < 1) {
      store.createError = 'No recorded audio available yet.'
      return
    }
    store.createError = ''
    store.creating = true
    try {
      const data = await submitVoice(blob, recorder.getMimeType(), store.voiceDraftDurationMs)
      store.lastSubmissionId = typeof data?.submissionId === 'string' ? data.submissionId : null
      await reset()
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

  async function undo() {
    if (!store.lastSubmissionId) return
    const id = store.lastSubmissionId
    await cancelSubmission(id)
    store.lastSubmissionId = null
    store.voiceCreateSuccess = false
    stopUndoCountdown()
    persist()
  }

  function dismissSuccess() {
    store.voiceCreateSuccess = false
    stopUndoCountdown()
  }

  return {
    undoSecondsLeft,
    toggleRecording,
    reset,
    submit,
    undo,
    dismissSuccess,
    stopVoiceTimer,
    stopUndoCountdown,
  }
}
