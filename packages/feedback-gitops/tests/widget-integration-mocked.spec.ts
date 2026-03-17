import { test, expect, type Locator, type Page } from '@playwright/test'

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173'

async function shadowExists(widget: Locator, selector: string): Promise<boolean> {
  return widget.evaluate((el, sel) => !!el.shadowRoot?.querySelector(sel as string), selector)
}

async function shadowClick(widget: Locator, selector: string): Promise<void> {
  await widget.evaluate((el, sel) => {
    const target = el.shadowRoot?.querySelector(sel as string)
    if (!(target instanceof HTMLElement)) {
      throw new Error(`Missing shadow element: ${String(sel)}`)
    }
    target.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }))
  }, selector)
}

async function shadowTextIncludes(widget: Locator, text: string): Promise<boolean> {
  return widget.evaluate((el, needle) => el.shadowRoot?.textContent?.includes(needle as string) ?? false, text)
}

async function shadowClass(widget: Locator, selector: string): Promise<string | null> {
  return widget.evaluate(
    (el, sel) => el.shadowRoot?.querySelector(sel as string)?.getAttribute('class') ?? null,
    selector,
  )
}

async function shadowDebug(widget: Locator) {
  return widget.evaluate(el => {
    const root = el.shadowRoot
    const pick = (selector: string) => {
      const node = root?.querySelector(selector)
      return node
        ? {
            selector,
            class: node.getAttribute('class'),
            text: (node.textContent || '').trim().slice(0, 120),
          }
        : null
    }

    return {
      ids: Array.from(root?.querySelectorAll('[id]') ?? []).map(node => (node as HTMLElement).id),
      navList: pick('#cfw-nav-list'),
      navText: pick('#cfw-nav-text'),
      mvList: pick('#cfw-mv-list'),
      mvText: pick('#cfw-mv-text'),
      mobileNavExists: !!root?.querySelector('#cfw-mobile-nav'),
      shadowText: (root?.textContent || '').slice(0, 500),
    }
  })
}

async function openIntegrationActivity(page: Page): Promise<Locator> {
  const widget = page.locator('feedback-gitops-widget')
  await expect(widget).toBeAttached()

  await expect.poll(() => shadowExists(widget, '#cfw-mobile-launcher')).toBe(true)
  await shadowClick(widget, '#cfw-mobile-launcher')

  await expect.poll(() => shadowExists(widget, '#cfw-mobile-nav')).toBe(true)
  await shadowClick(widget, '#cfw-nav-list')

  const listExists = await expect
    .poll(() => shadowExists(widget, '#cfw-mv-list'), { timeout: 5000 })
    .toBe(true)
    .then(() => true)
    .catch(async () => {
      throw new Error(`Missing #cfw-mv-list after Activity click.\n${JSON.stringify(await shadowDebug(widget), null, 2)}`)
    })

  if (listExists) {
    await expect.poll(() => shadowClass(widget, '#cfw-mv-list')).toContain('active')
    await expect.poll(() => shadowClass(widget, '#cfw-mv-text')).not.toContain('active')
  }

  return widget
}

test.describe('Widget Integration Harness Mocked Tests', () => {
  test('mounts integration harness and loads mocked issues', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('dev:admin-token', 'playwright-test-token')
    })

    await page.route('http://localhost:8787/api/issues**', async route => {
      await route.fulfill({
        json: {
          issues: [
            {
              number: 101,
              title: 'Intercepted Integration Title',
              body: 'Mocked from Playwright',
              state: 'open',
              url: 'https://github.com/mock/repo/issues/101',
              updatedAt: new Date().toISOString(),
              labels: [],
              status: 'new',
              statusDetail: '',
              pullRequest: null,
              issueActions: [],
              pullRequestActions: [],
              mergePolicy: 'manual',
            },
          ],
        },
      })
    })

    await page.goto(`${BASE_URL}/widget/integration.html`)
    await expect(page.getByRole('heading', { name: 'Widget Integration Harness' })).toBeVisible()

    const widget = await openIntegrationActivity(page)
    await expect.poll(() => shadowTextIncludes(widget, 'Intercepted Integration Title')).toBe(true)
  })
})
