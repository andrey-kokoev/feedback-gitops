<template>
  <MobileWidget />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useWidgetStore } from './stores/widget'
import { useWidgetState } from './composables/useWidgetState'
import MobileWidget from './components/MobileWidget.vue'
import type { WidgetConfig } from './types'

const props = defineProps<{ widgetConfig?: WidgetConfig }>()

const store = useWidgetStore()
const { restore } = useWidgetState()

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

/* ─── Widget ─────────────────────────────────────────────────────────────── */
#cfw-desktop-backdrop { display: none; }
#cfw-mobile { position: fixed; inset: 0; z-index: 9999; flex-direction: column; background: #0a111d; color: #d9e7f7; font-family: 'IBM Plex Sans','Segoe UI',sans-serif; }
#cfw-panel-handle { height: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; cursor: grab; touch-action: none; }
#cfw-panel-handle-bar { width: 36px; height: 4px; background: #2f4864; border-radius: 2px; }
#cfw-mobile-launcher { display: flex; position: fixed; bottom: 20px; width: 34px; height: 34px; border-radius: 6px; background: rgba(10,17,29,0.9); border: 1px solid rgba(124,187,255,0.4); color: #9ad2ff; align-items: center; justify-content: center; cursor: pointer; z-index: 9998; box-shadow: 0 8px 20px rgba(2,7,14,0.35); backdrop-filter: blur(6px); -webkit-tap-highlight-color: transparent; }
#cfw-mobile-launcher svg { width: 14px; height: 14px; }
#cfw-mobile-body { flex: 1; overflow: hidden; position: relative; }
.cfw-mv { position: absolute; inset: 0; display: none; flex-direction: column; overflow: hidden; }
.cfw-mv.active { display: flex; }
/* Single wrapper — only element that changes for snap positioning */
.cfw-tab-body { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior-y: contain; }
#cfw-mobile-body.snap-bottom .cfw-mv { justify-content: flex-end; }
#cfw-mobile-body.snap-bottom .cfw-tab-body { flex: 0 0 auto; max-height: 100%; }
#cfw-mobile-nav { height: 56px; display: flex; border-top: 1px solid rgba(124,187,255,0.18); background: rgba(10,17,29,0.98); flex-shrink: 0; }
.cfw-nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; background: none; border: none; color: #7f9cbc; cursor: pointer; font-size: 10px; padding: 0; -webkit-tap-highlight-color: transparent; }
.cfw-nav-btn.active { color: #9ad2ff; }
.cfw-nav-btn svg { width: 20px; height: 20px; }
#cfw-ml-head { padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(124,187,255,0.18); flex-shrink: 0; }
#cfw-ml-head-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #7cc4ff; font-weight: 600; }
#cfw-ml-head-actions { display: flex; gap: 8px; }
#cfw-ml-head-actions button { height: 30px; padding: 0 10px; border: 1px solid #2f4864; border-radius: 6px; background: #0d1727; color: #9bb7d3; font-size: 12px; cursor: pointer; }
#cfw-ml-head-actions button:disabled { opacity: 0.5; }
#cfw-ml-body { overflow-y: auto; overscroll-behavior-y: contain; }
#cfw-ml-ptr { height: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #9ad2ff; transition: height 0.15s ease; flex-shrink: 0; }
#cfw-ml-ptr.cfw-ml-ptr-active { height: 36px; }
.cfw-ml-empty { padding: 32px 14px; font-size: 13px; color: #7f9cbc; text-align: center; line-height: 1.6; }
.cfw-ml-row { padding: 16px 20px; border-bottom: 1px solid #1a2d42; cursor: pointer; display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; -webkit-tap-highlight-color: transparent; }
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
.cfw-mf { display: flex; flex-direction: column; padding: 14px; }
.cfw-mf input, .cfw-mf textarea, .cfw-mf select { width: 100%; border: 1px solid #2f4864; border-radius: 8px; background: #0d1727; color: #e2f0ff; box-sizing: border-box; font-family: inherit; }
.cfw-mf input { height: 44px; padding: 0 14px; margin-bottom: 10px; font-size: 15px; flex-shrink: 0; }
.cfw-textarea-wrap { margin-bottom: 10px; }
.cfw-mf textarea { width: 100%; height: 130px; min-height: 130px; max-height: 40vh; padding: 12px 14px; font-size: 15px; resize: none; overflow-y: hidden; margin-bottom: 0; }
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
.cfw-m-voice { display: flex; flex-direction: column; justify-content: flex-end; padding: 14px; gap: 14px; }
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

/* ─── Desktop: side-panel drawer ─────────────────────────────────────────── */
@media (min-width: 681px) {
  #cfw-desktop-backdrop { display: block; position: fixed; inset: 0; z-index: 9998; background: rgba(2,6,23,0.45); backdrop-filter: blur(2px); }
  #cfw-mobile { top: 0 !important; bottom: 0 !important; width: 420px; height: 100%; border-radius: 0; border: 1px solid rgba(124,187,255,0.28); box-shadow: 0 0 40px rgba(2,7,14,0.55); left: auto; right: 0; border-left: 1px solid rgba(124,187,255,0.28); transition: none !important; }
  #cfw-mobile.panel-left { left: 0; right: auto; border-left: none; border-right: 1px solid rgba(124,187,255,0.28); }
  #cfw-panel-handle { display: none; }
  #cfw-mbs { width: 420px; border-radius: 12px 12px 0 0; left: auto; right: 0; }
  #cfw-mbs.panel-left { left: 0; right: auto; }
  #cfw-mbs-overlay { background: rgba(2,6,23,0.3); }
  #cfw-swipe-hint { display: none !important; }
}
</style>
