import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IssueListItem, CaptureMode, MobileTab, ListView, ListSort, VoiceDraftState, WidgetConfig } from '../types'

export const useWidgetStore = defineStore('widget', () => {
  // Config (set on mount)
  const config = ref<WidgetConfig>({
    endpoint: '',
    issuesEndpoint: '',
    actionEndpoint: '',
    cancelEndpoint: '',
    repo: '',
    labels: '',
    storageKey: 'thoughts',
  })

  // UI state
  const panelOpen = ref(false)
  const activeTab = ref<MobileTab>('text')
  const mobileTab = ref<MobileTab>('text')
  const captureMode = ref<CaptureMode>('text')
  const handedness = ref<'left' | 'right'>('right')
  const panelSnap = ref<'top' | 'bottom'>('bottom')
  const adminToken = ref('')
  const draftSettingsOpen = ref(false)

  // Draft
  const draftTitle = ref('')
  const draftDescription = ref('')
  const draftMergePolicy = ref<'manual' | 'auto_unblocked'>('manual')

  // Voice
  const voiceDraftState = ref<VoiceDraftState>('idle')
  const voiceDraftReady = ref(false)
  const voiceDraftDurationMs = ref(0)

  // Issues list
  const issues = ref<IssueListItem[]>([])
  const issuesLoaded = ref(false)
  const loadingIssues = ref(false)
  const listView = ref<ListView>('active')
  const listSort = ref<ListSort>('updated_desc')
  const listQuery = ref('')
  const listStatusFilter = ref<string[]>([])

  // Request state
  const creating = ref(false)
  const executingIssue = ref<number | null>(null)

  // Errors
  const createError = ref('')
  const listError = ref('')
  const executeError = ref('')

  // Toast
  const toastText = ref('')
  const toastLink = ref('')

  // Success states
  const textCreateSuccess = ref(false)
  const voiceCreateSuccess = ref(false)
  const lastSubmissionId = ref<string | null>(null)
  const lastTextTitle = ref('')
  const lastTextDescription = ref('')

  // Mobile issue sheet
  const mobileSheetIssueNumber = ref<number | null>(null)

  const mobileSheetIssue = computed(() =>
    mobileSheetIssueNumber.value !== null
      ? issues.value.find(i => i.number === mobileSheetIssueNumber.value) ?? null
      : null
  )

  // Mobile filter sheet
  const filterSheetOpen = ref(false)

  function init(cfg: WidgetConfig) {
    config.value = cfg
    try {
      const isMobile = window.matchMedia('(max-width: 680px)').matches
      captureMode.value = isMobile ? 'voice' : 'text'
      mobileTab.value = 'text'
      activeTab.value = 'text'
    } catch { /* */ }
  }

  return {
    config, panelOpen, activeTab, mobileTab, captureMode, handedness, panelSnap, adminToken,
    draftSettingsOpen, draftTitle, draftDescription, draftMergePolicy,
    voiceDraftState, voiceDraftReady, voiceDraftDurationMs,
    issues, issuesLoaded, loadingIssues, listView, listSort, listQuery, listStatusFilter,
    creating, executingIssue,
    createError, listError, executeError,
    toastText, toastLink,
    textCreateSuccess, voiceCreateSuccess, lastSubmissionId, lastTextTitle, lastTextDescription,
    mobileSheetIssueNumber, mobileSheetIssue,
    filterSheetOpen,
    init,
  }
})
