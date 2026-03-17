import { inject } from 'vue'
import type { WidgetAdapter } from '../core/adapter'

export function useAdminToken() {
  const adapter = inject<WidgetAdapter>('widget-adapter')
  if (!adapter) throw new Error('WidgetAdapter not provided')

  return {
    readToken: adapter.readToken,
    requireToken: adapter.requireToken,
    promptToken: adapter.promptToken,
    clearToken: adapter.clearToken,
  }
}
