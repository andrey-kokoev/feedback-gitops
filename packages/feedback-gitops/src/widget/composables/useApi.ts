import { useWidgetStore } from '../stores/widget'
import { useAdminToken } from './useAdminToken'
import type { IssueListItem } from '../types'

export function useApi() {
  const store = useWidgetStore()

  function collapseText(value: unknown): string {
    return String(value ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  }

  function dispatchEvent(name: string, detail: any) {
    const el = document.querySelector('feedback-gitops-widget')
    if (el) {
      el.dispatchEvent(new CustomEvent(`feedback:${name}`, { detail, bubbles: true, composed: true }))
    }
  }

  async function readApiPayload(response: Response, fallback: string): Promise<unknown> {
    const ct = (response.headers.get('content-type') ?? '').toLowerCase()
    let data: unknown = null
    let text = ''

    if (ct.includes('application/json')) {
      try { data = await response.json() } catch { throw new Error('Invalid JSON response from API.') }
    } else {
      try { text = await response.text() } catch { text = '' }
    }

    if (!response.ok) {
      const d = data as Record<string, unknown> | null
      const errObj = d?.error as Record<string, unknown> | undefined
      const code = errObj && typeof errObj.code === 'string' ? errObj.code : ''
      if (code === 'AGENT_WORKING') throw new Error('Copilot is still working on this draft pull request.')
      const msg = (d?.statusMessage as string) || (errObj?.error as string) || collapseText(text).slice(0, 180) || fallback
      throw new Error(code ? `[${code}] ${msg}` : msg)
    }

    if (data !== null) return data

    const snippet = text ? collapseText(text).slice(0, 120) : ''
    throw new Error(
      'Unexpected non-JSON API response. Check widget endpoint configuration.'
      + (snippet ? ' Response preview: ' + snippet : ''),
    )
  }

  async function loadIssues(force = false): Promise<void> {
    if (store.loadingIssues && !force) return

    const token = useAdminToken().readToken()
    if (!token) return

    store.loadingIssues = true
    store.listError = ''

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    try {
      const params = new URLSearchParams()
      params.set('limit', '50')
      params.set('view', store.listView)
      params.set('sort', store.listSort)
      if (store.listQuery) params.set('q', store.listQuery)
      if (store.listStatusFilter.length) {
        params.set('status', store.listStatusFilter.join(','))
      }

      const response = await fetch(`${store.config.issuesEndpoint}?${params}`, {
        method: 'GET',
        headers: { 'x-admin-token': token },
        signal: controller.signal,
      })
      const data = await readApiPayload(response, 'Failed to load issues') as { issues?: IssueListItem[] }
      store.issues = Array.isArray(data?.issues) ? data.issues : []
      store.issuesLoaded = true
    } catch (err) {
      store.listError = err instanceof Error ? err.message : 'Failed to load issues'
    } finally {
      window.clearTimeout(timeout)
      store.loadingIssues = false
    }
  }

  async function submitText(title: string, description: string, execute: boolean): Promise<{ submissionId?: string }> {
    const { requireToken } = useAdminToken()
    const token = requireToken()
    if (!token) throw new Error('Admin token required')

    const mergePolicy = store.draftMergePolicy
    const labels = execute ? ['agent-execute'] : []

    const response = await fetch(store.config.endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({
        title,
        description,
        url: window.location.href,
        userAgent: navigator.userAgent,
        labels,
        mergePolicy: mergePolicy === 'auto_unblocked' ? 'auto_unblocked' : undefined,
        execute,
      }),
    })
    const data = await readApiPayload(response, 'Failed to create request') as { submissionId?: string }
    dispatchEvent('item-action', { id: data.submissionId, action: 'create' })
    return data
  }

  async function submitVoice(audioBlob: Blob, mimeType: string, durationMs: number): Promise<{ submissionId?: string }> {
    const { requireToken } = useAdminToken()
    const token = requireToken()
    if (!token) throw new Error('Admin token required')

    const ext = mimeType.includes('mp4') ? 'm4a' : 'webm'
    const formData = new FormData()
    formData.append('audio', audioBlob, `voice-request.${ext}`)
    formData.append('mimeType', mimeType || 'audio/webm')
    formData.append('durationMs', String(durationMs))
    formData.append('url', window.location.href)
    formData.append('userAgent', navigator.userAgent)
    formData.append('mergePolicy', store.draftMergePolicy)

    const response = await fetch(store.config.endpoint, {
      method: 'POST',
      headers: { 'x-admin-token': token },
      body: formData,
    })
    return readApiPayload(response, 'Failed to submit voice request') as Promise<{ submissionId?: string }>
  }

  async function submitComment(issueNumber: number, body: string): Promise<void> {
    const { requireToken } = useAdminToken()
    const token = requireToken()
    if (!token) throw new Error('Admin token required')

    const response = await fetch(store.config.actionEndpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ issueNumber, target: 'issue', action: 'comment', body }),
    })
    await readApiPayload(response, 'Failed to submit comment')
    dispatchEvent('item-action', { id: issueNumber, action: 'comment' })
  }

  async function createLinkedItem(sourceIssueNumber: number, title: string, description: string, execute: boolean): Promise<{ submissionId?: string }> {
    const { requireToken } = useAdminToken()
    const token = requireToken()
    if (!token) throw new Error('Admin token required')

    const response = await fetch(store.config.endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({
        title,
        description,
        sourceIssueNumber,
        url: window.location.href,
        userAgent: navigator.userAgent,
        labels: execute ? ['agent-execute'] : [],
        execute
      }),
    })
    const data = await readApiPayload(response, 'Failed to create linked item') as { submissionId?: string }
    dispatchEvent('item-action', { id: data.submissionId, action: 'create_linked_item' })
    return data
  }

  async function executeAction(issueNumber: number, action: string, target: 'issue' | 'pull_request' = 'issue', payload?: { title?: string, body?: string }): Promise<{ pullRequest?: { url: string } }> {
    const { requireToken } = useAdminToken()
    const token = requireToken()
    if (!token) throw new Error('Admin token required')

    const bodyObj: any = { issueNumber, target, action }
    if (payload?.title !== undefined) bodyObj.title = payload.title
    if (payload?.body !== undefined) bodyObj.body = payload.body

    const response = await fetch(store.config.actionEndpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(bodyObj),
    })
    const data = await readApiPayload(response, 'Failed to apply action') as { pullRequest?: { url: string } }
    dispatchEvent('item-action', { id: issueNumber, action })
    return data
  }

  async function cancelSubmission(submissionId: string): Promise<void> {
    const token = useAdminToken().readToken()
    if (!token) return
    try {
      await fetch(store.config.cancelEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ submissionId }),
      })
    } catch { /* best-effort */ }
  }

  function mapActionError(raw: string): string {
    if (raw.includes('AGENT_WORKING')) return 'Copilot is still working on this draft pull request.'
    if (raw.includes('AUTO_MERGE_ENABLE_FAILED')) return 'GitHub rejected enabling auto-merge. Check PR checks/rules and retry.'
    if (raw.includes('AUTO_MERGE_CONFIRM_FAILED') || raw.includes('AUTO_MERGE_NOT_ENABLED')) return 'Merge request was recorded but auto-merge was not confirmed. Retry merge request.'
    return 'Failed to apply action.'
  }

  function getIssueUrlFromCreateResponse(data: unknown): string {
    const d = data as Record<string, unknown> | null
    if (d?.issue && typeof (d.issue as Record<string, unknown>).url === 'string') return (d.issue as Record<string, unknown>).url as string
    if (typeof d?.url === 'string') return d.url
    return ''
  }

  return { loadIssues, submitText, submitVoice, executeAction, cancelSubmission, mapActionError, getIssueUrlFromCreateResponse, submitComment, createLinkedItem }
}
