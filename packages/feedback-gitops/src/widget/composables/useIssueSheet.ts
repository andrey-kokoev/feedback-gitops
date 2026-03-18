import { ref } from 'vue'
import type { IssueListItem } from '../types'

export function useIssueSheet() {
  const sheetOpen = ref(false)
  const sheetIssue = ref<IssueListItem | null>(null)
  const filterMode = ref(false)

  function openIssue(issue: IssueListItem) {
    sheetIssue.value = issue
    filterMode.value = false
    sheetOpen.value = true
  }

  function openFilter() {
    sheetIssue.value = null
    filterMode.value = true
    sheetOpen.value = true
  }

  function close() {
    sheetOpen.value = false
    setTimeout(() => {
      sheetIssue.value = null
      filterMode.value = false
    }, 260)
  }

  return {
    sheetOpen,
    sheetIssue,
    filterMode,
    openIssue,
    openFilter,
    close,
  }
}
