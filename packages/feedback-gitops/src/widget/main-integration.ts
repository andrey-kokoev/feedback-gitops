import { defineCustomElement } from 'vue'
import { createPinia } from 'pinia'
import FeedbackWidgetCE from './FeedbackWidget.ce.vue'
import type { WidgetConfig } from './types'
import { createRealAdapter } from './adapters/real'

function getConfig(): WidgetConfig {
  const config = (window as any).__WIDGET_CONFIG__
  if (!config) throw new Error('Missing widget dev config: window.__WIDGET_CONFIG__ is undefined')

  const endpoint = (config.endpoint ?? '').replace(/\/+$/, '')

  function inferEndpoint(suffix: string): string {
    if (endpoint.endsWith('/api/issue')) {
      return endpoint.slice(0, endpoint.length - '/api/issue'.length) + suffix
    }
    return endpoint + suffix.replace('/api', '')
  }

  return {
    endpoint: endpoint || '/api/issue',
    issuesEndpoint: config.issuesEndpoint ?? inferEndpoint('/api/issues'),
    actionEndpoint: config.actionEndpoint ?? inferEndpoint('/api/action'),
    cancelEndpoint: config.cancelEndpoint ?? inferEndpoint('/api/cancel'),
    repo: config.repo ?? '',
    labels: config.labels ?? '',
    storageKey: config.storageKey ?? 'thoughts',
  }
}

const pinia = createPinia()

const FeedbackWidgetElement = defineCustomElement(FeedbackWidgetCE, {
  configureApp(app) {
    app.use(pinia)
    // IMPORTANT: Inject real adapter after pinia so the adapter can use stores
    app.provide('widget-adapter', createRealAdapter())
  },
})

if (!customElements.get('feedback-gitops-widget')) {
  customElements.define('feedback-gitops-widget', FeedbackWidgetElement)
}

function bootstrap() {
  console.log('[Widget Integration] Bootstrap started')
  if (document.querySelector('feedback-gitops-widget')) {
    console.log('[Widget Integration] Element already exists')
    return
  }

  try {
    const config = getConfig()
    console.log('[Widget Integration] Config found:', config)

    if (!customElements.get('feedback-gitops-widget')) {
      throw new Error('Custom element feedback-gitops-widget not defined')
    }
    console.log('[Widget Integration] Custom element defined')

    const el = document.createElement('feedback-gitops-widget') as HTMLElement & { widgetConfig: WidgetConfig }
    el.widgetConfig = config
    document.body.appendChild(el)
    console.log('[Widget Integration] Element appended to body')
  } catch (err) {
    console.error('[Widget Integration] Boot failure:', err)
    const errBox = document.createElement('div')
    errBox.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #fee2e2; border: 2px solid #ef4444; color: #991b1b; padding: 16px; border-radius: 8px; z-index: 99999; font-family: sans-serif;'
    errBox.innerHTML = `
      <h3 style="margin-top:0;margin-bottom:8px;">Widget failed to mount</h3>
      <p style="margin:0;font-size:14px;"><strong>Reason:</strong> ${(err as Error).message}</p>
      <p style="margin-top:8px;margin-bottom:0;font-size:14px;">Check browser console. Entry script did not bootstrap correctly.</p>
    `
    document.body.appendChild(errBox)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  bootstrap()
}
