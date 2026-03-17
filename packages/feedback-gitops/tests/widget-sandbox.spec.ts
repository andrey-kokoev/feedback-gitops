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

async function shadowIds(widget: Locator): Promise<string[]> {
  return widget.evaluate(el =>
    Array.from(el.shadowRoot?.querySelectorAll('[id]') ?? []).map(node => (node as HTMLElement).id),
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

async function openActivity(page: Page): Promise<Locator> {
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

test.describe('Widget Sandbox Smoke Tests', () => {
  test('default scenario mounts widget and renders mixed data', async ({ page }) => {
    await page.goto(`${BASE_URL}/widget/sandbox.html`)
    const widget = await openActivity(page)

    await expect.poll(() => shadowTextIncludes(widget, 'Unread Feedback Item')).toBe(true)
    await expect.poll(() => shadowTextIncludes(widget, 'Pinned Bug Report')).toBe(true)
    await expect.poll(() => shadowTextIncludes(widget, 'Item with comments')).toBe(true)
  })

  test('empty scenario renders empty state', async ({ page }) => {
    await page.goto(`${BASE_URL}/widget/sandbox.html?scenario=empty`)
    const widget = await openActivity(page)

    await expect.poll(() => shadowTextIncludes(widget, 'No requests yet.')).toBe(true)
  })

  test('comments scenario renders comment-heavy item', async ({ page }) => {
    await page.goto(`${BASE_URL}/widget/sandbox.html?scenario=comments`)
    const widget = await openActivity(page)

    await expect.poll(() => shadowTextIncludes(widget, 'Item with 5+ comments')).toBe(true)
  })

  test('loading scenario renders loader', async ({ page }) => {
    await page.goto(`${BASE_URL}/widget/sandbox.html?scenario=loading`)
    const widget = await openActivity(page)

    await expect.poll(() => shadowTextIncludes(widget, 'Loading…')).toBe(true)
  })

  test('error scenario renders error text', async ({ page }) => {
    await page.goto(`${BASE_URL}/widget/sandbox.html?scenario=error`)
    const widget = await openActivity(page)

    await expect.poll(() => shadowTextIncludes(widget, 'Failed to load mock issues')).toBe(true)
  })
})
