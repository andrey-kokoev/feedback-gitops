import type { IssueListItem, WidgetConfig } from '../types'

export interface WidgetAdapter {
  // Config access
  getConfig(): WidgetConfig

  // Issues API
  loadIssues(force?: boolean): Promise<void>
  submitText(title: string, description: string, execute: boolean): Promise<{ submissionId?: string }>
  submitVoice(audioBlob: Blob, mimeType: string, durationMs: number): Promise<{ submissionId?: string }>
  submitComment(issueNumber: number, body: string): Promise<void>
  createLinkedItem(sourceIssueNumber: number, title: string, description: string, execute: boolean): Promise<{ submissionId?: string }>
  executeAction(issueNumber: number, action: string, target?: 'issue' | 'pull_request', payload?: { title?: string, body?: string }): Promise<{ pullRequest?: { url: string } }>
  cancelSubmission(submissionId: string): Promise<void>
  
  // Helpers
  mapActionError(raw: string): string
  getIssueUrlFromCreateResponse(data: unknown): string

  // Access control
  authorize(): boolean
  hasAccess(): boolean

  // Token / Auth
  readToken(): string | null
  requireToken(): string | null
  promptToken(): void
  clearToken(): void
}
