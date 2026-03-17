import { useWidgetStore } from '../stores/widget'

export function useAdminToken() {
  const store = useWidgetStore()

  function storageKey() {
    return store.config.storageKey + ':admin-token'
  }

  function readToken(): string {
    try { return localStorage.getItem(storageKey()) ?? '' } catch { return '' }
  }

  function writeToken(value: string) {
    try {
      if (!value) localStorage.removeItem(storageKey())
      else localStorage.setItem(storageKey(), value)
    } catch { /* */ }
  }

  function promptToken(): string {
    const next = window.prompt('Enter admin token', readToken())
    if (next === null) return ''
    const token = next.trim()
    writeToken(token)
    return token
  }

  function requireToken(): string {
    return readToken() || promptToken()
  }

  return { readToken, writeToken, promptToken, requireToken }
}
