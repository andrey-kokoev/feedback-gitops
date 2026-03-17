import { ref } from 'vue'
import type { IssueListItem } from '../types'

export function useIssueSheet() {
  const sheetOpen = ref(false)
  const sheetIssue = ref<IssueListItem | null>(null)
  const filterMode = ref(false)

  const editMode = ref(false)

  function openIssue(issue: IssueListItem, edit: boolean = false) {
    sheetIssue.value = issue
    filterMode.value = false
    editMode.value = edit
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
      editMode.value = false
    }, 260)
  }

  return {
    sheetOpen,
    sheetIssue,
    filterMode,
    editMode,
    openIssue,
    openFilter,
    close,
  }
}
