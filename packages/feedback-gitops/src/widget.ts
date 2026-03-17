import { generateInlineAudioRecorderSource } from "./inline-recorder";

/**
 * Generates the widget.js script content that gets injected into client pages.
 */
export function generateWidgetScript(endpoint: string, defaultRepo: string, defaultLabels: string[], defaultStorageKey = "thoughts"): string {
  const baseEndpoint = endpoint.replace(/\/+$/, "");
  const defaultLabelsStr = defaultLabels.join(",");
  const inlineRecorderSource = generateInlineAudioRecorderSource();

  return `
(function() {
  'use strict';
${inlineRecorderSource}

  let voiceRecorder = null;
  let undoTimerHandle = null;
  function getBootstrapConfig() {
    const scriptEl = document.currentScript instanceof HTMLScriptElement ? document.currentScript : null;
    const ds = scriptEl?.dataset || {};
    const endpoint = ds.endpoint || '${baseEndpoint}';
    const inferEndpoint = (pathSuffix) => {
      if (endpoint.endsWith('/api/issue')) {
        return endpoint.slice(0, endpoint.length - '/api/issue'.length) + pathSuffix;
      }
      return endpoint + pathSuffix.replace('/api', '');
    };
    return {
      endpoint,
      issuesEndpoint: ds.issuesEndpoint || inferEndpoint('/api/issues'),
      actionEndpoint: ds.actionEndpoint || inferEndpoint('/api/action'),
      cancelEndpoint: ds.cancelEndpoint || inferEndpoint('/api/cancel'),
      repo: ds.repo || '${defaultRepo}',
      labels: ds.labels || '${defaultLabelsStr}',
      handedness: ds.handedness === 'left' ? 'left' : 'right',
      storageKey: ds.storageKey || '${defaultStorageKey}',
    };
  }

  const config = getBootstrapConfig();

  function isMobile() {
    try { return window.matchMedia('(max-width: 680px)').matches; } catch { return false; }
  }

  function getStateStorageKey() {
    return config.storageKey + ':widget-state';
  }

  function getAdminTokenStorageKey() {
    return config.storageKey + ':admin-token';
  }

  function getDefaultCaptureMode() {
    try {
      return window.matchMedia('(max-width: 680px)').matches ? 'voice' : 'text';
    } catch {
      return 'text';
    }
  }

  const state = {
    activeTab: 'new',
    captureMode: 'text',
    issues: [],
    issuesLoaded: false,
    loadingIssues: false,
    listView: 'active',
    listSort: 'updated_desc',
    listQuery: '',
    listStatusFilter: [],
    executingIssue: null,
    creating: false,
    panelOpen: false,
    draftTitle: '',
    draftDescription: '',
    draftMergePolicy: 'manual',
    draftSettingsOpen: false,
    voiceDraftState: 'idle',
    voiceDraftReady: false,
    voiceDraftDurationMs: 0,
    voiceDraftTimer: null,
    createError: '',
    listError: '',
    executeError: '',
    toastText: '',
    toastLink: '',
    toastTimer: null,
    textCreateSuccess: false,
    voiceCreateSuccess: false,
    lastSubmissionId: null,
    mobileSheetIssueNumber: null,
    handedness: 'right',
  };

  function parseLabels() {
    return config.labels.split(',').map((item) => item.trim()).filter(Boolean);
  }

  function collapseText(value) {
    return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\\s+/g, ' ').trim();
  }

  function mapActionError(rawMessage) {
    // Map known backend error codes to user-friendly UI copy
    if (rawMessage.includes('AGENT_WORKING')) {
      return 'Copilot is still working on this draft pull request.';
    }
    if (rawMessage.includes('AUTO_MERGE_ENABLE_FAILED')) {
      return 'GitHub rejected enabling auto-merge. Check PR checks/rules and retry.';
    }
    if (rawMessage.includes('AUTO_MERGE_CONFIRM_FAILED') || rawMessage.includes('AUTO_MERGE_NOT_ENABLED')) {
      return 'Merge request was recorded but auto-merge was not confirmed. Retry merge request.';
    }
    // Fallback: return generic message for unknown errors
    return 'Failed to apply action.';
  }

  function normalizeLegacyDraftDescription(value) {
    const text = String(value || '');
    const trimmed = text.trim();
    if (!trimmed) return '';
    const legacyUrlOnly = trimmed.toUpperCase().startsWith('URL: ')
      && !trimmed.includes('\\n');
    return legacyUrlOnly ? '' : text;
  }

  async function readApiPayload(response, fallbackMessage) {
    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    let data = null;
    let text = '';

    if (contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch {
        throw new Error('Invalid JSON response from API.');
      }
    } else {
      try {
        text = await response.text();
      } catch {
        text = '';
      }
    }

    if (!response.ok) {
      const code = data && data.error && typeof data.error.code === 'string' ? data.error.code : '';
      if (code === 'AGENT_WORKING') {
        throw new Error(
          'Copilot is still working on this draft pull request.',
        );
      }
      const messageFromJson = data && (data.statusMessage || (data.error && data.error.error))
        ? (data.statusMessage || data.error.error)
        : '';
      const errorCode = data && data.error && data.error.code ? String(data.error.code) : '';
      const messageFromText = text ? collapseText(text).slice(0, 180) : '';
      const finalMessage = messageFromJson || messageFromText || fallbackMessage;
      // Include error code in message for reliable client-side mapping
      throw new Error(errorCode ? '[' + errorCode + '] ' + finalMessage : finalMessage);
    }

    if (data !== null) return data;

    const snippet = text ? collapseText(text).slice(0, 120) : '';
    throw new Error(
      'Unexpected non-JSON API response. Check widget endpoint configuration.'
      + (snippet ? ' Response preview: ' + snippet : ''),
    );
  }

  function readAdminToken() {
    try {
      return localStorage.getItem(getAdminTokenStorageKey()) || '';
    } catch {
      return '';
    }
  }

  function writeAdminToken(value) {
    try {
      if (!value) {
        localStorage.removeItem(getAdminTokenStorageKey());
      } else {
        localStorage.setItem(getAdminTokenStorageKey(), value);
      }
    } catch {
      // no-op
    }
  }

  function restoreState() {
    try {
      const raw = localStorage.getItem(getStateStorageKey());
      if (!raw) {
        state.captureMode = getDefaultCaptureMode();
        return;
      }
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return;

      if (['new', 'requests', 'text', 'voice', 'list', 'settings'].includes(saved.activeTab)) state.activeTab = saved.activeTab;
      if (saved.activeTab === 'voice') state.captureMode = 'voice';
      if (saved.activeTab === 'text') state.captureMode = 'text';
      if (saved.captureMode === 'text' || saved.captureMode === 'voice') state.captureMode = saved.captureMode;
      if (Array.isArray(saved.issues)) state.issues = saved.issues;
      state.issuesLoaded = Boolean(saved.issuesLoaded);
      state.panelOpen = Boolean(saved.panelOpen);
      if (saved.listView === 'active' || saved.listView === 'needs_action' || saved.listView === 'completed' || saved.listView === 'all') {
        state.listView = saved.listView;
      }
      if (saved.listSort === 'updated_desc' || saved.listSort === 'updated_asc') state.listSort = saved.listSort;

      if (typeof saved.draftTitle === 'string') state.draftTitle = saved.draftTitle;
      if (typeof saved.draftDescription === 'string') state.draftDescription = normalizeLegacyDraftDescription(saved.draftDescription);
      if (typeof saved.draftMergePolicy === 'string') state.draftMergePolicy = saved.draftMergePolicy;
      state.draftSettingsOpen = Boolean(saved.draftSettingsOpen);

      if (typeof saved.createError === 'string') state.createError = saved.createError;
      if (typeof saved.listError === 'string') state.listError = saved.listError;
      if (typeof saved.executeError === 'string') state.executeError = saved.executeError;

      if (typeof saved.toastText === 'string') state.toastText = saved.toastText;
      if (typeof saved.toastLink === 'string') state.toastLink = saved.toastLink;
      if (saved.handedness === 'left' || saved.handedness === 'right') state.handedness = saved.handedness;
    } catch {
      // no-op
    }
  }

  function persistState() {
    try {
      const snapshot = {
        activeTab: state.activeTab,
        captureMode: state.captureMode,
        issues: state.issues,
        issuesLoaded: state.issuesLoaded,
        panelOpen: state.panelOpen,
        listView: state.listView,
        listSort: state.listSort,
        draftTitle: state.draftTitle,
        draftDescription: state.draftDescription,
        draftMergePolicy: state.draftMergePolicy,
        draftSettingsOpen: state.draftSettingsOpen,
        createError: state.createError,
        listError: state.listError,
        executeError: state.executeError,
        toastText: state.toastText,
        toastLink: state.toastLink,
        handedness: state.handedness,
      };
      localStorage.setItem(getStateStorageKey(), JSON.stringify(snapshot));
    } catch {
      // no-op
    }
  }

  function promptAdminToken() {
    const next = window.prompt('Enter admin token', readAdminToken());
    if (next === null) return '';
    const token = next.trim();
    writeAdminToken(token);
    updateTokenIndicators();
    return token;
  }

  function requireAdminToken() {
    return readAdminToken() || promptAdminToken();
  }

  function buildDefaultDescription() {
    return '';
  }

  function ensureDefaultDraftDescription() {
    if (String(state.draftDescription || '').trim()) return;
    state.draftDescription = buildDefaultDescription();
    const descriptionEl = document.getElementById('cfw-description');
    if (descriptionEl) descriptionEl.value = state.draftDescription;
    persistState();
  }

  function formatDuration(valueMs) {
    const totalSeconds = Math.max(0, Math.floor(Number(valueMs || 0) / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  }

  function stopVoiceDraftTimer() {
    if (state.voiceDraftTimer) {
      window.clearInterval(state.voiceDraftTimer);
      state.voiceDraftTimer = null;
    }
  }

  function startVoiceDraftTimer() {
    stopVoiceDraftTimer();
    state.voiceDraftTimer = window.setInterval(() => {
      state.voiceDraftDurationMs += 1000;
      updateVoiceComposer();
      persistState();
    }, 1000);
  }

  async function getVoiceRecorder() {
    if (!voiceRecorder) {
      voiceRecorder = createInlineAudioRecorder();
    }
    return voiceRecorder;
  }

  function createStyles() {
    const style = document.createElement('style');
    style.textContent = \`#cfw-feedback-widget { position: fixed; right: 18px; bottom: 18px; z-index: 9999; font-family: 'IBM Plex Sans', 'Segoe UI', sans-serif; color: #d9e7f7; }
#cfw-feedback-launcher { height: 34px; width: 34px; margin-right: 10px; border-radius: 6px; border: 1px solid rgba(124, 187, 255, 0.4); background: rgba(10, 17, 29, 0.9); color: #9ad2ff; box-shadow: 0 8px 20px rgba(2, 7, 14, 0.35); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; backdrop-filter: blur(6px); }
#cfw-feedback-launcher:hover { color: #d9e7f7; border-color: rgba(154, 210, 255, 0.55); background: rgba(12, 25, 40, 0.95); }
#cfw-feedback-launcher.needs-token { opacity: 0.88; }
#cfw-feedback-launcher svg { width: 14px; height: 14px; }
#cfw-feedback-panel { position: fixed; top: 14px; right: 14px; height: calc(100vh - 28px); width: min(720px, calc(100vw - 28px)); background: rgba(10, 17, 29, 0.94); color: #d9e7f7; border: 1px solid rgba(124, 187, 255, 0.28); border-radius: 10px; box-shadow: 0 24px 44px rgba(2, 7, 14, 0.55); transform: translateX(calc(100% + 20px)); transition: transform .2s ease; z-index: 10000; display: flex; flex-direction: column; backdrop-filter: blur(10px); }
#cfw-feedback-panel.active { transform: translateX(0); }
#cfw-feedback-overlay { position: fixed; inset: 0; background: rgba(2,6,23,0.45); opacity: 0; pointer-events: none; transition: opacity .2s ease; z-index: 9998; }
#cfw-feedback-overlay.active { opacity: 1; pointer-events: auto; }
#cfw-feedback-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 13px 14px; border-bottom: 1px solid rgba(124, 187, 255, 0.22); }
#cfw-feedback-title { margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #7cc4ff; font-weight: 600; }
#cfw-feedback-header-actions { display: inline-flex; align-items: center; gap: 6px; position: relative; }
#cfw-token-menu-btn { width: 28px; height: 28px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: #86a8cb; cursor: pointer; font-size: 18px; line-height: 1; }
#cfw-token-menu-btn:hover { color: #d9e7f7; background: rgba(79, 114, 152, 0.22); }
#cfw-token-menu { position: absolute; top: calc(100% + 6px); right: 34px; min-width: 148px; border: 1px solid #2f4864; border-radius: 8px; background: #0d1727; box-shadow: 0 12px 24px rgba(2, 7, 14, 0.45); padding: 4px; display: none; }
#cfw-token-menu.active { display: block; }
#cfw-token-menu button { width: 100%; text-align: left; border: 0; border-radius: 6px; background: transparent; color: #d9e7f7; font-size: 12px; padding: 7px 9px; cursor: pointer; }
#cfw-token-menu button:hover { background: rgba(79, 114, 152, 0.22); }
#cfw-token-menu button:disabled { color: #6f8dab; cursor: not-allowed; }
#cfw-panel-close { background: transparent; border: 0; color: #86a8cb; cursor: pointer; width: 28px; height: 28px; border-radius: 6px; }
#cfw-panel-close:hover { color: #d9e7f7; background: rgba(79, 114, 152, 0.22); }
#cfw-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 10px 14px; border-bottom: 1px solid rgba(124, 187, 255, 0.18); }
#cfw-tabs button { height: 32px; border: 1px solid #2f4864; border-radius: 6px; background: #0d1727; color: #9bb7d3; cursor: pointer; font-size: 12px; }
#cfw-tabs button.active { color: #d9e7f7; border-color: rgba(124, 187, 255, 0.45); background: #0f1c2f; }
#cfw-panel-body { padding: 14px; overflow: auto; flex: 1; }
#cfw-view-new, #cfw-view-requests { display: none; }
#cfw-view-new.active, #cfw-view-requests.active { display: block; }
#cfw-view-new input, #cfw-view-new textarea, #cfw-view-new select { width: 100%; border: 1px solid #2f4864; border-radius: 6px; background: #0d1727; color: #e2f0ff; box-sizing: border-box; font-family: inherit; }
#cfw-view-new input { height: 36px; padding: 0 12px; margin-bottom: 10px; }
#cfw-view-new textarea { min-height: 140px; resize: vertical; padding: 10px 12px; margin-bottom: 10px; }
#cfw-view-new input::placeholder, #cfw-view-new textarea::placeholder { color: #7f9cbc; }
#cfw-view-new input:focus, #cfw-view-new textarea:focus, #cfw-view-new select:focus { outline: none; border-color: #4f7298; background: #0f1c2f; }
.cfw-field-group { margin-bottom: 10px; }
.cfw-label { display: block; font-size: 12px; color: #9bb7d3; margin-bottom: 6px; }
.cfw-select { height: 36px; padding: 0 12px; }
.cfw-muted-note { font-size: 11px; color: #7f9cbc; margin: -4px 0 10px; }
.cfw-capture-modes { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
.cfw-capture-modes button { height: 34px; border: 1px solid #2f4864; border-radius: 6px; background: #0d1727; color: #9bb7d3; cursor: pointer; font-size: 12px; }
.cfw-capture-modes button.active { color: #d9e7f7; border-color: rgba(124, 187, 255, 0.45); background: #0f1c2f; }
.cfw-capture-pane { display: none; }
.cfw-capture-pane.active { display: block; }
.cfw-settings-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 10px; }
.cfw-settings-toggle { width: 34px; height: 34px; border-radius: 6px; }
.cfw-settings-panel { display: none; border: 1px solid #2f4864; border-radius: 8px; padding: 10px; margin-bottom: 10px; background: rgba(11, 24, 40, 0.65); }
.cfw-settings-panel.active { display: block; }
.cfw-voice-shell { display: grid; gap: 12px; }
.cfw-voice-status { border: 1px solid #2f4864; border-radius: 10px; padding: 14px; background: rgba(11, 24, 40, 0.65); }
.cfw-voice-status-line { font-size: 13px; color: #d9e7f7; margin-bottom: 6px; }
.cfw-voice-meta { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 12px; color: #9bb7d3; }
.cfw-voice-controls { display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 8px; }
.cfw-btn-danger { border-color: rgba(255, 154, 154, 0.45); color: #ffd4d4; background: rgba(60, 12, 16, 0.6); }
.cfw-btn-danger:hover { border-color: rgba(255, 154, 154, 0.65); background: rgba(84, 18, 23, 0.72); color: #fff1f1; }
.cfw-voice-hint { font-size: 11px; color: #7f9cbc; }
#cfw-new-actions { display: flex; justify-content: flex-end; gap: 8px; flex-wrap: nowrap; }
.cfw-btn { height: 34px; padding: 0 12px; border-radius: 6px; border: 1px solid transparent; font-size: 12px; cursor: pointer; }
.cfw-btn-outline { border-color: rgba(124, 187, 255, 0.4); color: #9ad2ff; background: rgba(10, 17, 29, 0.8); }
.cfw-btn-outline:hover { border-color: #4f7298; background: #0f1c2f; color: #d9e7f7; }
.cfw-btn-primary { border-color: rgba(124, 187, 255, 0.6); background: #1f4f7d; color: #e6f3ff; }
.cfw-btn-primary:hover { background: #2d608f; color: #ffffff; }
.cfw-btn:disabled { opacity: .6; cursor: not-allowed; }
.cfw-error { color: #ff9a9a; font-size: 12px; margin-bottom: 8px; display: none; }
.cfw-error.active { display: block; }
#cfw-requests-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
#cfw-requests-head h4 { margin: 0; font-size: 13px; }
#cfw-requests-controls { display: grid; gap: 8px; margin-bottom: 10px; }
#cfw-requests-controls-top { display: grid; grid-template-columns: 1fr auto auto; gap: 8px; }
#cfw-requests-search { width: 100%; border: 1px solid #2f4864; border-radius: 6px; background: #0d1727; color: #e2f0ff; height: 32px; padding: 0 10px; box-sizing: border-box; }
#cfw-requests-search:focus { outline: none; border-color: #4f7298; background: #0f1c2f; }
#cfw-requests-view, #cfw-requests-sort { border: 1px solid #2f4864; border-radius: 6px; background: #0d1727; color: #d9e7f7; height: 32px; padding: 0 8px; }
#cfw-status-filters { display: flex; flex-wrap: wrap; gap: 6px; }
.cfw-chip { border: 1px solid #2f4864; border-radius: 999px; background: #0d1727; color: #9bb7d3; height: 28px; padding: 0 10px; font-size: 11px; cursor: pointer; }
.cfw-chip.active { border-color: rgba(124, 187, 255, 0.55); color: #d9e7f7; background: #0f1c2f; }
#cfw-issues-empty { font-size: 12px; color: #8aa7c4; padding: 10px 0; }
#cfw-issues-table-wrap { overflow-x: auto; }
#cfw-issues-table { width: 100%; border-collapse: collapse; min-width: 520px; }
#cfw-issues-table th, #cfw-issues-table td { font-size: 12px; padding: 8px 6px; border-bottom: 1px solid #22384f; vertical-align: top; text-align: left; }
#cfw-issues-table th { color: #9bb7d3; font-weight: 500; }
#cfw-issues-cards { display: none; gap: 10px; }
.cfw-issue-card { border: 1px solid #2f4864; border-radius: 8px; padding: 10px; background: #0d1727; }
.cfw-issue-card-head { display: flex; justify-content: space-between; gap: 8px; font-size: 12px; margin-bottom: 8px; }
.cfw-issue-card-title { font-size: 13px; margin-bottom: 8px; }
.cfw-issue-card-meta { font-size: 12px; color: #9bb7d3; margin-bottom: 8px; }
.cfw-badge { display: inline-block; border-radius: 999px; padding: 2px 8px; font-size: 11px; border: 1px solid #2f4864; background: #0d1727; color: #9bb7d3; margin-right: 4px; margin-bottom: 4px; }
.cfw-row-actions { display: inline-flex; gap: 6px; flex-wrap: wrap; align-items: flex-start; max-width: 100%; }
.cfw-action-wrap { display: inline-flex; flex-direction: column; align-items: flex-start; gap: 4px; min-width: 0; }
.cfw-action-reason { font-size: 11px; color: #7f9cbc; font-style: italic; line-height: 1.3; white-space: normal; overflow-wrap: anywhere; max-width: 220px; }
.cfw-btn-disabled { opacity: 0.5; cursor: not-allowed; }
.cfw-sub-row td { background: rgba(11, 24, 40, 0.65); border-top: 0; }
.cfw-sub-item { display: flex; gap: 8px; align-items: center; font-size: 12px; color: #9bb7d3; }
.cfw-sub-item strong { color: #d9e7f7; }
.cfw-link { color: #9ad2ff; text-decoration: underline; text-underline-offset: 2px; }
.cfw-link:hover { color: #d9e7f7; }
#cfw-toast { position: fixed; top: 14px; right: 14px; z-index: 10002; max-width: min(420px, calc(100vw - 28px)); border: 1px solid rgba(124, 187, 255, 0.4); border-radius: 10px; background: rgba(10, 17, 29, 0.96); box-shadow: 0 12px 28px rgba(2, 7, 14, 0.5); padding: 10px 12px; font-size: 12px; color: #d9e7f7; display: none; backdrop-filter: blur(8px); }
#cfw-toast.active { display: block; }
#cfw-toast a { color: #9ad2ff; text-decoration: underline; text-underline-offset: 2px; }
#cfw-mobile { display: none; position: fixed; inset: 0; z-index: 9999; flex-direction: column; background: #0a111d; color: #d9e7f7; font-family: 'IBM Plex Sans','Segoe UI',sans-serif; }
#cfw-mobile-launcher { display: none; }
#cfw-swipe-hint { display: none; }
@media (max-width: 680px) {
  #cfw-feedback-launcher, #cfw-feedback-panel, #cfw-feedback-overlay { display: none !important; }
  #cfw-mobile-launcher { display: flex; position: fixed; bottom: 20px; width: 34px; height: 34px; border-radius: 6px; background: rgba(10,17,29,0.9); border: 1px solid rgba(124,187,255,0.4); color: #9ad2ff; align-items: center; justify-content: center; cursor: pointer; z-index: 9998; box-shadow: 0 8px 20px rgba(2,7,14,0.35); backdrop-filter: blur(6px); -webkit-tap-highlight-color: transparent; }
  #cfw-mobile-launcher svg { width: 14px; height: 14px; }
  #cfw-mobile-body { flex: 1; overflow: hidden; position: relative; }
  .cfw-mv { position: absolute; inset: 0; display: none; flex-direction: column; overflow: hidden; }
  .cfw-mv.active { display: flex; }
  #cfw-mobile-nav { height: 56px; display: flex; border-top: 1px solid rgba(124,187,255,0.18); background: rgba(10,17,29,0.98); flex-shrink: 0; }
  .cfw-nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; background: none; border: none; color: #7f9cbc; cursor: pointer; font-size: 10px; padding: 0; -webkit-tap-highlight-color: transparent; }
  .cfw-nav-btn.active { color: #9ad2ff; }
  .cfw-nav-btn svg { width: 20px; height: 20px; }
  #cfw-ml-head { padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(124,187,255,0.18); flex-shrink: 0; }
  #cfw-ml-head-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #7cc4ff; font-weight: 600; }
  #cfw-ml-head-actions { display: flex; gap: 8px; }
  #cfw-ml-head-actions button { height: 30px; padding: 0 10px; border: 1px solid #2f4864; border-radius: 6px; background: #0d1727; color: #9bb7d3; font-size: 12px; cursor: pointer; }
  #cfw-ml-head-actions button:disabled { opacity: 0.5; }
  #cfw-ml-body { flex: 1; overflow-y: auto; overscroll-behavior-y: contain; }
  #cfw-ml-ptr { height: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #9ad2ff; transition: height 0.15s ease; flex-shrink: 0; }
  #cfw-ml-ptr.cfw-ml-ptr-active { height: 36px; }
  .cfw-ml-empty { padding: 32px 14px; font-size: 13px; color: #7f9cbc; text-align: center; line-height: 1.6; }
  .cfw-ml-row { padding: 12px 14px; border-bottom: 1px solid #1a2d42; cursor: pointer; display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; -webkit-tap-highlight-color: transparent; }
  .cfw-ml-row:active { background: rgba(124,187,255,0.06); }
  .cfw-ml-row-left { flex: 1; min-width: 0; }
  .cfw-ml-row-num { font-size: 11px; color: #7f9cbc; margin-bottom: 2px; }
  .cfw-ml-row-title { font-size: 13px; color: #d9e7f7; margin-bottom: 4px; word-break: break-word; }
  .cfw-ml-row-meta { font-size: 11px; color: #7f9cbc; }
  .cfw-ml-row-status { font-size: 11px; color: #9bb7d3; white-space: nowrap; text-align: right; padding-top: 2px; }
  #cfw-ml-error { margin: 8px 14px 0; }
  #cfw-mbs-overlay { position: fixed; inset: 0; background: rgba(2,6,23,0.6); z-index: 10001; display: none; }
  #cfw-mbs-overlay.active { display: block; }
  #cfw-mbs { position: fixed; bottom: 0; left: 0; right: 0; z-index: 10002; background: #0d1727; border-top: 1px solid rgba(124,187,255,0.28); border-radius: 16px 16px 0 0; padding: 0 14px 36px; max-height: 82vh; overflow-y: auto; transform: translateY(100%); transition: transform .25s ease; }
  #cfw-mbs.active { transform: translateY(0); }
  #cfw-mbs-handle { width: 36px; height: 4px; background: #2f4864; border-radius: 2px; margin: 12px auto 16px; }
  .cfw-mf { flex: 1; display: flex; flex-direction: column; padding: 14px; overflow: hidden; }
  .cfw-mf input, .cfw-mf textarea, .cfw-mf select { width: 100%; border: 1px solid #2f4864; border-radius: 8px; background: #0d1727; color: #e2f0ff; box-sizing: border-box; font-family: inherit; }
  .cfw-mf input { height: 44px; padding: 0 14px; margin-bottom: 10px; font-size: 15px; flex-shrink: 0; }
  .cfw-mf textarea { flex: 1; padding: 12px 14px; font-size: 15px; resize: none; overflow-y: auto; margin-bottom: 10px; min-height: 0; }
  .cfw-mf input::placeholder, .cfw-mf textarea::placeholder { color: #7f9cbc; }
  .cfw-mf input:focus, .cfw-mf textarea:focus { outline: none; border-color: #4f7298; }
  .cfw-mf-policy { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; flex-shrink: 0; }
  .cfw-mf-policy label { font-size: 12px; color: #9bb7d3; }
  .cfw-mf-policy .cfw-m-hand-toggle .cfw-m-hand-btn { height: 36px; font-size: 13px; }
  .cfw-mf-error { font-size: 13px; color: #ff9a9a; display: none; margin-bottom: 8px; flex-shrink: 0; }
  .cfw-mf-error.active { display: block; }
  .cfw-mf-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .cfw-mf-actions button { flex: 1; height: 48px; border-radius: 8px; border: 1px solid; font-size: 14px; cursor: pointer; }
  .cfw-m-success { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent; }
  .cfw-m-success-ring { width: 80px; height: 80px; border-radius: 50%; background: rgba(74,222,128,0.12); border: 2px solid rgba(74,222,128,0.35); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
  .cfw-m-success-ring svg { width: 44px; height: 44px; color: #4ade80; }
  .cfw-m-success-hint { font-size: 13px; color: #7f9cbc; }
  .cfw-m-undo-btn { margin-top: 14px; padding: 7px 18px; border-radius: 8px; border: 1px solid rgba(124,187,255,0.35); background: transparent; color: #d9e7f7; font-size: 12px; cursor: pointer; }
  .cfw-m-undo-btn:hover { background: rgba(124,187,255,0.08); }
  .cfw-m-voice { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; padding: 14px; gap: 14px; overflow: hidden; }
  .cfw-m-vstatus { border: 1px solid #2f4864; border-radius: 12px; padding: 16px; background: rgba(11,24,40,0.65); flex-shrink: 0; }
  .cfw-m-vstatus-line { font-size: 15px; color: #d9e7f7; margin-bottom: 8px; }
  .cfw-m-vmeta { display: flex; justify-content: space-between; font-size: 13px; color: #9bb7d3; }
  .cfw-m-vcontrols { display: flex; gap: 10px; flex-shrink: 0; }
  .cfw-m-vcontrols button { flex: 1; height: 52px; border-radius: 10px; border: 1px solid; font-size: 15px; cursor: pointer; }
  .cfw-m-vhint { font-size: 12px; color: #7f9cbc; flex-shrink: 0; }
  .cfw-m-verror { font-size: 13px; color: #ff9a9a; display: none; flex-shrink: 0; }
  .cfw-m-verror.active { display: block; }
  .cfw-m-settings { padding: 20px 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; }
  .cfw-m-settings h3 { margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #7cc4ff; font-weight: 600; }
  .cfw-m-settings-btn { height: 48px; border-radius: 8px; border: 1px solid rgba(124,187,255,0.3); background: #0d1727; color: #d9e7f7; font-size: 14px; cursor: pointer; width: 100%; }
  .cfw-m-settings-btn:active { background: #0f1c2f; }
  .cfw-m-settings-note { font-size: 12px; color: #7f9cbc; margin: 0; }
  .cfw-m-settings-token { font-size: 12px; color: #9bb7d3; }
  .cfw-m-settings select { width: 100%; height: 44px; border: 1px solid #2f4864; border-radius: 8px; background: #0d1727; color: #e2f0ff; padding: 0 12px; font-size: 14px; font-family: inherit; }
  .cfw-m-hand-toggle { display: flex; gap: 8px; }
  .cfw-m-hand-btn { flex: 1; height: 44px; border-radius: 8px; border: 1px solid rgba(124,187,255,0.3); background: #0d1727; color: #9bb7d3; font-size: 14px; cursor: pointer; }
  .cfw-m-hand-btn.active { border-color: #9ad2ff; background: #0f2035; color: #9ad2ff; font-weight: 600; }
  #cfw-swipe-hint { display: block; position: fixed; bottom: 62px; font-size: 11px; color: #9ad2ff; background: rgba(10,17,29,0.92); border: 1px solid rgba(124,187,255,0.3); border-radius: 6px; padding: 4px 8px; pointer-events: none; opacity: 0; transition: opacity 0.4s; white-space: nowrap; z-index: 9999; }
  #cfw-swipe-hint.visible { opacity: 1; }
  .cfw-fs-section { margin-bottom: 18px; }
  .cfw-fs-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #7cc4ff; margin-bottom: 8px; }
  .cfw-fs-pills { display: flex; flex-wrap: wrap; gap: 6px; }
  .cfw-fs-pill { border: 1px solid #2f4864; border-radius: 999px; background: #0d1727; color: #9bb7d3; height: 32px; padding: 0 14px; font-size: 12px; cursor: pointer; }
  .cfw-fs-pill.active { border-color: rgba(124,187,255,0.55); color: #d9e7f7; background: #0f1c2f; }
  .cfw-fs-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .cfw-fs-chip { border: 1px solid #2f4864; border-radius: 999px; background: #0d1727; color: #9bb7d3; height: 28px; padding: 0 10px; font-size: 11px; cursor: pointer; }
  .cfw-fs-chip.active { border-color: rgba(124,187,255,0.55); color: #d9e7f7; background: #0f1c2f; }
  .cfw-is-num { font-size: 12px; color: #7f9cbc; margin-bottom: 4px; }
  .cfw-is-title { font-size: 16px; color: #d9e7f7; margin-bottom: 10px; word-break: break-word; text-decoration: none; display: block; line-height: 1.4; }
  .cfw-is-title:hover { color: #9ad2ff; }
  .cfw-is-status { font-size: 13px; color: #9bb7d3; margin-bottom: 14px; }
  .cfw-is-section { margin-bottom: 16px; }
  .cfw-is-section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #7cc4ff; margin-bottom: 8px; }
  .cfw-is-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .cfw-is-actions { display: flex; flex-direction: column; gap: 8px; }
  .cfw-is-action-btn { width: 100%; height: 48px; border-radius: 8px; border: 1px solid rgba(124,187,255,0.4); background: #0d1727; color: #d9e7f7; font-size: 14px; cursor: pointer; text-align: left; padding: 0 14px; }
  .cfw-is-action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .cfw-is-action-reason { font-size: 11px; color: #7f9cbc; font-style: italic; display: block; padding: 0 2px; }
  .cfw-is-pr-link { color: #9ad2ff; text-decoration: underline; text-underline-offset: 2px; font-size: 13px; }
  .cfw-is-error { font-size: 13px; color: #ff9a9a; display: none; margin-bottom: 10px; }
  .cfw-is-error.active { display: block; }
  .cfw-mbs-close { width: 100%; height: 48px; border-radius: 8px; border: 1px solid #2f4864; background: transparent; color: #9bb7d3; font-size: 14px; cursor: pointer; margin-top: 8px; }
}
@media (min-width: 681px) {
  #cfw-mobile, #cfw-mobile-launcher, #cfw-swipe-hint { display: none !important; }
}\`;
    return style;
  }

  function setCaptureMode(mode) {
    state.captureMode = mode === 'voice' ? 'voice' : 'text';
    updateCaptureModeUi();
    persistState();
  }

  function updateCaptureModeUi() {
    ['voice', 'text'].forEach((mode) => {
      const button = document.getElementById('cfw-mode-' + mode);
      const pane = document.getElementById('cfw-pane-' + mode);
      if (button) button.classList.toggle('active', state.captureMode === mode);
      if (pane) pane.classList.toggle('active', state.captureMode === mode);
    });
    const actions = document.getElementById('cfw-new-actions');
    if (actions) actions.style.display = state.captureMode === 'text' ? 'flex' : 'none';
  }

  function setDraftSettingsOpen(nextOpen) {
    state.draftSettingsOpen = Boolean(nextOpen);
    const panel = document.getElementById('cfw-draft-settings');
    const toggle = document.getElementById('cfw-draft-settings-toggle');
    if (panel) panel.classList.toggle('active', state.draftSettingsOpen);
    if (toggle) toggle.setAttribute('aria-expanded', state.draftSettingsOpen ? 'true' : 'false');
    persistState();
  }

  function updateVoiceComposer() {
    function applyVoiceUi(statusLineId, timerId, hintId, recordBtnId, resetBtnId, sendBtnId) {
      const statusLine = document.getElementById(statusLineId);
      const timer = document.getElementById(timerId);
      const hint = document.getElementById(hintId);
      const recordBtn = document.getElementById(recordBtnId);
      const resetBtn = document.getElementById(resetBtnId);
      const sendBtn = document.getElementById(sendBtnId);
      if (statusLine) {
        if (state.voiceDraftState === 'recording') statusLine.textContent = 'Recording in progress';
        else if (state.voiceDraftState === 'paused' && state.voiceDraftReady) statusLine.textContent = 'Recording paused';
        else statusLine.textContent = 'Ready to record';
      }
      if (timer) timer.textContent = formatDuration(state.voiceDraftDurationMs);
      if (hint) {
        hint.textContent = state.voiceDraftReady
          ? 'Recording is ready to send.'
          : 'Tap Record to start a draft. Settings ⚙ contains merge policy.';
      }
      if (recordBtn) {
        recordBtn.textContent = state.voiceDraftState === 'recording' ? 'Pause' : 'Record';
        recordBtn.className = state.voiceDraftState === 'recording' ? 'cfw-btn cfw-btn-primary' : 'cfw-btn cfw-btn-outline';
        recordBtn.disabled = state.creating;
      }
      if (resetBtn) resetBtn.disabled = state.creating || (!state.voiceDraftReady && state.voiceDraftState === 'idle');
      if (sendBtn) sendBtn.disabled = state.creating || state.voiceDraftState === 'recording' || !state.voiceDraftReady;
    }
    applyVoiceUi('cfw-voice-status-line', 'cfw-voice-timer', 'cfw-voice-hint', 'cfw-voice-record', 'cfw-voice-reset', 'cfw-voice-send');
    applyVoiceUi('cfw-mv-vstatus-line', 'cfw-mv-vtimer', 'cfw-mv-vhint', 'cfw-mv-vrecord', 'cfw-mv-vreset', 'cfw-mv-vsend');
  }

  async function toggleVoiceRecording() {
    setCreateError('');
    try {
      const recorder = await getVoiceRecorder();
      if (state.voiceDraftState === 'recording') {
        await recorder.pause();
        state.voiceDraftState = 'paused';
        state.voiceDraftReady = recorder.hasContent();
        stopVoiceDraftTimer();
      } else {
        await recorder.start();
        state.voiceDraftState = 'recording';
        state.voiceDraftReady = recorder.hasContent();
        startVoiceDraftTimer();
      }
      updateVoiceComposer();
      persistState();
    } catch (err) {
      setCreateError((err && err.message) ? err.message : 'Failed to access microphone');
    }
  }

  async function resetVoiceDraft() {
    stopVoiceDraftTimer();
    if (voiceRecorder) {
      await voiceRecorder.reset();
      voiceRecorder = null;
    }
    state.voiceDraftState = 'idle';
    state.voiceDraftReady = false;
    state.voiceDraftDurationMs = 0;
    setCreateError('');
    updateVoiceComposer();
    persistState();
  }

  async function sendVoiceDraft() {
    if (!state.voiceDraftReady) return;
    try {
      const recorder = await getVoiceRecorder();
      const blob = await recorder.exportRecording();
      if (!blob || blob.size < 1) {
        setCreateError('No recorded audio available yet.');
        return;
      }
      const token = requireAdminToken();
      if (!token) return;

      setCreateError('');
      setCreateLoading(true);
      const formData = new FormData();
      formData.append('audio', blob, 'voice-request.webm');
      formData.append('mimeType', blob.type || 'audio/webm');
      formData.append('durationMs', String(state.voiceDraftDurationMs || 0));
      formData.append('url', window.location.href);
      formData.append('userAgent', navigator.userAgent);
      formData.append('mergePolicy', state.draftMergePolicy || 'manual');
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'x-admin-token': token,
        },
        body: formData,
      });
      const voiceData = await readApiPayload(response, 'Failed to create voice request');
      state.lastSubmissionId = (voiceData && typeof voiceData.submissionId === 'string') ? voiceData.submissionId : null;
      await resetVoiceDraft();
      if (isMobile()) {
        setVoiceCreateSuccess(true);
        void loadIssues(true);
      } else {
        showToast('Voice request queued.', '');
        await loadIssues(true);
        setTab('requests');
      }
    } catch (err) {
      const msg = (err && err.message) ? err.message : 'Failed to prepare recording';
      setCreateError(msg);
      const mve = document.getElementById('cfw-mv-verror');
      if (mve) { mve.textContent = msg; mve.classList.add('active'); }
    } finally {
      setCreateLoading(false);
    }
  }

  function setTab(tab) {
    state.activeTab = tab;
    const tabNew = document.getElementById('cfw-tab-new');
    const tabRequests = document.getElementById('cfw-tab-requests');
    const viewNew = document.getElementById('cfw-view-new');
    const viewRequests = document.getElementById('cfw-view-requests');
    if (tabNew) tabNew.classList.toggle('active', tab === 'new');
    if (tabRequests) tabRequests.classList.toggle('active', tab === 'requests');
    if (viewNew) viewNew.classList.toggle('active', tab === 'new');
    if (viewRequests) viewRequests.classList.toggle('active', tab === 'requests');
    persistState();
  }

  function updateTokenIndicators() {
    const hasToken = !!readAdminToken();
    const launcher = document.getElementById('cfw-feedback-launcher');
    if (launcher) launcher.classList.toggle('needs-token', !hasToken);

    const clearBtn = document.getElementById('cfw-token-clear');
    if (clearBtn) clearBtn.disabled = !hasToken;
  }

  function setCreateError(message) {
    state.createError = message || '';
    ['cfw-new-error', 'cfw-m-error'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!state.createError) {
        el.classList.remove('active');
        el.textContent = '';
      } else {
        el.textContent = state.createError;
        el.classList.add('active');
      }
    });
    persistState();
  }

  function setListError(message) {
    state.listError = message || '';
    const el = document.getElementById('cfw-issues-error');
    if (!el) {
      persistState();
      return;
    }
    if (!state.listError) {
      el.classList.remove('active');
      el.textContent = '';
      persistState();
      return;
    }
    el.textContent = state.listError;
    el.classList.add('active');
    persistState();
  }

  function setExecuteError(message) {
    state.executeError = message || '';
    const el = document.getElementById('cfw-execute-error');
    if (!el) {
      persistState();
      return;
    }
    if (!state.executeError) {
      el.classList.remove('active');
      el.textContent = '';
      persistState();
      return;
    }
    el.textContent = state.executeError;
    el.classList.add('active');
    persistState();
  }

  function showToast(text, link) {
    state.toastText = text || '';
    state.toastLink = link || '';

    const el = document.getElementById('cfw-toast');
    if (!el) {
      persistState();
      return;
    }

    if (!state.toastText) {
      el.classList.remove('active');
      el.innerHTML = '';
      persistState();
      return;
    }

    el.innerHTML = state.toastText;
    if (state.toastLink) {
      el.innerHTML += ' <a href="' + state.toastLink + '" target="_blank" rel="noopener noreferrer">Open issue</a>';
    }
    el.classList.add('active');

    if (state.toastTimer) {
      window.clearTimeout(state.toastTimer);
      state.toastTimer = null;
    }
    state.toastTimer = window.setTimeout(() => {
      state.toastTimer = null;
      state.toastText = '';
      state.toastLink = '';
      showToast('', '');
    }, 4000);

    persistState();
  }

  function setCreateLoading(loading) {
    state.creating = loading;
    const a = document.getElementById('cfw-create-only');
    const b = document.getElementById('cfw-create-execute');
    if (a) a.disabled = loading;
    if (b) b.disabled = loading;
    if (b) b.textContent = loading ? 'Saving...' : 'Create & Execute';
    const ma = document.getElementById('cfw-m-create-only');
    const mb = document.getElementById('cfw-m-create-execute');
    if (ma) ma.disabled = loading;
    if (mb) mb.disabled = loading;
    if (mb) mb.textContent = loading ? 'Saving...' : 'Create & Execute';
    updateVoiceComposer();
  }

  function setIssuesLoading(loading) {
    state.loadingIssues = loading;
    const btn = document.getElementById('cfw-refresh-issues');
    if (btn) { btn.disabled = loading; btn.textContent = loading ? 'Loading...' : 'Refresh'; }
    const mbtn = document.getElementById('cfw-ml-refresh-btn');
    if (mbtn) { mbtn.disabled = loading; mbtn.textContent = loading ? '…' : '↻'; }
  }

  function closeTokenMenu() {
    const menu = document.getElementById('cfw-token-menu');
    if (menu) menu.classList.remove('active');
  }

  function toggleTokenMenu() {
    const menu = document.getElementById('cfw-token-menu');
    if (!menu) return;
    menu.classList.toggle('active');
  }

  function closePanel() {
    state.panelOpen = false;
    const panelEl = document.getElementById('cfw-feedback-panel');
    const overlay = document.getElementById('cfw-feedback-overlay');
    if (panelEl) panelEl.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    closeTokenMenu();
    persistState();
  }

  function openPanel() {
    if (!requireAdminToken()) return;
    state.panelOpen = true;
    const panelEl = document.getElementById('cfw-feedback-panel');
    const overlay = document.getElementById('cfw-feedback-overlay');
    if (panelEl) panelEl.classList.add('active');
    if (overlay) overlay.classList.add('active');

    const titleEl = document.getElementById('cfw-title');
    const descriptionEl = document.getElementById('cfw-description');
    ensureDefaultDraftDescription();
    if (titleEl) titleEl.value = state.draftTitle;
    if (descriptionEl) descriptionEl.value = state.draftDescription;
    updateCaptureModeUi();
    setDraftSettingsOpen(state.draftSettingsOpen);
    updateVoiceComposer();

    if (state.issuesLoaded && state.issues.length > 0) setTab('requests');
    else setTab(state.activeTab);

    renderIssues();
    loadIssues(false);
    persistState();
  }

  async function loadIssues(force) {
    if (state.loadingIssues) return;
    if (!force && state.issuesLoaded) return;

    const token = readAdminToken();
    if (!token) return;

    setListError('');
    setIssuesLoading(true);
    const abortCtrl = new AbortController();
    const abortTimer = window.setTimeout(() => abortCtrl.abort(), 15000);
    try {
      const params = new URLSearchParams();
      params.set('limit', '50');
      params.set('view', state.listView);
      params.set('sort', state.listSort);
      if (state.listQuery) params.set('q', state.listQuery);
      if (Array.isArray(state.listStatusFilter) && state.listStatusFilter.length) {
        params.set('status', state.listStatusFilter.join(','));
      }
      const url = config.issuesEndpoint + '?' + params.toString();
      console.log('[cfw] loadIssues fetch', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'x-admin-token': token },
        signal: abortCtrl.signal,
      });
      console.log('[cfw] loadIssues response', response.status);
      const data = await readApiPayload(response, 'Failed to load issues');
      state.issues = Array.isArray(data.issues) ? data.issues : [];
      state.issuesLoaded = true;
      renderIssues();
      if (!force) {
        if (state.issues.length > 0) setTab('requests');
        else setTab('new');
      }
      persistState();
    } catch (err) {
      const msg = (err && err.message) ? err.message : 'Failed to load issues';
      console.error('[cfw] loadIssues error', msg);
      setListError(msg);
    } finally {
      clearTimeout(abortTimer);
      setIssuesLoading(false);
    }
  }

  function toggleStatusFilter(status) {
    const next = Array.isArray(state.listStatusFilter) ? state.listStatusFilter.slice() : [];
    const idx = next.indexOf(status);
    if (idx >= 0) next.splice(idx, 1);
    else next.push(status);
    state.listStatusFilter = next;
    persistState();
    updateListControls();
    void loadIssues(true);
  }

  function clearListFilters() {
    state.listView = 'active';
    state.listQuery = '';
    state.listStatusFilter = [];
    persistState();
    updateListControls();
    void loadIssues(true);
  }

  function updateListControls() {
    const viewEl = document.getElementById('cfw-requests-view');
    const sortEl = document.getElementById('cfw-requests-sort');
    const searchEl = document.getElementById('cfw-requests-search');
    if (viewEl) viewEl.value = state.listView;
    if (sortEl) sortEl.value = state.listSort;
    if (searchEl) searchEl.value = state.listQuery;

    const statuses = ['new', 'queued', 'pr_draft', 'pr_open', 'pr_closed_unmerged', 'pr_merge_requested', 'merged', 'closed_unmerged'];
    statuses.forEach((status) => {
      const chip = document.getElementById('cfw-chip-' + status);
      if (!chip) return;
      chip.classList.toggle('active', state.listStatusFilter.includes(status));
    });
  }

  function getActionSet(issue) {
    const issueActions = Array.isArray(issue.issueActions) ? issue.issueActions : [];
    const prActions = Array.isArray(issue.pullRequestActions) ? issue.pullRequestActions : [];
    return { issueActions, prActions };
  }

  function getAgentWorkLabel(pullRequest) {
    if (!pullRequest || typeof pullRequest !== 'object') return '';
    const stateValue = String(pullRequest.agentWorkState || '').toLowerCase();
    if (stateValue === 'working') return 'Copilot: Working';
    if (stateValue === 'finished') return 'Copilot: Finished';
    return '';
  }

  function renderEntityActions(issue, target, actions) {
    const wrap = document.createElement('div');
    wrap.className = 'cfw-row-actions';

    actions.forEach((action) => {
      const id = String(action && action.id || '');
      const label = String(action && action.label || id || 'Action');
      const isDisabled = Boolean(action && action.disabled);
      const disabledReason = String(action && action.reason || '');
      if (!id) return;

      const actionWrap = document.createElement('div');
      actionWrap.className = 'cfw-action-wrap';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = isDisabled ? 'cfw-btn cfw-btn-outline cfw-btn-disabled' : 'cfw-btn cfw-btn-outline';
      btn.textContent = label;
      // Disabled actions remain visually discoverable but don't trigger actions
      btn.disabled = isDisabled || state.executingIssue === issue.number;
      if (!isDisabled) {
        btn.onclick = () => applyAction(issue.number, target, id);
      }
      actionWrap.appendChild(btn);

      // Show disabled reason if provided
      if (isDisabled && disabledReason) {
        const reasonEl = document.createElement('span');
        reasonEl.className = 'cfw-action-reason';
        reasonEl.textContent = disabledReason;
        actionWrap.appendChild(reasonEl);
      }

      wrap.appendChild(actionWrap);
    });
    return wrap;
  }

  function renderIssues() {
    const table = document.getElementById('cfw-issues-table');
    const cards = document.getElementById('cfw-issues-cards');
    const empty = document.getElementById('cfw-issues-empty');
    const body = document.getElementById('cfw-issues-body');
    if (!table || !empty || !body || !cards) return;

    body.innerHTML = '';
    cards.innerHTML = '';

    if (!state.issues.length) {
      table.style.display = 'none';
      cards.style.display = 'none';
      empty.style.display = 'block';
      persistState();
      return;
    }

    empty.style.display = 'none';
    table.style.display = 'table';
    cards.style.display = '';

    state.issues.forEach((issue) => {
      const labels = Array.isArray(issue.labels) ? issue.labels : [];

      const tr = document.createElement('tr');

      const numberTd = document.createElement('td');
      numberTd.textContent = '#' + issue.number;

      const titleTd = document.createElement('td');
      const titleLink = document.createElement('a');
      titleLink.href = issue.url;
      titleLink.target = '_blank';
      titleLink.rel = 'noopener noreferrer';
      titleLink.className = 'cfw-link';
      titleLink.textContent = issue.title;
      titleTd.appendChild(titleLink);

      const stateTd = document.createElement('td');
      stateTd.textContent = issue.status || issue.state;
      if (issue.statusDetail) {
        const detail = document.createElement('div');
        detail.className = 'muted';
        detail.textContent = String(issue.statusDetail);
        stateTd.appendChild(detail);
      }

      const prTd = document.createElement('td');
      if (!issue.pullRequest || !issue.pullRequest.url) {
        prTd.textContent = '-';
      } else {
        const prLink = document.createElement('a');
        prLink.href = issue.pullRequest.url;
        prLink.target = '_blank';
        prLink.rel = 'noopener noreferrer';
        prLink.className = 'cfw-link';
        prLink.textContent = '#' + issue.pullRequest.number + ' · ' + String(issue.pullRequest.state || '').toLowerCase();
        prTd.appendChild(prLink);
        const prAgentLabel = getAgentWorkLabel(issue.pullRequest);
        if (prAgentLabel) {
          const meta = document.createElement('div');
          meta.className = 'muted';
          meta.textContent = prAgentLabel;
          prTd.appendChild(meta);
        }
      }

      const labelsTd = document.createElement('td');
      if (!labels.length) {
        labelsTd.textContent = '-';
      } else {
        labels.forEach((label) => {
          const chip = document.createElement('span');
          chip.className = 'cfw-badge';
          chip.textContent = label;
          labelsTd.appendChild(chip);
        });
      }

      const policyTd = document.createElement('td');
      const policyBadge = document.createElement('span');
      policyBadge.className = 'cfw-badge';
      policyBadge.textContent = issue.mergePolicy === 'auto_unblocked' ? 'Policy: Auto' : 'Policy: Manual';
      policyTd.appendChild(policyBadge);

      const { issueActions, prActions } = getActionSet(issue);

      const actionsTd = document.createElement('td');
      actionsTd.appendChild(renderEntityActions(issue, 'issue', issueActions));

      tr.appendChild(numberTd);
      tr.appendChild(titleTd);
      tr.appendChild(stateTd);
      tr.appendChild(prTd);
      tr.appendChild(labelsTd);
      tr.appendChild(policyTd);
      tr.appendChild(actionsTd);
      body.appendChild(tr);

      if (issue.pullRequest && issue.pullRequest.url) {
        const prTr = document.createElement('tr');
        prTr.className = 'cfw-sub-row';

        const spacerTd = document.createElement('td');
        spacerTd.textContent = '';

        const prTitleTd = document.createElement('td');
        const prWrap = document.createElement('div');
        prWrap.className = 'cfw-sub-item';
        prWrap.innerHTML = '<strong>PR</strong>';
        const prLink = document.createElement('a');
        prLink.href = issue.pullRequest.url;
        prLink.target = '_blank';
        prLink.rel = 'noopener noreferrer';
        prLink.className = 'cfw-link';
        prLink.textContent = '#' + issue.pullRequest.number;
        prWrap.appendChild(prLink);
        prTitleTd.appendChild(prWrap);

        const prStateTd = document.createElement('td');
        const prStateText = String(issue.pullRequest.state || '').toLowerCase() + (issue.pullRequest.isDraft ? ' · draft' : '');
        const prStatusDetail = typeof issue.pullRequest.statusDetail === 'string' ? issue.pullRequest.statusDetail : '';
        const prAgentLabel = getAgentWorkLabel(issue.pullRequest);
        prStateTd.textContent = prStateText
          + (prStatusDetail ? ' · ' + prStatusDetail : '')
          + (prAgentLabel ? ' · ' + prAgentLabel : '');

        const prColTd = document.createElement('td');
        prColTd.textContent = '-';

        const prLabelsTd = document.createElement('td');
        prLabelsTd.textContent = '-';

        const prActionsTd = document.createElement('td');
        prActionsTd.appendChild(renderEntityActions(issue, 'pull_request', prActions));

        prTr.appendChild(spacerTd);
        prTr.appendChild(prTitleTd);
        prTr.appendChild(prStateTd);
        prTr.appendChild(prColTd);
        prTr.appendChild(prLabelsTd);
        prTr.appendChild(prActionsTd);
        body.appendChild(prTr);
      }

      const card = document.createElement('article');
      card.className = 'cfw-issue-card';

      const cardHead = document.createElement('div');
      cardHead.className = 'cfw-issue-card-head';
      const statusText = issue.status || issue.state;
      const cardStatusDetail = typeof issue.statusDetail === 'string' ? issue.statusDetail : '';
      // Show status + detail in header to avoid duplication
      cardHead.innerHTML = '<strong>#' + issue.number + '</strong><span>' + statusText + (cardStatusDetail ? ' · ' + cardStatusDetail : '') + '</span>';

      const cardTitle = document.createElement('a');
      cardTitle.className = 'cfw-issue-card-title';
      cardTitle.href = issue.url;
      cardTitle.target = '_blank';
      cardTitle.rel = 'noopener noreferrer';
      cardTitle.textContent = issue.title;

      const cardMeta = document.createElement('div');
      cardMeta.className = 'cfw-issue-card-meta';
      if (issue.pullRequest && issue.pullRequest.url) {
        cardMeta.innerHTML = '<a class="cfw-link" href="' + issue.pullRequest.url + '" target="_blank" rel="noopener noreferrer">PR #' + issue.pullRequest.number + ' · ' + String(issue.pullRequest.state || '').toLowerCase() + '</a>';
      } else {
        cardMeta.textContent = labels.length ? '' : 'No labels';
      }
      const cardAgentLabel = getAgentWorkLabel(issue.pullRequest);
      if (cardAgentLabel) {
        const agentChip = document.createElement('span');
        agentChip.className = 'cfw-badge';
        agentChip.textContent = cardAgentLabel;
        cardMeta.appendChild(agentChip);
      }
      labels.forEach((label) => {
        const chip = document.createElement('span');
        chip.className = 'cfw-badge';
        chip.textContent = label;
        cardMeta.appendChild(chip);
      });
      const policyChip = document.createElement('span');
      policyChip.className = 'cfw-badge';
      policyChip.textContent = issue.mergePolicy === 'auto_unblocked' ? 'Policy: Auto' : 'Policy: Manual';
      cardMeta.appendChild(policyChip);

      const cardActions = renderEntityActions(issue, 'issue', issueActions);

      card.appendChild(cardHead);
      card.appendChild(cardTitle);
      card.appendChild(cardMeta);
      card.appendChild(cardActions);
      if (issue.pullRequest && issue.pullRequest.url) {
        const prMeta = document.createElement('div');
        prMeta.className = 'cfw-issue-card-meta';
        const prStateText = String(issue.pullRequest.state || '').toLowerCase() + (issue.pullRequest.isDraft ? ' · draft' : '');
        const prStatusDetail = typeof issue.pullRequest.statusDetail === 'string' ? issue.pullRequest.statusDetail : '';
        const prAgentLabel = getAgentWorkLabel(issue.pullRequest);
        prMeta.innerHTML = 'PR: <a class="cfw-link" href="' + issue.pullRequest.url + '" target="_blank" rel="noopener noreferrer">#' + issue.pullRequest.number + '</a>'
          + (prStateText ? ' · ' + prStateText : '')
          + (prStatusDetail ? ' · ' + prStatusDetail : '')
          + (prAgentLabel ? ' · ' + prAgentLabel : '');
        card.appendChild(prMeta);
        card.appendChild(renderEntityActions(issue, 'pull_request', prActions));
      }
      cards.appendChild(card);
    });

    persistState();
    renderMobileIssues();
  }

  function getIssueUrlFromCreateResponse(data) {
    if (data && data.issue && typeof data.issue.url === 'string') return data.issue.url;
    if (data && typeof data.url === 'string') return data.url;
    return '';
  }

  async function waitForCreatedIssueUrl(title) {
    const normalizedTitle = String(title || '').trim().toLowerCase();
    if (!normalizedTitle) return '';

    for (let attempt = 0; attempt < 8; attempt += 1) {
      if (attempt > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, 1500));
      }
      await loadIssues(true);
      const match = state.issues.find((issue) => String(issue.title || '').trim().toLowerCase() === normalizedTitle);
      if (match && typeof match.url === 'string') {
        return match.url;
      }
    }
    return '';
  }

  async function createRequest(execute) {
    if (state.creating) return;
    const token = requireAdminToken();
    if (!token) return;

    const titleEl = document.getElementById(isMobile() ? 'cfw-m-title' : 'cfw-title');
    const descriptionEl = document.getElementById(isMobile() ? 'cfw-m-description' : 'cfw-description');
    const policyEl = document.getElementById('cfw-merge-policy');
    const title = titleEl ? String(titleEl.value || '').trim() : '';
    const description = descriptionEl ? String(descriptionEl.value || '').trim() : '';

    state.draftTitle = title;
    state.draftDescription = description;
    persistState();

    if (!title) {
      setCreateError('Please provide title.');
      return;
    }

    setCreateError('');
    setCreateLoading(true);

    const labels = execute ? ['agent-execute'] : [];
    const mergePolicy = state.draftMergePolicy || 'manual';

    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({
          title,
          description,
          url: window.location.href,
          userAgent: navigator.userAgent,
          labels,
          mergePolicy: mergePolicy === 'auto_unblocked' ? 'auto_unblocked' : undefined,
          execute,
        }),
      });
      const data = await readApiPayload(response, 'Failed to create request');
      state.lastSubmissionId = (data && typeof data.submissionId === 'string') ? data.submissionId : null;
      const issueUrl = getIssueUrlFromCreateResponse(data);

      state.draftTitle = '';
      state.draftDescription = '';
      if (titleEl) titleEl.value = '';
      if (descriptionEl) descriptionEl.value = '';
      const mTitle = document.getElementById('cfw-m-title');
      const mDesc = document.getElementById('cfw-m-description');
      if (mTitle) mTitle.value = '';
      if (mDesc) mDesc.value = '';

      if (isMobile()) {
        setTextCreateSuccess(true);
        void loadIssues(true);
      } else {
        showToast(execute ? 'Request queued for execution.' : 'Request queued.', issueUrl);
        await loadIssues(true);
        setTab('requests');
        if (!issueUrl) {
          void waitForCreatedIssueUrl(title).then((resolvedUrl) => {
            if (!resolvedUrl) return;
            showToast(execute ? 'Request queued for execution.' : 'Request queued.', resolvedUrl);
          });
        }
      }
      persistState();
    } catch (err) {
      setCreateError((err && err.message) ? err.message : 'Failed to create request');
    } finally {
      setCreateLoading(false);
    }
  }

  async function applyAction(issueNumber, target, action) {
    const token = requireAdminToken();
    if (!token) return;

    setExecuteError('');
    state.executingIssue = issueNumber;
    renderIssues();
    try {
      const response = await fetch(config.actionEndpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ issueNumber, target, action }),
      });
      const data = await readApiPayload(response, 'Failed to apply action');
      const pullRequestUrl = (data && data.pullRequest && typeof data.pullRequest.url === 'string')
        ? data.pullRequest.url
        : '';
      let toastText = 'Action applied: ' + action.replaceAll('_', ' ');
      if (target === 'pull_request' && action === 'merge') {
        toastText = 'Merge requested. It will merge automatically when GitHub rules/checks are satisfied.';
      } else if (target === 'pull_request' && action === 'cancel_merge') {
        toastText = 'Merge request canceled.';
      } else if (target === 'issue' && action === 'hold') {
        toastText = 'Auto-processing paused. Issue switched to manual policy.';
      }
      showToast(toastText, pullRequestUrl);
      await loadIssues(true);
    } catch (err) {
      const errorMessage = mapActionError((err && err.message) ? err.message : '');
      setExecuteError(errorMessage || 'Failed to apply action');
    } finally {
      state.executingIssue = null;
      renderIssues();
    }
  }

  function submit(data) {
    const token = data.adminToken || requireAdminToken();
    if (!token) throw new Error('Admin token required');
    if (!data.title || !data.description) throw new Error('Title and description are required');

    return fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-admin-token': token,
      },
      body: JSON.stringify({
        ...data,
        url: data.url || window.location.href,
        userAgent: navigator.userAgent,
        labels: data.labels || parseLabels(),
      }),
    });
  }

  function createWidgetShell() {
    const root = document.createElement('div');
    root.id = 'cfw-feedback-widget';

    const launcher = document.createElement('button');
    launcher.id = 'cfw-feedback-launcher';
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Open change request panel');
    launcher.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z" /></svg>';
    launcher.onclick = openPanel;

    root.appendChild(launcher);

    const overlay = document.createElement('div');
    overlay.id = 'cfw-feedback-overlay';
    overlay.onclick = closePanel;

    const panel = document.createElement('aside');
    panel.id = 'cfw-feedback-panel';
    panel.innerHTML =
      '<div id="cfw-feedback-header">'
      + '<div id="cfw-feedback-title">Change Requests</div>'
      + '<div id="cfw-feedback-header-actions">'
      + '<button id="cfw-token-menu-btn" type="button" aria-label="Open token actions">...</button>'
      + '<div id="cfw-token-menu">'
      + '<button id="cfw-token-update" type="button">Update token</button>'
      + '<button id="cfw-token-clear" type="button">Clear token</button>'
      + '</div>'
      + '<button id="cfw-panel-close" type="button" aria-label="Close panel">✕</button>'
      + '</div>'
      + '</div>'
      + '<div id="cfw-tabs">'
      + '<button id="cfw-tab-new" type="button">New request</button>'
      + '<button id="cfw-tab-requests" type="button">Requests</button>'
      + '</div>'
      + '<div id="cfw-panel-body">'
      + '<section id="cfw-view-new">'
      + '<div class="cfw-capture-modes">'
      + '<button id="cfw-mode-voice" type="button">Voice</button>'
      + '<button id="cfw-mode-text" type="button">Type</button>'
      + '</div>'
      + '<div id="cfw-pane-voice" class="cfw-capture-pane">'
      + '<div class="cfw-voice-shell">'
      + '<div class="cfw-settings-row">'
      + '<p class="cfw-muted-note">Current URL is attached automatically to the issue payload.</p>'
      + '<button id="cfw-draft-settings-toggle" type="button" class="cfw-btn cfw-btn-outline cfw-settings-toggle" aria-expanded="false" aria-controls="cfw-draft-settings">⚙</button>'
      + '</div>'
      + '<div id="cfw-draft-settings" class="cfw-settings-panel">'
      + '<label class="cfw-label" for="cfw-merge-policy">Merge policy</label>'
      + '<select id="cfw-merge-policy" class="cfw-select">'
      + '<option value="manual">Manual merge</option>'
      + '<option value="auto_unblocked">Auto-merge when unblocked</option>'
      + '</select>'
      + '</div>'
      + '<div class="cfw-voice-status">'
      + '<div id="cfw-voice-status-line" class="cfw-voice-status-line">Ready to record</div>'
      + '<div class="cfw-voice-meta"><span>Draft recording</span><strong id="cfw-voice-timer">00:00</strong></div>'
      + '</div>'
      + '<div class="cfw-voice-controls">'
      + '<button id="cfw-voice-record" type="button" class="cfw-btn cfw-btn-outline">Record</button>'
      + '<button id="cfw-voice-reset" type="button" class="cfw-btn cfw-btn-danger" disabled>Reset</button>'
      + '<button id="cfw-voice-send" type="button" class="cfw-btn cfw-btn-primary" disabled>Send</button>'
      + '</div>'
      + '<div id="cfw-voice-hint" class="cfw-voice-hint">Tap Record to start a draft. Settings contains merge policy.</div>'
      + '</div>'
      + '</div>'
      + '<div id="cfw-pane-text" class="cfw-capture-pane">'
      + '<input id="cfw-title" type="text" placeholder="Title" maxlength="500" />'
      + '<textarea id="cfw-description" placeholder="Describe the requested change..." maxlength="5000"></textarea>'
      + '<div class="cfw-field-group">'
      + '<label class="cfw-label" for="cfw-text-merge-policy">Merge policy</label>'
      + '<select id="cfw-text-merge-policy" class="cfw-select">'
      + '<option value="manual">Manual merge</option>'
      + '<option value="auto_unblocked">Auto-merge when unblocked</option>'
      + '</select>'
      + '</div>'
      + '<p class="cfw-muted-note">Current URL is attached automatically to the issue payload.</p>'
      + '</div>'
      + '<div id="cfw-new-error" class="cfw-error"></div>'
      + '<div id="cfw-new-actions">'
      + '<button id="cfw-create-only" type="button" class="cfw-btn cfw-btn-outline">Create only</button>'
      + '<button id="cfw-create-execute" type="button" class="cfw-btn cfw-btn-primary">Create & Execute</button>'
      + '</div>'
      + '</section>'
      + '<section id="cfw-view-requests">'
      + '<div id="cfw-requests-head">'
      + '<h4>Recent requests</h4>'
      + '<button id="cfw-refresh-issues" type="button" class="cfw-btn cfw-btn-outline">Refresh</button>'
      + '</div>'
      + '<div id="cfw-requests-controls">'
      + '<div id="cfw-requests-controls-top">'
      + '<input id="cfw-requests-search" type="search" placeholder="Search title, #, labels, status, policy" />'
      + '<select id="cfw-requests-view">'
      + '<option value="active">Active</option>'
      + '<option value="needs_action">Needs action</option>'
      + '<option value="completed">Completed</option>'
      + '<option value="all">All</option>'
      + '</select>'
      + '<select id="cfw-requests-sort">'
      + '<option value="updated_desc">Newest</option>'
      + '<option value="updated_asc">Oldest</option>'
      + '</select>'
      + '<button id="cfw-clear-filters" type="button" class="cfw-btn cfw-btn-outline">Clear</button>'
      + '</div>'
      + '<div id="cfw-status-filters">'
      + '<button id="cfw-chip-new" type="button" class="cfw-chip">New</button>'
      + '<button id="cfw-chip-queued" type="button" class="cfw-chip">Queued</button>'
      + '<button id="cfw-chip-pr_draft" type="button" class="cfw-chip">PR draft</button>'
      + '<button id="cfw-chip-pr_open" type="button" class="cfw-chip">PR open</button>'
      + '<button id="cfw-chip-pr_closed_unmerged" type="button" class="cfw-chip">PR closed</button>'
      + '<button id="cfw-chip-pr_merge_requested" type="button" class="cfw-chip">Merge requested</button>'
      + '<button id="cfw-chip-merged" type="button" class="cfw-chip">Merged</button>'
      + '<button id="cfw-chip-closed_unmerged" type="button" class="cfw-chip">Closed</button>'
      + '</div>'
      + '</div>'
      + '<div id="cfw-issues-error" class="cfw-error"></div>'
      + '<div id="cfw-execute-error" class="cfw-error"></div>'
      + '<div id="cfw-issues-empty">No requests yet.</div>'
      + '<div id="cfw-issues-table-wrap">'
      + '<table id="cfw-issues-table" style="display:none">'
      + '<thead><tr><th>#</th><th>Title</th><th>Status</th><th>PR</th><th>Labels</th><th>Policy</th><th>Actions</th></tr></thead>'
      + '<tbody id="cfw-issues-body"></tbody>'
      + '</table>'
      + '</div>'
      + '<div id="cfw-issues-cards"></div>'
      + '</section>'
      + '</div>';

    const toast = document.createElement('div');
    toast.id = 'cfw-toast';

    document.body.appendChild(root);
    document.body.appendChild(overlay);
    document.body.appendChild(panel);
    document.body.appendChild(toast);

    const panelClose = document.getElementById('cfw-panel-close');
    if (panelClose) panelClose.onclick = closePanel;

    const tokenMenuBtn = document.getElementById('cfw-token-menu-btn');
    if (tokenMenuBtn) tokenMenuBtn.onclick = toggleTokenMenu;

    const tokenUpdate = document.getElementById('cfw-token-update');
    if (tokenUpdate) {
      tokenUpdate.onclick = () => {
        closeTokenMenu();
        promptAdminToken();
        void loadIssues(true);
      };
    }

    const tokenClear = document.getElementById('cfw-token-clear');
    if (tokenClear) {
      tokenClear.onclick = () => {
        closeTokenMenu();
        if (!window.confirm('Clear saved admin token?')) return;
        writeAdminToken('');
        updateTokenIndicators();
        closePanel();
      };
    }

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const menu = document.getElementById('cfw-token-menu');
      const btn = document.getElementById('cfw-token-menu-btn');
      if (!menu || !btn) return;
      if (menu.contains(target) || btn.contains(target)) return;
      closeTokenMenu();
    });

    const tabNew = document.getElementById('cfw-tab-new');
    if (tabNew) tabNew.onclick = () => {
      ensureDefaultDraftDescription();
      setTab('new');
    };

    const voiceModeBtn = document.getElementById('cfw-mode-voice');
    if (voiceModeBtn) voiceModeBtn.onclick = () => setCaptureMode('voice');

    const textModeBtn = document.getElementById('cfw-mode-text');
    if (textModeBtn) textModeBtn.onclick = () => setCaptureMode('text');

    const tabRequests = document.getElementById('cfw-tab-requests');
    if (tabRequests) {
      tabRequests.onclick = () => {
        setTab('requests');
        void loadIssues(false);
      };
    }

    const createOnly = document.getElementById('cfw-create-only');
    if (createOnly) createOnly.onclick = () => createRequest(false);

    const createExecute = document.getElementById('cfw-create-execute');
    if (createExecute) createExecute.onclick = () => createRequest(true);

    const draftSettingsToggle = document.getElementById('cfw-draft-settings-toggle');
    if (draftSettingsToggle) draftSettingsToggle.onclick = () => setDraftSettingsOpen(!state.draftSettingsOpen);

    const voiceRecord = document.getElementById('cfw-voice-record');
    if (voiceRecord) voiceRecord.onclick = () => toggleVoiceRecording();

    const voiceReset = document.getElementById('cfw-voice-reset');
    if (voiceReset) voiceReset.onclick = () => resetVoiceDraft();

    const voiceSend = document.getElementById('cfw-voice-send');
    if (voiceSend) voiceSend.onclick = () => sendVoiceDraft();

    const refresh = document.getElementById('cfw-refresh-issues');
    if (refresh) refresh.onclick = () => loadIssues(true);

    const clearFilters = document.getElementById('cfw-clear-filters');
    if (clearFilters) clearFilters.onclick = () => clearListFilters();

    const requestsView = document.getElementById('cfw-requests-view');
    if (requestsView) {
      requestsView.value = state.listView;
      requestsView.addEventListener('change', () => {
        state.listView = requestsView.value || 'active';
        persistState();
        void loadIssues(true);
      });
    }

    const requestsSort = document.getElementById('cfw-requests-sort');
    if (requestsSort) {
      requestsSort.value = state.listSort;
      requestsSort.addEventListener('change', () => {
        state.listSort = requestsSort.value || 'updated_desc';
        persistState();
        void loadIssues(true);
      });
    }

    const requestsSearch = document.getElementById('cfw-requests-search');
    if (requestsSearch) {
      requestsSearch.value = state.listQuery;
      requestsSearch.addEventListener('change', () => {
        state.listQuery = String(requestsSearch.value || '').trim();
        persistState();
        void loadIssues(true);
      });
    }

    ['new', 'queued', 'pr_draft', 'pr_open', 'pr_closed_unmerged', 'pr_merge_requested', 'merged', 'closed_unmerged'].forEach((status) => {
      const chip = document.getElementById('cfw-chip-' + status);
      if (!chip) return;
      chip.onclick = () => toggleStatusFilter(status);
    });

    const titleEl = document.getElementById('cfw-title');
    if (titleEl) {
      titleEl.value = state.draftTitle;
      titleEl.addEventListener('input', () => {
        state.draftTitle = String(titleEl.value || '');
        persistState();
      });
    }

    const descriptionEl = document.getElementById('cfw-description');
    if (descriptionEl) {
      if (!String(state.draftDescription || '').trim()) {
        state.draftDescription = buildDefaultDescription();
      }
      descriptionEl.value = state.draftDescription;
      descriptionEl.addEventListener('input', () => {
        state.draftDescription = String(descriptionEl.value || '');
        persistState();
      });
    }

    const policyEl = document.getElementById('cfw-merge-policy');
    if (policyEl) {
      policyEl.value = state.draftMergePolicy || 'manual';
      policyEl.addEventListener('change', () => {
        state.draftMergePolicy = String(policyEl.value || 'manual');
        const textPolicyEl = document.getElementById('cfw-text-merge-policy');
        if (textPolicyEl) textPolicyEl.value = state.draftMergePolicy;
        persistState();
      });
    }

    const textPolicyEl = document.getElementById('cfw-text-merge-policy');
    if (textPolicyEl) {
      textPolicyEl.value = state.draftMergePolicy || 'manual';
      textPolicyEl.addEventListener('change', () => {
        state.draftMergePolicy = String(textPolicyEl.value || 'manual');
        const voicePolicyEl = document.getElementById('cfw-merge-policy');
        if (voicePolicyEl) voicePolicyEl.value = state.draftMergePolicy;
        persistState();
      });
    }

    updateCaptureModeUi();
    setDraftSettingsOpen(state.draftSettingsOpen);
    updateVoiceComposer();
    setTab(state.activeTab);
    updateTokenIndicators();
    updateListControls();
    renderIssues();
    setCreateError(state.createError);
    setListError(state.listError);
    setExecuteError(state.executeError);
    if (state.toastText) showToast(state.toastText, state.toastLink);

    if (state.panelOpen && readAdminToken()) {
      openPanel();
    }
  }

  // ── Mobile-only functions ──────────────────────────────────────────────────

  function stopUndoCountdown(btnId) {
    if (undoTimerHandle !== null) {
      window.clearInterval(undoTimerHandle);
      undoTimerHandle = null;
    }
    if (btnId) {
      const btn = document.getElementById(btnId);
      if (btn) btn.style.display = 'none';
    }
  }

  function startUndoCountdown(btnId) {
    stopUndoCountdown(null);
    const btn = document.getElementById(btnId);
    if (!btn || !state.lastSubmissionId) return;
    let seconds = 10;
    btn.textContent = 'Undo (' + seconds + ')';
    btn.style.display = '';
    undoTimerHandle = window.setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        stopUndoCountdown(btnId);
      } else {
        const b = document.getElementById(btnId);
        if (b) b.textContent = 'Undo (' + seconds + ')';
      }
    }, 1000);
  }

  async function cancelSubmission(submissionId, onSuccess) {
    if (!submissionId) return;
    const token = readAdminToken();
    if (!token) return;
    try {
      await fetch(config.cancelEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ submissionId }),
      });
    } catch {
      // best-effort
    }
    state.lastSubmissionId = null;
    onSuccess();
  }

  function setTextCreateSuccess(val) {
    state.textCreateSuccess = Boolean(val);
    const form = document.getElementById('cfw-mv-text-form');
    const success = document.getElementById('cfw-mv-text-success');
    if (form) form.style.display = val ? 'none' : '';
    if (success) success.style.display = val ? '' : 'none';
    if (val) {
      startUndoCountdown('cfw-mv-text-undo');
    } else {
      stopUndoCountdown('cfw-mv-text-undo');
    }
  }

  function setVoiceCreateSuccess(val) {
    state.voiceCreateSuccess = Boolean(val);
    const form = document.getElementById('cfw-mv-voice-form');
    const success = document.getElementById('cfw-mv-voice-success');
    if (form) form.style.display = val ? 'none' : '';
    if (success) success.style.display = val ? '' : 'none';
    if (val) {
      startUndoCountdown('cfw-mv-voice-undo');
    } else {
      stopUndoCountdown('cfw-mv-voice-undo');
    }
  }

  function renderMobileIssues() {
    const body = document.getElementById('cfw-ml-body');
    if (!body) return;
    body.innerHTML = '';
    const token = readAdminToken();
    if (!state.issues.length) {
      const empty = document.createElement('div');
      empty.className = 'cfw-ml-empty';
      empty.textContent = !token
        ? 'Enter admin token in Settings ⚙ to view requests.'
        : state.loadingIssues ? 'Loading…'
        : state.listError ? state.listError
        : 'No requests yet.';
      body.appendChild(empty);
      return;
    }
    state.issues.forEach((issue) => {
      const row = document.createElement('div');
      row.className = 'cfw-ml-row';
      const left = document.createElement('div');
      left.className = 'cfw-ml-row-left';
      const num = document.createElement('div');
      num.className = 'cfw-ml-row-num';
      num.textContent = '#' + issue.number;
      const title = document.createElement('div');
      title.className = 'cfw-ml-row-title';
      title.textContent = issue.title;
      const meta = document.createElement('div');
      meta.className = 'cfw-ml-row-meta';
      if (issue.pullRequest && issue.pullRequest.url) {
        meta.textContent = 'PR #' + issue.pullRequest.number + ' · ' + String(issue.pullRequest.state || '').toLowerCase();
      } else {
        const labels = Array.isArray(issue.labels) ? issue.labels.filter((l) => !l.startsWith('agent-')) : [];
        meta.textContent = labels.slice(0, 2).join(', ') || '';
      }
      left.appendChild(num);
      left.appendChild(title);
      left.appendChild(meta);
      const statusEl = document.createElement('div');
      statusEl.className = 'cfw-ml-row-status';
      statusEl.textContent = issue.status || issue.state || '';
      row.appendChild(left);
      row.appendChild(statusEl);
      row.onclick = () => openMobileIssueSheet(issue);
      body.appendChild(row);
    });
  }

  function openMobileIssueSheet(issue) {
    state.mobileSheetIssueNumber = issue.number;
    const content = document.getElementById('cfw-mbs-content');
    if (!content) return;
    content.innerHTML = '';

    const num = document.createElement('div');
    num.className = 'cfw-is-num';
    num.textContent = '#' + issue.number;

    const titleLink = document.createElement('a');
    titleLink.className = 'cfw-is-title';
    titleLink.href = issue.url;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    titleLink.textContent = issue.title;

    const statusEl = document.createElement('div');
    statusEl.className = 'cfw-is-status';
    statusEl.textContent = (issue.status || issue.state || '') + (issue.statusDetail ? ' · ' + issue.statusDetail : '');

    const errorEl = document.createElement('div');
    errorEl.id = 'cfw-is-error';
    errorEl.className = 'cfw-is-error';

    content.appendChild(num);
    content.appendChild(titleLink);
    content.appendChild(statusEl);

    const labels = Array.isArray(issue.labels) ? issue.labels : [];
    if (labels.length) {
      const badges = document.createElement('div');
      badges.className = 'cfw-is-badges';
      labels.forEach((label) => {
        const b = document.createElement('span');
        b.className = 'cfw-badge';
        b.textContent = label;
        badges.appendChild(b);
      });
      content.appendChild(badges);
    }

    const { issueActions, prActions } = getActionSet(issue);

    if (issueActions.length) {
      const sec = document.createElement('div');
      sec.className = 'cfw-is-section';
      const lbl = document.createElement('div');
      lbl.className = 'cfw-is-section-label';
      lbl.textContent = 'Issue actions';
      const acts = document.createElement('div');
      acts.className = 'cfw-is-actions';
      issueActions.forEach((action) => {
        const wrap = document.createElement('div');
        const btn = document.createElement('button');
        btn.className = 'cfw-is-action-btn';
        btn.textContent = action.label || action.id;
        btn.disabled = Boolean(action.disabled);
        if (!action.disabled) {
          btn.onclick = () => applyMobileAction(issue.number, 'issue', action.id);
        }
        wrap.appendChild(btn);
        if (action.disabled && action.reason) {
          const r = document.createElement('span');
          r.className = 'cfw-is-action-reason';
          r.textContent = action.reason;
          wrap.appendChild(r);
        }
        acts.appendChild(wrap);
      });
      sec.appendChild(lbl);
      sec.appendChild(acts);
      content.appendChild(sec);
    }

    if (issue.pullRequest && issue.pullRequest.url) {
      const sec = document.createElement('div');
      sec.className = 'cfw-is-section';
      const lbl = document.createElement('div');
      lbl.className = 'cfw-is-section-label';
      lbl.textContent = 'Pull request';
      const prLink = document.createElement('a');
      prLink.className = 'cfw-is-pr-link';
      prLink.href = issue.pullRequest.url;
      prLink.target = '_blank';
      prLink.rel = 'noopener noreferrer';
      const prState = String(issue.pullRequest.state || '').toLowerCase() + (issue.pullRequest.isDraft ? ' · draft' : '');
      prLink.textContent = 'PR #' + issue.pullRequest.number + ' · ' + prState;
      sec.appendChild(lbl);
      sec.appendChild(prLink);
      if (prActions.length) {
        const acts = document.createElement('div');
        acts.className = 'cfw-is-actions';
        acts.style.marginTop = '10px';
        prActions.forEach((action) => {
          const wrap = document.createElement('div');
          const btn = document.createElement('button');
          btn.className = 'cfw-is-action-btn';
          btn.textContent = action.label || action.id;
          btn.disabled = Boolean(action.disabled);
          if (!action.disabled) {
            btn.onclick = () => applyMobileAction(issue.number, 'pull_request', action.id);
          }
          wrap.appendChild(btn);
          if (action.disabled && action.reason) {
            const r = document.createElement('span');
            r.className = 'cfw-is-action-reason';
            r.textContent = action.reason;
            wrap.appendChild(r);
          }
          acts.appendChild(wrap);
        });
        sec.appendChild(acts);
      }
      content.appendChild(sec);
    }

    content.appendChild(errorEl);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'cfw-mbs-close';
    closeBtn.textContent = 'Close';
    closeBtn.onclick = closeMobileSheet;
    content.appendChild(closeBtn);

    const overlay = document.getElementById('cfw-mbs-overlay');
    const sheet = document.getElementById('cfw-mbs');
    if (overlay) overlay.classList.add('active');
    if (sheet) sheet.classList.add('active');
  }

  async function applyMobileAction(issueNumber, target, actionId) {
    const errorEl = document.getElementById('cfw-is-error');
    if (errorEl) { errorEl.classList.remove('active'); errorEl.textContent = ''; }
    document.querySelectorAll('.cfw-is-action-btn').forEach((btn) => { btn.disabled = true; });
    try {
      await applyAction(issueNumber, target, actionId);
      closeMobileSheet();
      renderMobileIssues();
    } catch (err) {
      const msg = mapActionError((err && err.message) ? err.message : '');
      if (errorEl) { errorEl.textContent = msg || 'Failed to apply action'; errorEl.classList.add('active'); }
      document.querySelectorAll('.cfw-is-action-btn').forEach((btn) => { btn.disabled = false; });
    }
  }

  function closeMobileSheet() {
    const overlay = document.getElementById('cfw-mbs-overlay');
    const sheet = document.getElementById('cfw-mbs');
    if (overlay) overlay.classList.remove('active');
    if (sheet) sheet.classList.remove('active');
    state.mobileSheetIssueNumber = null;
    window.setTimeout(() => {
      const content = document.getElementById('cfw-mbs-content');
      if (content) content.innerHTML = '';
    }, 260);
  }

  function openMobileFilterSheet() {
    const content = document.getElementById('cfw-mbs-content');
    if (!content) return;
    content.innerHTML = '';

    function makeSection(labelText, inner) {
      const sec = document.createElement('div');
      sec.className = 'cfw-fs-section';
      const lbl = document.createElement('div');
      lbl.className = 'cfw-fs-label';
      lbl.textContent = labelText;
      sec.appendChild(lbl);
      sec.appendChild(inner);
      return sec;
    }

    const viewPills = document.createElement('div');
    viewPills.className = 'cfw-fs-pills';
    [['active', 'Active'], ['needs_action', 'Needs action'], ['completed', 'Completed'], ['all', 'All']].forEach(([val, label]) => {
      const btn = document.createElement('button');
      btn.className = 'cfw-fs-pill' + (state.listView === val ? ' active' : '');
      btn.textContent = label;
      btn.dataset.val = val;
      btn.onclick = () => {
        state.listView = val;
        viewPills.querySelectorAll('.cfw-fs-pill').forEach((b) => b.classList.toggle('active', b.dataset.val === val));
        persistState();
        void loadIssues(true).then(() => renderMobileIssues());
      };
      viewPills.appendChild(btn);
    });
    content.appendChild(makeSection('View', viewPills));

    const sortPills = document.createElement('div');
    sortPills.className = 'cfw-fs-pills';
    [['updated_desc', 'Newest'], ['updated_asc', 'Oldest']].forEach(([val, label]) => {
      const btn = document.createElement('button');
      btn.className = 'cfw-fs-pill' + (state.listSort === val ? ' active' : '');
      btn.textContent = label;
      btn.dataset.val = val;
      btn.onclick = () => {
        state.listSort = val;
        sortPills.querySelectorAll('.cfw-fs-pill').forEach((b) => b.classList.toggle('active', b.dataset.val === val));
        persistState();
        void loadIssues(true).then(() => renderMobileIssues());
      };
      sortPills.appendChild(btn);
    });
    content.appendChild(makeSection('Sort', sortPills));

    const chipsWrap = document.createElement('div');
    chipsWrap.className = 'cfw-fs-chips';
    [['new','New'],['queued','Queued'],['pr_draft','PR draft'],['pr_open','PR open'],['pr_closed_unmerged','PR closed'],['pr_merge_requested','Merge requested'],['merged','Merged'],['closed_unmerged','Closed']].forEach(([val, label]) => {
      const btn = document.createElement('button');
      btn.className = 'cfw-fs-chip' + (state.listStatusFilter.includes(val) ? ' active' : '');
      btn.textContent = label;
      btn.onclick = () => {
        toggleStatusFilter(val);
        btn.classList.toggle('active', state.listStatusFilter.includes(val));
        void loadIssues(true).then(() => renderMobileIssues());
      };
      chipsWrap.appendChild(btn);
    });
    content.appendChild(makeSection('Status', chipsWrap));

    const clearBtn = document.createElement('button');
    clearBtn.className = 'cfw-mbs-close';
    clearBtn.style.marginBottom = '8px';
    clearBtn.textContent = 'Clear filters';
    clearBtn.onclick = () => { clearListFilters(); closeMobileSheet(); void loadIssues(true).then(() => renderMobileIssues()); };
    content.appendChild(clearBtn);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'cfw-mbs-close';
    closeBtn.textContent = 'Done';
    closeBtn.onclick = closeMobileSheet;
    content.appendChild(closeBtn);

    const overlay = document.getElementById('cfw-mbs-overlay');
    const sheet = document.getElementById('cfw-mbs');
    if (overlay) overlay.classList.add('active');
    if (sheet) sheet.classList.add('active');
  }

  function updateMobileTokenStatus() {
    const el = document.getElementById('cfw-m-token-status');
    if (!el) return;
    const tok = readAdminToken();
    el.textContent = tok ? 'Token is set: ' + tok.slice(0, 3) + '\u2026' : 'No token set.';
  }

  function applyPolicyUi() {
    const isAuto = state.draftMergePolicy === 'auto_unblocked';
    const pm = document.getElementById('cfw-m-policy-manual');
    const pa = document.getElementById('cfw-m-policy-auto');
    const vm = document.getElementById('cfw-m-vpolicy-manual');
    const va = document.getElementById('cfw-m-vpolicy-auto');
    if (pm) pm.classList.toggle('active', !isAuto);
    if (pa) pa.classList.toggle('active', isAuto);
    if (vm) vm.classList.toggle('active', !isAuto);
    if (va) va.classList.toggle('active', isAuto);
  }

  function setMobileTab(tab) {
    state.activeTab = tab;
    ['text', 'voice', 'list', 'settings'].forEach((t) => {
      const view = document.getElementById('cfw-mv-' + t);
      const btn = document.getElementById('cfw-nav-' + t);
      if (view) view.classList.toggle('active', t === tab);
      if (btn) btn.classList.toggle('active', t === tab);
    });
    if (tab === 'list') {
      void loadIssues(false).then(() => renderMobileIssues());
      renderMobileIssues();
    }
    if (tab === 'text') {
      const t = document.getElementById('cfw-m-title');
      if (t) window.setTimeout(() => t.focus(), 50);
      applyPolicyUi();
    }
    persistState();
  }

  function createMobileShell() {
    const CHECK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>';
    const SUCCESS_SCREEN = (hint) =>
      '<div class="cfw-m-success-ring">' + CHECK_SVG + '</div><div class="cfw-m-success-hint">' + hint + '</div>';

    const root = document.createElement('div');
    root.id = 'cfw-mobile';

    const body = document.createElement('div');
    body.id = 'cfw-mobile-body';

    const mvText = document.createElement('div');
    mvText.id = 'cfw-mv-text';
    mvText.className = 'cfw-mv';
    mvText.innerHTML =
      '<div id="cfw-mv-text-form" class="cfw-mf">'
      + '<input id="cfw-m-title" type="text" placeholder="Title" maxlength="500" />'
      + '<textarea id="cfw-m-description" placeholder="Describe the requested change..." maxlength="5000"></textarea>'
      + '<div class="cfw-mf-policy"><label>Merge policy</label>'
      + '<div class="cfw-m-hand-toggle">'
      + '<button id="cfw-m-policy-manual" class="cfw-m-hand-btn" type="button">Manual</button>'
      + '<button id="cfw-m-policy-auto" class="cfw-m-hand-btn" type="button">Auto-merge</button>'
      + '</div></div>'
      + '<div id="cfw-m-error" class="cfw-mf-error"></div>'
      + '<div class="cfw-mf-actions">'
      + '<button id="cfw-m-clear" class="cfw-btn cfw-btn-outline" style="display:none">Clear</button>'
      + '<button id="cfw-m-create-only" class="cfw-btn cfw-btn-outline">Create</button>'
      + '<button id="cfw-m-create-execute" class="cfw-btn cfw-btn-primary">Create &amp; Execute</button>'
      + '</div>'
      + '</div>'
      + '<div id="cfw-mv-text-success" class="cfw-m-success" style="display:none">'
      + SUCCESS_SCREEN('Tap to submit another')
      + '<button id="cfw-mv-text-undo" class="cfw-m-undo-btn" style="display:none">Undo</button>'
      + '</div>';

    const mvVoice = document.createElement('div');
    mvVoice.id = 'cfw-mv-voice';
    mvVoice.className = 'cfw-mv';
    mvVoice.innerHTML =
      '<div id="cfw-mv-voice-form" class="cfw-m-voice">'
      + '<div class="cfw-m-vstatus">'
      + '<div id="cfw-mv-vstatus-line" class="cfw-m-vstatus-line">Ready to record</div>'
      + '<div class="cfw-m-vmeta"><span>Draft recording</span><strong id="cfw-mv-vtimer">00:00</strong></div>'
      + '</div>'
      + '<div class="cfw-m-vcontrols">'
      + '<button id="cfw-mv-vrecord" class="cfw-btn cfw-btn-outline">Record</button>'
      + '<button id="cfw-mv-vreset" class="cfw-btn cfw-btn-danger" disabled>Reset</button>'
      + '<button id="cfw-mv-vsend" class="cfw-btn cfw-btn-primary" disabled>Send</button>'
      + '</div>'
      + '<div id="cfw-mv-vhint" class="cfw-m-vhint">Tap Record to start. Settings ⚙ contains merge policy.</div>'
      + '<div id="cfw-mv-verror" class="cfw-m-verror"></div>'
      + '</div>'
      + '<div id="cfw-mv-voice-success" class="cfw-m-success" style="display:none">'
      + SUCCESS_SCREEN('Tap to record another')
      + '<button id="cfw-mv-voice-undo" class="cfw-m-undo-btn" style="display:none">Undo</button>'
      + '</div>';

    const mvList = document.createElement('div');
    mvList.id = 'cfw-mv-list';
    mvList.className = 'cfw-mv';
    mvList.innerHTML =
      '<div id="cfw-ml-head">'
      + '<span id="cfw-ml-head-title">Requests</span>'
      + '<div id="cfw-ml-head-actions">'
      + '<button id="cfw-ml-filter-btn">⊞ Filter</button>'
      + '<button id="cfw-ml-refresh-btn">↻</button>'
      + '</div>'
      + '</div>'
      + '<div id="cfw-ml-error" class="cfw-error"></div>'
      + '<div id="cfw-ml-ptr"></div>'
      + '<div id="cfw-ml-body"></div>';

    const mvSettings = document.createElement('div');
    mvSettings.id = 'cfw-mv-settings';
    mvSettings.className = 'cfw-mv';
    mvSettings.innerHTML =
      '<div class="cfw-m-settings">'
      + '<h3>Admin token</h3>'
      + '<div id="cfw-m-token-status" class="cfw-m-settings-token"></div>'
      + '<div class="cfw-m-hand-toggle">'
      + '<button id="cfw-m-token-update" class="cfw-m-hand-btn">Update</button>'
      + '<button id="cfw-m-token-clear" class="cfw-m-hand-btn">Clear</button>'
      + '</div>'
      + '<p class="cfw-m-settings-note">Token authenticates all widget actions.</p>'
      + '<h3>Merge policy</h3>'
      + '<div class="cfw-m-hand-toggle">'
      + '<button id="cfw-m-vpolicy-manual" class="cfw-m-hand-btn" type="button">Manual</button>'
      + '<button id="cfw-m-vpolicy-auto" class="cfw-m-hand-btn" type="button">Auto-merge</button>'
      + '</div>'
      + '<h3>Button side</h3>'
      + '<div class="cfw-m-hand-toggle">'
      + '<button id="cfw-m-hand-left" class="cfw-m-hand-btn">&#9664; Left</button>'
      + '<button id="cfw-m-hand-right" class="cfw-m-hand-btn">Right &#9654;</button>'
      + '</div>'
      + '<p class="cfw-m-settings-note">Or swipe the open button left or right.</p>'
      + '</div>';

    body.appendChild(mvText);
    body.appendChild(mvVoice);
    body.appendChild(mvList);
    body.appendChild(mvSettings);

    const CLOSE = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M12 5l-7 7 7 7"/></svg>';
    const PENCIL = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"/></svg>';
    const MIC = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 10a7 7 0 01-14 0M12 19v4M8 23h8"/></svg>';
    const LIST = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
    const GEAR = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>';

    const nav = document.createElement('nav');
    nav.id = 'cfw-mobile-nav';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'cfw-nav-btn';
    closeBtn.type = 'button';
    closeBtn.innerHTML = CLOSE + '<span>Close</span>';
    closeBtn.onclick = () => { root.style.display = 'none'; mobileLauncher.style.display = ''; };
    [['text', PENCIL, 'Text'], ['voice', MIC, 'Voice'], ['list', LIST, 'Requests'], ['settings', GEAR, 'Settings']].forEach(([tab, icon, label]) => {
      const btn = document.createElement('button');
      btn.id = 'cfw-nav-' + tab;
      btn.className = 'cfw-nav-btn';
      btn.type = 'button';
      btn.innerHTML = icon + '<span>' + label + '</span>';
      btn.onclick = () => setMobileTab(tab);
      nav.appendChild(btn);
    });

    function applyHandedness(side) {
      state.handedness = side;
      if (side === 'left') {
        mobileLauncher.style.left = '10px';
        mobileLauncher.style.right = '';
        swipeHint.style.left = '10px';
        swipeHint.style.right = '';
        nav.insertBefore(closeBtn, nav.firstChild);
      } else {
        mobileLauncher.style.right = '10px';
        mobileLauncher.style.left = '';
        swipeHint.style.right = '10px';
        swipeHint.style.left = '';
        nav.appendChild(closeBtn);
      }
      const hl = document.getElementById('cfw-m-hand-left');
      const hr = document.getElementById('cfw-m-hand-right');
      if (hl) hl.classList.toggle('active', side === 'left');
      if (hr) hr.classList.toggle('active', side === 'right');
    }

    root.appendChild(body);
    root.appendChild(nav);

    const overlay = document.createElement('div');
    overlay.id = 'cfw-mbs-overlay';
    overlay.onclick = closeMobileSheet;

    const sheet = document.createElement('div');
    sheet.id = 'cfw-mbs';
    sheet.innerHTML = '<div id="cfw-mbs-handle"></div><div id="cfw-mbs-content"></div>';

    const toast = document.createElement('div');
    toast.id = 'cfw-toast';

    const mobileLauncher = document.createElement('button');
    mobileLauncher.id = 'cfw-mobile-launcher';
    mobileLauncher.type = 'button';
    mobileLauncher.setAttribute('aria-label', 'Open feedback widget');
    mobileLauncher.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"/></svg>';
    let swipeStartX = 0;
    mobileLauncher.addEventListener('touchstart', (e) => {
      swipeStartX = e.touches[0].clientX;
    }, { passive: true });
    mobileLauncher.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - swipeStartX;
      if (Math.abs(dx) >= 40) {
        applyHandedness(dx < 0 ? 'left' : 'right');
        persistState();
        e.preventDefault();
        return;
      }
      mobileLauncher.style.display = 'none';
      root.style.display = 'flex';
    });
    mobileLauncher.onclick = () => {
      mobileLauncher.style.display = 'none';
      root.style.display = 'flex';
      if (!readAdminToken()) setMobileTab('settings');
    };

    const swipeHint = document.createElement('div');
    swipeHint.id = 'cfw-swipe-hint';
    swipeHint.textContent = '\u2190 swipe \u2192';

    document.body.appendChild(root);
    document.body.appendChild(overlay);
    document.body.appendChild(sheet);
    document.body.appendChild(toast);
    document.body.appendChild(mobileLauncher);
    document.body.appendChild(swipeHint);

    const HINT_SHOWN_KEY = config.storageKey + ':swipe-hint-shown';
    if (!localStorage.getItem(HINT_SHOWN_KEY)) {
      localStorage.setItem(HINT_SHOWN_KEY, '1');
      setTimeout(() => {
        swipeHint.classList.add('visible');
        setTimeout(() => swipeHint.classList.remove('visible'), 2500);
      }, 900);
    }

    // ── Wire events ──
    function updateMobileClearBtn() {
      const btn = document.getElementById('cfw-m-clear');
      if (!btn) return;
      const hasContent = !!(state.draftTitle.trim() || state.draftDescription.trim());
      btn.style.display = hasContent ? '' : 'none';
    }

    const titleEl = document.getElementById('cfw-m-title');
    if (titleEl) {
      titleEl.value = state.draftTitle;
      titleEl.addEventListener('input', () => { state.draftTitle = titleEl.value; persistState(); updateMobileClearBtn(); });
    }
    const descEl = document.getElementById('cfw-m-description');
    if (descEl) {
      descEl.value = state.draftDescription;
      descEl.addEventListener('input', () => { state.draftDescription = descEl.value; persistState(); updateMobileClearBtn(); });
    }
    updateMobileClearBtn();

    const clearBtn = document.getElementById('cfw-m-clear');
    if (clearBtn) clearBtn.onclick = () => {
      state.draftTitle = '';
      state.draftDescription = '';
      if (titleEl) titleEl.value = '';
      if (descEl) descEl.value = '';
      persistState();
      updateMobileClearBtn();
    };

    const pm = document.getElementById('cfw-m-policy-manual');
    if (pm) pm.onclick = () => { state.draftMergePolicy = 'manual'; applyPolicyUi(); };
    const pa = document.getElementById('cfw-m-policy-auto');
    if (pa) pa.onclick = () => { state.draftMergePolicy = 'auto_unblocked'; applyPolicyUi(); };
    const vm = document.getElementById('cfw-m-vpolicy-manual');
    if (vm) vm.onclick = () => { state.draftMergePolicy = 'manual'; persistState(); applyPolicyUi(); };
    const va = document.getElementById('cfw-m-vpolicy-auto');
    if (va) va.onclick = () => { state.draftMergePolicy = 'auto_unblocked'; persistState(); applyPolicyUi(); };

    const createOnly = document.getElementById('cfw-m-create-only');
    if (createOnly) createOnly.onclick = () => createRequest(false);
    const createExec = document.getElementById('cfw-m-create-execute');
    if (createExec) createExec.onclick = () => createRequest(true);

    const textSuccess = document.getElementById('cfw-mv-text-success');
    if (textSuccess) textSuccess.onclick = () => { setTextCreateSuccess(false); };
    const textUndo = document.getElementById('cfw-mv-text-undo');
    if (textUndo) textUndo.onclick = (e) => { e.stopPropagation(); void cancelSubmission(state.lastSubmissionId, () => setTextCreateSuccess(false)); };

    const vrecord = document.getElementById('cfw-mv-vrecord');
    if (vrecord) vrecord.onclick = () => toggleVoiceRecording();
    const vreset = document.getElementById('cfw-mv-vreset');
    if (vreset) vreset.onclick = () => resetVoiceDraft();
    const vsend = document.getElementById('cfw-mv-vsend');
    if (vsend) vsend.onclick = () => sendVoiceDraft();

    const voiceSuccess = document.getElementById('cfw-mv-voice-success');
    if (voiceSuccess) voiceSuccess.onclick = () => { setVoiceCreateSuccess(false); };
    const voiceUndo = document.getElementById('cfw-mv-voice-undo');
    if (voiceUndo) voiceUndo.onclick = (e) => { e.stopPropagation(); void cancelSubmission(state.lastSubmissionId, () => setVoiceCreateSuccess(false)); };

    const filterBtn = document.getElementById('cfw-ml-filter-btn');
    if (filterBtn) filterBtn.onclick = () => openMobileFilterSheet();
    const refreshBtn = document.getElementById('cfw-ml-refresh-btn');
    if (refreshBtn) refreshBtn.onclick = () => { void loadIssues(true).then(() => renderMobileIssues()); };

    const mlBody = document.getElementById('cfw-ml-body');
    const mlPtr = document.getElementById('cfw-ml-ptr');
    if (mlBody && mlPtr) {
      const PTR_THRESHOLD = 56;
      let ptrStartY = 0;
      let ptrActive = false;
      mlBody.addEventListener('touchstart', (e) => {
        if (mlBody.scrollTop === 0) { ptrStartY = e.touches[0].clientY; ptrActive = true; }
      }, { passive: true });
      mlBody.addEventListener('touchmove', (e) => {
        if (!ptrActive) return;
        const dy = e.touches[0].clientY - ptrStartY;
        if (dy > 0) {
          mlPtr.classList.add('cfw-ml-ptr-active');
          mlPtr.textContent = dy > PTR_THRESHOLD ? '↑ Release to refresh' : '↓ Pull to refresh';
        } else {
          ptrActive = false;
          mlPtr.classList.remove('cfw-ml-ptr-active');
        }
      }, { passive: true });
      mlBody.addEventListener('touchend', (e) => {
        if (!ptrActive) return;
        const dy = e.changedTouches[0].clientY - ptrStartY;
        ptrActive = false;
        if (dy > PTR_THRESHOLD) {
          mlPtr.textContent = 'Refreshing…';
          void loadIssues(true).then(() => {
            renderMobileIssues();
            mlPtr.classList.remove('cfw-ml-ptr-active');
            mlPtr.textContent = '';
          });
        } else {
          mlPtr.classList.remove('cfw-ml-ptr-active');
          mlPtr.textContent = '';
        }
      }, { passive: true });
    }

    const tokenUpdate = document.getElementById('cfw-m-token-update');
    if (tokenUpdate) tokenUpdate.onclick = () => { promptAdminToken(); updateMobileTokenStatus(); void loadIssues(true).then(() => renderMobileIssues()); };
    const tokenClear = document.getElementById('cfw-m-token-clear');
    if (tokenClear) tokenClear.onclick = () => {
      if (!window.confirm('Clear saved admin token?')) return;
      writeAdminToken('');
      updateMobileTokenStatus();
    };

    const handLeft = document.getElementById('cfw-m-hand-left');
    if (handLeft) handLeft.onclick = () => { applyHandedness('left'); persistState(); };
    const handRight = document.getElementById('cfw-m-hand-right');
    if (handRight) handRight.onclick = () => { applyHandedness('right'); persistState(); };

    updateMobileTokenStatus();
    updateVoiceComposer();
    applyPolicyUi();
    applyHandedness(state.handedness === 'left' ? 'left' : (config.handedness || 'right'));

    const activeTab = ['text', 'voice', 'list', 'settings'].includes(state.activeTab) ? state.activeTab : 'list';
    setMobileTab(activeTab);
  }

  // ── End mobile functions ───────────────────────────────────────────────────

  function init() {
    if (document.getElementById('cfw-feedback-widget') || document.getElementById('cfw-mobile')) return;
    restoreState();
    document.head.appendChild(createStyles());
    state.captureMode = state.captureMode === 'voice' || state.captureMode === 'text'
      ? state.captureMode
      : getDefaultCaptureMode();
    if (!['text', 'voice', 'list', 'settings'].includes(state.activeTab)) {
      if (state.activeTab === 'requests') state.activeTab = 'list';
      else if (state.activeTab === 'new') state.activeTab = 'list';
    }
    createWidgetShell();
    createMobileShell();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.CFWidget = {
    open: openPanel,
    close: closePanel,
    submit,
  };
})();
  `.trim();
}
