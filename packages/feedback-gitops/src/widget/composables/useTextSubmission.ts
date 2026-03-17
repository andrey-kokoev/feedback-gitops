import { ref } from 'vue'
import { useWidgetStore } from '../stores/widget'
import { useWidgetState } from './useWidgetState'
import { useApi } from './useApi'

const UNDO_SECONDS = 10

export function useTextSubmission() {
  const store = useWidgetStore()
  const { persist } = useWidgetState()
  const { submitText, cancelSubmission, loadIssues } = useApi()

  const undoSecondsLeft = ref(0)
  let undoTimer: ReturnType<typeof setInterval> | null = null

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

  async function submit(execute: boolean) {
    if (store.creating) return
    const description = store.draftDescription.trim()
    if (!description) {
      store.createError = 'Please provide a description.'
      return
    }
    
    // Derive title from description since Compose is single-field
    let title = store.draftTitle.trim()
    if (!title) {
      const firstLine = description.split('\n')[0]
      title = firstLine.length > 50 ? firstLine.slice(0, 50) + '...' : firstLine
    }

    store.createError = ''
    store.creating = true
    try {
      const data = await submitText(title, description, execute)
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

  async function undo() {
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

  function reset() {
    store.textCreateSuccess = false
    stopUndoCountdown()
  }

  return {
    undoSecondsLeft,
    submit,
    undo,
    reset,
    stopUndoCountdown,
  }
}
