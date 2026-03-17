<template>
  <template v-if="isMobile">
    <MobileWidget />
  </template>
  <template v-else>
    <DesktopWidget />
  </template>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useWidgetStore } from './stores/widget'
import { useWidgetState } from './composables/useWidgetState'
import MobileWidget from './components/MobileWidget.vue'
import DesktopWidget from './components/DesktopWidget.vue'
import type { WidgetConfig } from './types'

const props = defineProps<{ widgetConfig?: WidgetConfig }>()

const store = useWidgetStore()
const { restore } = useWidgetState()

const isMobile = computed(() => {
  try { return window.matchMedia('(max-width: 680px)').matches } catch { return false }
})

onMounted(() => {
  if (props.widgetConfig) {
    store.init(props.widgetConfig)
    restore()
  }
})
</script>

<style>
/* Reset */
* { box-sizing: border-box; }
:host { all: initial; font-family: 'IBM Plex Sans', 'Segoe UI', sans-serif; }

/* ─── Desktop Widget ─────────────────────────────────────────────────────── */
#cfw-feedback-widget { position: fixed; right: 18px; bottom: 18px; z-index: 9999; font-family: 'IBM Plex Sans', 'Segoe UI', sans-serif; color: #d9e7f7; }
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
#cfw-requests-controls-top { display: grid; grid-template-columns: 1fr auto auto auto; gap: 8px; }
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
.cfw-issue-card { border: 1px solid #2f4864; border-radius: 8px; padding: 10px; background: #0d1727; }
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
.muted { font-size: 11px; color: #7f9cbc; }
#cfw-toast { position: fixed; top: 14px; right: 14px; z-index: 10002; max-width: min(420px, calc(100vw - 28px)); border: 1px solid rgba(124, 187, 255, 0.4); border-radius: 10px; background: rgba(10, 17, 29, 0.96); box-shadow: 0 12px 28px rgba(2, 7, 14, 0.5); padding: 10px 12px; font-size: 12px; color: #d9e7f7; backdrop-filter: blur(8px); }
#cfw-toast a { color: #9ad2ff; text-decoration: underline; text-underline-offset: 2px; }

/* ─── Mobile Widget ──────────────────────────────────────────────────────── */
#cfw-mobile { position: fixed; inset: 0; z-index: 9999; flex-direction: column; background: #0a111d; color: #d9e7f7; font-family: 'IBM Plex Sans','Segoe UI',sans-serif; }
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
</style>
