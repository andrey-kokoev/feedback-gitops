import { inject } from 'vue'
import type { WidgetAdapter } from '../core/adapter'

export function useApi() {
  const adapter = inject<WidgetAdapter>('widget-adapter')
  if (!adapter) throw new Error('WidgetAdapter not provided')

  return {
    authorize: adapter.authorize,
    hasAccess: adapter.hasAccess,
    loadIssues: adapter.loadIssues,
    submitText: adapter.submitText,
    submitVoice: adapter.submitVoice,
    executeAction: adapter.executeAction,
    cancelSubmission: adapter.cancelSubmission,
    mapActionError: adapter.mapActionError,
    getIssueUrlFromCreateResponse: adapter.getIssueUrlFromCreateResponse,
    submitComment: adapter.submitComment,
    createLinkedItem: adapter.createLinkedItem,
  }
}
