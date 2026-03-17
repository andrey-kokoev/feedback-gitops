import { defineCustomElement } from 'vue'
import { createPinia } from 'pinia'
import FeedbackWidgetCE from './FeedbackWidget.ce.vue'
import type { WidgetConfig } from './types'

function readConfigFromScript(): WidgetConfig {
  let scriptEl: HTMLScriptElement | null = null
  if (document.currentScript instanceof HTMLScriptElement) {
    scriptEl = document.currentScript
  }
  if (!scriptEl) {
    scriptEl = document.querySelector<HTMLScriptElement>('script[data-endpoint], script[src*="widget.js"]')
  }

  const ds = scriptEl?.dataset ?? {}
  const endpoint = (ds.endpoint ?? '').replace(/\/+$/, '')

  function inferEndpoint(suffix: string): string {
    if (endpoint.endsWith('/api/issue')) {
      return endpoint.slice(0, endpoint.length - '/api/issue'.length) + suffix
    }
    return endpoint + suffix.replace('/api', '')
  }

  return {
    endpoint: endpoint || '/api/issue',
    issuesEndpoint: ds.issuesEndpoint ?? inferEndpoint('/api/issues'),
    actionEndpoint: ds.actionEndpoint ?? inferEndpoint('/api/action'),
    cancelEndpoint: ds.cancelEndpoint ?? inferEndpoint('/api/cancel'),
    repo: ds.repo ?? '',
    labels: ds.labels ?? '',
    storageKey: ds.storageKey ?? 'thoughts',
  }
}

const pinia = createPinia()

const FeedbackWidgetElement = defineCustomElement(FeedbackWidgetCE, {
  configureApp(app) {
    app.use(pinia)
  },
})

customElements.define('feedback-gitops-widget', FeedbackWidgetElement)

function bootstrap() {
  if (document.querySelector('feedback-gitops-widget')) return

  const config = readConfigFromScript()
  const el = document.createElement('feedback-gitops-widget') as HTMLElement & { widgetConfig: WidgetConfig }
  el.widgetConfig = config
  document.body.appendChild(el)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  bootstrap()
}
