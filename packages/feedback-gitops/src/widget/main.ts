import { defineCustomElement } from 'vue'
import { createPinia } from 'pinia'
import FeedbackWidgetCE from './FeedbackWidget.ce.vue'
import type { WidgetConfig } from './types'
import { createRealAdapter } from './adapters/real'

declare global {
  interface Window {
    __FEEDBACK_GITOPS_WIDGET_CONFIG__?: Partial<WidgetConfig>
  }
}

function readConfigFromScript(): WidgetConfig {
  const explicitConfig = window.__FEEDBACK_GITOPS_WIDGET_CONFIG__
  if (explicitConfig) {
    const endpoint = String(explicitConfig.endpoint ?? '').replace(/\/+$/, '')

    function inferEndpoint(suffix: string): string {
      if (endpoint.endsWith('/api/issue')) {
        return endpoint.slice(0, endpoint.length - '/api/issue'.length) + suffix
      }
      return endpoint + suffix.replace('/api', '')
    }

    return {
      endpoint: endpoint || '/api/issue',
      issuesEndpoint: explicitConfig.issuesEndpoint ?? inferEndpoint('/api/issues'),
      actionEndpoint: explicitConfig.actionEndpoint ?? inferEndpoint('/api/action'),
      cancelEndpoint: explicitConfig.cancelEndpoint ?? inferEndpoint('/api/cancel'),
      repo: explicitConfig.repo ?? '',
      labels: explicitConfig.labels ?? '',
      storageKey: explicitConfig.storageKey ?? 'thoughts',
    }
  }

  let script: HTMLScriptElement | null = null
  if (document.currentScript instanceof HTMLScriptElement) {
    script = document.currentScript
  }
  if (!script) {
    script = document.querySelector('script[data-endpoint], script[src*="widget.js"]')
  }

  const data = script?.dataset ?? {}
  const endpoint = String(data.endpoint ?? '').replace(/\/+$/, '')

  function inferEndpoint(suffix: string): string {
    if (endpoint.endsWith('/api/issue')) {
      return endpoint.slice(0, endpoint.length - '/api/issue'.length) + suffix
    }
    return endpoint + suffix.replace('/api', '')
  }

  return {
    endpoint: endpoint || '/api/issue',
    issuesEndpoint: data.issuesEndpoint ?? inferEndpoint('/api/issues'),
    actionEndpoint: data.actionEndpoint ?? inferEndpoint('/api/action'),
    cancelEndpoint: data.cancelEndpoint ?? inferEndpoint('/api/cancel'),
    repo: data.repo ?? '',
    labels: data.labels ?? '',
    storageKey: data.storageKey ?? 'thoughts',
  }
}

const pinia = createPinia()

const FeedbackWidgetElement = defineCustomElement(FeedbackWidgetCE, {
  configureApp(app) {
    app.use(pinia)
    app.provide('widget-adapter', createRealAdapter())
  },
})

if (!customElements.get('feedback-gitops-widget')) {
  customElements.define('feedback-gitops-widget', FeedbackWidgetElement)
}

function bootstrap() {
  if (document.querySelector('feedback-gitops-widget')) return
  const el = document.createElement('feedback-gitops-widget') as HTMLElement & { widgetConfig: WidgetConfig }
  el.widgetConfig = readConfigFromScript()
  document.body.appendChild(el)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  bootstrap()
}
