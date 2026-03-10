/**
 * Generates the widget.js script content that gets injected into client pages.
 */
export function generateWidgetScript(endpoint: string, defaultRepo: string, defaultLabels: string[]): string {
  const baseEndpoint = endpoint.replace(/\/+$/, "");
  const defaultLabelsStr = defaultLabels.join(",");

  return `
(function() {
  'use strict';

  const ADMIN_TOKEN_STORAGE_KEY = 'thoughts:admin-token';
  const STATE_STORAGE_KEY = 'thoughts:widget-state';

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
      repo: ds.repo || '${defaultRepo}',
      labels: ds.labels || '${defaultLabelsStr}',
    };
  }

  const config = getBootstrapConfig();

  function getStateStorageKey() {
    return STATE_STORAGE_KEY;
  }

  function getAdminTokenStorageKey() {
    return ADMIN_TOKEN_STORAGE_KEY;
  }

  const state = {
    activeTab: 'new',
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
    createError: '',
    listError: '',
    executeError: '',
    toastText: '',
    toastLink: '',
    toastTimer: null,
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
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return;

      if (saved.activeTab === 'new' || saved.activeTab === 'requests') state.activeTab = saved.activeTab;
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

      if (typeof saved.createError === 'string') state.createError = saved.createError;
      if (typeof saved.listError === 'string') state.listError = saved.listError;
      if (typeof saved.executeError === 'string') state.executeError = saved.executeError;

      if (typeof saved.toastText === 'string') state.toastText = saved.toastText;
      if (typeof saved.toastLink === 'string') state.toastLink = saved.toastLink;
    } catch {
      // no-op
    }
  }

  function persistState() {
    try {
      const snapshot = {
        activeTab: state.activeTab,
        issues: state.issues,
        issuesLoaded: state.issuesLoaded,
        panelOpen: state.panelOpen,
        listView: state.listView,
        listSort: state.listSort,
        draftTitle: state.draftTitle,
        draftDescription: state.draftDescription,
        draftMergePolicy: state.draftMergePolicy,
        createError: state.createError,
        listError: state.listError,
        executeError: state.executeError,
        toastText: state.toastText,
        toastLink: state.toastLink,
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

  function createStyles() {
    const style = document.createElement('style');
    style.textContent = \`#cfw-feedback-widget { position: fixed; right: 18px; bottom: 18px; z-index: 9999; font-family: 'IBM Plex Sans', 'Segoe UI', sans-serif; color: #d9e7f7; }
#cfw-feedback-launcher { height: 34px; width: 34px; border-radius: 6px; border: 1px solid rgba(124, 187, 255, 0.4); background: rgba(10, 17, 29, 0.9); color: #9ad2ff; box-shadow: 0 8px 20px rgba(2, 7, 14, 0.35); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; backdrop-filter: blur(6px); }
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
@media (max-width: 680px) {
  #cfw-feedback-widget { right: 10px; bottom: 10px; }
  #cfw-feedback-panel { top: 10px; right: 10px; width: calc(100vw - 20px); height: calc(100vh - 20px); }
  #cfw-requests-controls-top { grid-template-columns: 1fr; }
  #cfw-issues-table-wrap { display: none; }
  #cfw-issues-cards { display: grid; }
}\`;
    return style;
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
    const el = document.getElementById('cfw-new-error');
    if (!el) {
      persistState();
      return;
    }
    if (!state.createError) {
      el.classList.remove('active');
      el.textContent = '';
      persistState();
      return;
    }
    el.textContent = state.createError;
    el.classList.add('active');
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
  }

  function setIssuesLoading(loading) {
    state.loadingIssues = loading;
    const btn = document.getElementById('cfw-refresh-issues');
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? 'Loading...' : 'Refresh';
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
    try {
      const params = new URLSearchParams();
      params.set('limit', '50');
      params.set('view', state.listView);
      params.set('sort', state.listSort);
      if (state.listQuery) params.set('q', state.listQuery);
      if (Array.isArray(state.listStatusFilter) && state.listStatusFilter.length) {
        params.set('status', state.listStatusFilter.join(','));
      }
      const response = await fetch(config.issuesEndpoint + '?' + params.toString(), {
        method: 'GET',
        headers: { 'x-admin-token': token }
      });
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
      setListError((err && err.message) ? err.message : 'Failed to load issues');
    } finally {
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

    const titleEl = document.getElementById('cfw-title');
    const descriptionEl = document.getElementById('cfw-description');
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
      const issueUrl = getIssueUrlFromCreateResponse(data);

      state.draftTitle = '';
      state.draftDescription = '';
      if (titleEl) titleEl.value = '';
      if (descriptionEl) descriptionEl.value = '';

      showToast(execute ? 'Request queued for execution.' : 'Request queued.', issueUrl);
      await loadIssues(true);
      setTab('requests');
      if (!issueUrl) {
        void waitForCreatedIssueUrl(title).then((resolvedUrl) => {
          if (!resolvedUrl) return;
          showToast(execute ? 'Request queued for execution.' : 'Request queued.', resolvedUrl);
        });
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

    root.appendChild(createStyles());
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
      + '<input id="cfw-title" type="text" placeholder="Title" maxlength="500" />'
      + '<textarea id="cfw-description" placeholder="Describe the requested change..." maxlength="5000"></textarea>'
      + '<div class="cfw-field-group">'
      + '<label class="cfw-label" for="cfw-merge-policy">Merge policy</label>'
      + '<select id="cfw-merge-policy" class="cfw-select">'
      + '<option value="manual">Manual merge</option>'
      + '<option value="auto_unblocked">Auto-merge when unblocked</option>'
      + '</select>'
      + '</div>'
      + '<p class="cfw-muted-note">Current URL is attached automatically to the issue payload.</p>'
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
        persistState();
      });
    }

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

  function init() {
    if (document.getElementById('cfw-feedback-widget')) return;
    restoreState();
    createWidgetShell();
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
