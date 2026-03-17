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

      // Restore mobile tab — handle legacy 'new'/'requests' values
      if (['text', 'voice', 'list', 'settings'].includes(saved.activeTab)) {
        store.activeTab = saved.activeTab
        store.mobileTab = saved.activeTab
      } else if (saved.activeTab === 'requests') {
        store.activeTab = 'list'
        store.mobileTab = 'list'
      }

      if (saved.captureMode === 'text' || saved.captureMode === 'voice') store.captureMode = saved.captureMode
      if (Array.isArray(saved.issues)) store.issues = saved.issues
      store.issuesLoaded = Boolean(saved.issuesLoaded)
      store.panelOpen = Boolean(saved.panelOpen)

      if (['active', 'needs_action', 'completed', 'all'].includes(saved.listView)) store.listView = saved.listView
      if (saved.listSort === 'updated_desc' || saved.listSort === 'updated_asc') store.listSort = saved.listSort

      if (typeof saved.draftTitle === 'string') store.draftTitle = saved.draftTitle
      if (typeof saved.draftDescription === 'string') store.draftDescription = normalizeLegacyDraftDescription(saved.draftDescription)
      if (saved.draftMergePolicy === 'auto_unblocked' || saved.draftMergePolicy === 'manual') store.draftMergePolicy = saved.draftMergePolicy
      store.draftSettingsOpen = Boolean(saved.draftSettingsOpen)

      if (saved.handedness === 'left' || saved.handedness === 'right') store.handedness = saved.handedness
      if (saved.panelSnap === 'top' || saved.panelSnap === 'bottom') store.panelSnap = saved.panelSnap
    } catch { /* */ }
  }

  function persist() {
    try {
      localStorage.setItem(storageKey(), JSON.stringify({
        activeTab: store.activeTab,
        captureMode: store.captureMode,
        issues: store.issues,
        issuesLoaded: store.issuesLoaded,
        panelOpen: store.panelOpen,
        listView: store.listView,
        listSort: store.listSort,
        draftTitle: store.draftTitle,
        draftDescription: store.draftDescription,
        draftMergePolicy: store.draftMergePolicy,
        draftSettingsOpen: store.draftSettingsOpen,
        handedness: store.handedness,
        panelSnap: store.panelSnap,
      }))
    } catch { /* */ }
  }

  return { restore, persist }
}
