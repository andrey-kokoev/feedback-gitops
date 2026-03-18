import { useWidgetStore } from '../stores/widget'

export function useWidgetState() {
  const store = useWidgetStore()

  function storageKey() {
    return store.config.storageKey + ':widget-state'
  }

  function normalizeLegacyDraftDescription(value: unknown): string {
    const text = String(value ?? '')
    const trimmed = text.trim()
    if (!trimmed) return ''
    const legacyUrlOnly = trimmed.toUpperCase().startsWith('URL: ') && !trimmed.includes('\n')
    return legacyUrlOnly ? '' : text
  }

  function restore() {
    try {
      const raw = localStorage.getItem(storageKey())
      if (!raw) return
      const saved = JSON.parse(raw)
      if (!saved || typeof saved !== 'object') return

      if (saved.composeMode === 'text' || saved.composeMode === 'voice') {
        store.composeMode = saved.composeMode
      } else if (saved.captureMode === 'voice') {
        store.composeMode = 'voice'
      } else if (saved.captureMode === 'text') {
        store.composeMode = 'text'
      }

      // Restore mobile tab — handle legacy 'requests' value
      if (['text', 'list', 'settings'].includes(saved.mobileTab)) {
        store.mobileTab = saved.mobileTab
      } else if (saved.mobileTab === 'requests' || saved.activeTab === 'requests') {
        store.mobileTab = 'list'
      }

      if (Array.isArray(saved.issues)) store.issues = saved.issues
      store.issuesLoaded = Boolean(saved.issuesLoaded)

      if (['active', 'needs_action', 'completed', 'all'].includes(saved.listView)) store.listView = saved.listView
      if (saved.listSort === 'updated_desc' || saved.listSort === 'updated_asc') store.listSort = saved.listSort

      if (typeof saved.draftTitle === 'string') store.draftTitle = saved.draftTitle
      if (typeof saved.draftDescription === 'string') store.draftDescription = normalizeLegacyDraftDescription(saved.draftDescription)
      if (saved.draftMergePolicy === 'auto_unblocked' || saved.draftMergePolicy === 'manual') store.draftMergePolicy = saved.draftMergePolicy

      if (saved.handedness === 'left' || saved.handedness === 'right') store.handedness = saved.handedness
      if (saved.panelSnap === 'top' || saved.panelSnap === 'middle' || saved.panelSnap === 'bottom') store.panelSnap = saved.panelSnap

      // Redesign elements
      if (['technical_issue', 'personal_todo', 'feature_request'].includes(saved.mode)) store.mode = saved.mode
      if (saved.swipeMapping && typeof saved.swipeMapping === 'object') {
        store.swipeMapping = { ...store.swipeMapping, ...saved.swipeMapping }
      }
      if (saved.itemViews && typeof saved.itemViews === 'object') {
        store.itemViews = { ...store.itemViews, ...saved.itemViews }
      }
    } catch { /* */ }
  }

  function persist() {
    try {
      localStorage.setItem(storageKey(), JSON.stringify({
        mobileTab: store.mobileTab,
        composeMode: store.composeMode,
        issues: store.issues,
        issuesLoaded: store.issuesLoaded,
        listView: store.listView,
        listSort: store.listSort,
        draftTitle: store.draftTitle,
        draftDescription: store.draftDescription,
        draftMergePolicy: store.draftMergePolicy,
        handedness: store.handedness,
        panelSnap: store.panelSnap,
        mode: store.mode,
        swipeMapping: store.swipeMapping,
        itemViews: store.itemViews,
      }))
    } catch { /* */ }
  }

  return { restore, persist }
}
