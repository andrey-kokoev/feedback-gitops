import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IssueListItem, MobileTab, ListView, ListSort, WidgetConfig, WidgetMode, SwipeMapping } from '../types'

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
  const mobileTab = ref<MobileTab>('text')
  const handedness = ref<'left' | 'right'>('right')
  const panelSnap = ref<'top' | 'middle' | 'bottom'>('bottom')
  const adminToken = ref('')
  const composeMode = ref<'text' | 'voice'>('text')

  // Draft
  const draftTitle = ref('')
  const draftDescription = ref('')
  const draftMergePolicy = ref<'manual' | 'auto_unblocked'>('manual')
  const voiceDraftState = ref<'idle' | 'recording' | 'paused'>('idle')
  const voiceDraftReady = ref(false)
  const voiceDraftDurationMs = ref(0)

  // Redesign state
  const mode = ref<WidgetMode>('technical_issue')
  const itemViews = ref<Record<number, number>>({}) // issueId -> timestamp viewed
  const swipeMapping = ref<SwipeMapping>({
    shortLeft: 'done_archive',
    shortRight: 'pin_unpin',
    longLeft: 'create_linked_item',
    longRight: 'comment',
  })

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

  // Errors
  const createError = ref('')
  const listError = ref('')

  // Success states (for undo)
  const textCreateSuccess = ref(false)
  const voiceCreateSuccess = ref(false)
  const lastSubmissionId = ref<string | null>(null)
  const lastTextTitle = ref('')
  const lastTextDescription = ref('')

  function init(cfg: WidgetConfig) {
    config.value = cfg
    mobileTab.value = 'text'
    composeMode.value = 'text'
  }

  return {
    config, mobileTab, handedness, panelSnap, adminToken, composeMode,
    draftTitle, draftDescription, draftMergePolicy, voiceDraftState, voiceDraftReady, voiceDraftDurationMs,
    mode, itemViews, swipeMapping,
    issues, issuesLoaded, loadingIssues, listView, listSort, listQuery, listStatusFilter,
    creating,
    createError, listError,
    textCreateSuccess, voiceCreateSuccess, lastSubmissionId, lastTextTitle, lastTextDescription,
    init,
  }
})
