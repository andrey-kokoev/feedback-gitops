import { useWidgetStore } from '../../stores/widget'
import type { IssueListItem, WidgetConfig } from '../../types'
import type { WidgetAdapter } from '../../core/adapter'

export function createMockAdapter(): WidgetAdapter {
  const store = useWidgetStore()
  let subIdCounter = 100
  
  const searchParams = new URLSearchParams(window.location.search)
  const scenario = searchParams.get('scenario') || 'default'

  let mockIssues: IssueListItem[] = []

  if (scenario === 'empty') {
    mockIssues = []
  } else if (scenario === 'comments') {
    mockIssues = [
      { number: 4, title: 'Item with 5+ comments', body: 'Very active discussion.', state: 'open', url: 'https://github.com/mock/repo/issues/4', updatedAt: new Date().toISOString(), labels: [], status: 'new', statusDetail: '', pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: 'manual', commentCount: 6, comments: [{ id: '1', body: 'C1', createdAt: new Date().toISOString() }, { id: '2', body: 'C2', createdAt: new Date().toISOString() }, { id: '3', body: 'C3', createdAt: new Date().toISOString() }, { id: '4', body: 'C4', createdAt: new Date().toISOString() }, { id: '5', body: 'C5', createdAt: new Date().toISOString() }, { id: '6', body: 'C6', createdAt: new Date().toISOString() }] }
    ]
  } else if (scenario === 'linked') {
    mockIssues = [
      { number: 5, title: 'Linked Feature', body: 'Originated elsewhere.', state: 'open', url: 'https://github.com/mock/repo/issues/5', updatedAt: new Date().toISOString(), labels: [], status: 'new', statusDetail: '', pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: 'manual', sourceIssue: { number: 42, title: 'Epic parent', url: 'https://github.com/mock/repo/issues/42' } }
    ]
  } else if (scenario === 'edit') {
    mockIssues = [
      { number: 6, title: 'Item ready for edit', body: 'This item can be edited using the swipe or contextual menu.', state: 'open', url: 'https://github.com/mock/repo/issues/6', updatedAt: new Date().toISOString(), labels: [], status: 'new', statusDetail: '', pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: 'manual' }
    ]
  } else if (scenario === 'unread') {
    mockIssues = [
      { number: 7, title: 'Brand new unread item', body: 'This item has just appeared.', state: 'open', url: 'https://github.com/mock/repo/issues/7', updatedAt: new Date().toISOString(), labels: [], status: 'new', statusDetail: '', pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: 'manual' }
    ]
  } else {
    // default
    mockIssues = [
      { number: 1, title: 'Unread Feedback Item', body: 'This is an item nobody has viewed yet.', state: 'open', url: 'https://github.com/mock/repo/issues/1', updatedAt: new Date().toISOString(), labels: [], status: 'new', statusDetail: '', pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: 'manual' },
      { number: 2, title: 'Pinned Bug Report', body: 'This has been pinned by a maintainer.', state: 'open', url: 'https://github.com/mock/repo/issues/2', updatedAt: new Date(Date.now() - 3600000).toISOString(), labels: [], status: 'new', statusDetail: '', pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: 'manual', pinned: true },
      { number: 3, title: 'Item with comments', body: 'This has some comments.', state: 'open', url: 'https://github.com/mock/repo/issues/3', updatedAt: new Date(Date.now() - 86400000).toISOString(), labels: [], status: 'new', statusDetail: '', pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: 'manual', commentCount: 3, comments: [{ id: '1', body: 'First comment', createdAt: new Date().toISOString() }] },
    ]
  }

  // Simulate network delay
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  function getConfig(): WidgetConfig {
    return store.config
  }

  function authorize(): boolean {
    return true
  }

  function hasAccess(): boolean {
    return true
  }

  // Token management - Mock does not care about auth
  function readToken(): string | null {
    return 'mock-token'
  }

  function requireToken(): string | null {
    return 'mock-token'
  }

  function promptToken(): void {
    // No-op for mock
  }

  function clearToken(): void {
    // No-op for mock
  }

  async function loadIssues(force = false): Promise<void> {
    if (store.loadingIssues && !force) return
    store.loadingIssues = true
    store.listError = ''

    if (scenario === 'loading') {
      // delay indefinitely for loading state check
      await delay(100000)
      return
    }

    try {
      await delay(500) // fake latency
      if (scenario === 'error') throw new Error('Simulated load error')
      // Basic filtering for view modes if needed
      store.issues = [...mockIssues]
      store.issuesLoaded = true
    } catch (err) {
      store.listError = 'Failed to load mock issues'
    } finally {
      store.loadingIssues = false
    }
  }

  function dispatchEvent(name: string, detail: any) {
    const el = document.querySelector('feedback-gitops-widget')
    if (el) {
      el.dispatchEvent(new CustomEvent(`feedback:${name}`, { detail, bubbles: true, composed: true }))
    }
  }

  async function submitText(title: string, description: string, execute: boolean): Promise<{ submissionId?: string }> {
    await delay(600)
    const id = `mock-sub-${subIdCounter++}`
    dispatchEvent('item-action', { id, action: 'create' })
    return { submissionId: id }
  }

  async function submitVoice(audioBlob: Blob, mimeType: string, durationMs: number): Promise<{ submissionId?: string }> {
    await delay(800)
    const id = `mock-sub-${subIdCounter++}`
    return { submissionId: id }
  }

  async function submitComment(issueNumber: number, body: string): Promise<void> {
    await delay(400)
    dispatchEvent('item-action', { id: issueNumber, action: 'comment' })
  }

  async function createLinkedItem(sourceIssueNumber: number, title: string, description: string, execute: boolean): Promise<{ submissionId?: string }> {
    await delay(600)
    const id = `mock-sub-${subIdCounter++}`
    dispatchEvent('item-action', { id, action: 'create_linked_item' })
    return { submissionId: id }
  }

  async function executeAction(issueNumber: number, action: string, target?: 'issue' | 'pull_request', payload?: { title?: string, body?: string }): Promise<{ pullRequest?: { url: string } }> {
    await delay(400)
    
    if (action === 'edit' && payload) {
      const issue = mockIssues.find(i => i.number === issueNumber)
      if (issue) {
        if (payload.title) issue.title = payload.title
        if (payload.body) issue.body = payload.body
      }
    } else if (action === 'done_archive') {
       const idx = mockIssues.findIndex(i => i.number === issueNumber)
       if (idx !== -1) mockIssues.splice(idx, 1)
    }

    dispatchEvent('item-action', { id: issueNumber, action })
    return {}
  }

  async function cancelSubmission(submissionId: string): Promise<void> {
    await delay(200)
  }

  function mapActionError(raw: string): string {
    return 'Failed to apply mock action.'
  }

  function getIssueUrlFromCreateResponse(data: unknown): string {
    return 'https://github.com/mock/repo/issues/new'
  }

  return {
    getConfig,
    authorize,
    hasAccess,
    readToken,
    requireToken,
    promptToken,
    clearToken,
    loadIssues,
    submitText,
    submitVoice,
    submitComment,
    createLinkedItem,
    executeAction,
    cancelSubmission,
    mapActionError,
    getIssueUrlFromCreateResponse
  }
}
