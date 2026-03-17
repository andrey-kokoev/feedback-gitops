# Playwright Test Issues - Help Needed

## Current Status
Tests are failing because Playwright cannot properly interact with the Vue custom element's shadow DOM.

## Test Files
- `tests/widget-sandbox.spec.ts` - 5 tests for sandbox scenarios
- `tests/widget-integration-mocked.spec.ts` - 1 test for integration harness

## Problem 1: Shadow DOM Access

Playwright locators find elements inside `feedback-gitops-widget` but interactions don't work as expected.

### What Works
- Finding the custom element: `page.locator('feedback-gitops-widget')`
- Finding the launcher button: `widget.locator('#cfw-mobile-launcher')`
- Clicking the launcher: `await launcher.click()`
- Finding the nav: `widget.locator('#cfw-mobile-nav')`

### What Doesn't Work
- Clicking Activity tab doesn't switch views
- Cannot find content elements after tab switch
- Class-based assertions fail

### Evidence
Page snapshot shows Activity button exists but view is still on Compose tab:
```yaml
- button "Activity" [ref=e25] [cursor=pointer]  # NOT marked active
- generic [ref=e40]:
  - generic [ref=e43]: New Comment  # Still showing Compose view
```

## Problem 2: Tab Switching Not Working

The widget has three tabs (Compose, Activity/Requests, Settings). Tests need to:
1. Click launcher to open widget
2. Click Activity tab (`#cfw-nav-list`)
3. See the issues list (`#cfw-mv-list` with `.active` class)

Step 2 appears to work (no error) but the view doesn't change.

### Widget Structure (from Vue components)

MobileWidget.vue:
```vue
<button id="cfw-nav-list" @click="setMobileTab('list')">...</button>
<div id="cfw-mv-list" :class="{ active: store.mobileTab === 'list' }">
  <IssuesList />
</div>
```

IssuesList.vue:
```vue
<div id="cfw-mv-list" :class="['cfw-mv', { active: store.mobileTab === 'list' }]">
  <!-- issues content -->
</div>
```

## Problem 3: Integration Test Endpoint Mismatch

Fixed per user's guidance:
- Endpoint is `/api/issues` (not `/api/issue`)
- Payload shape is `{ issues: [...] }` (not bare array)
- Token seeded via `localStorage.setItem('dev:admin-token', ...)`

## What We've Tried

1. **Different locator strategies**:
   - `widget.locator('#cfw-nav-list').click()`
   - `widget.getByRole('button', { name: 'Activity' }).click()`
   - `widget.locator('#cfw-nav-list').click({ force: true })`

2. **Waiting strategies**:
   - `await page.waitForTimeout(500)` after click
   - `await expect(element).toBeVisible()` before click
   - `await element.waitFor({ state: 'visible' })`

3. **Assertion strategies**:
   - Check active class on nav button
   - Check active class on content div (`#cfw-mv-list`)
   - Direct text content assertions

4. **Shadow DOM piercing**:
   - Standard locators (widget.locator)
   - Deep piercing (`feedback-gitops-widget >> #cfw-nav-list`)

## Manual Verification

When running `pnpm --filter feedback-gitops run dev:widget:sandbox`:
- Widget mounts correctly
- Clicking Activity tab works manually
- Issues list appears with correct content

So this is specifically a Playwright automation issue, not a widget bug.

## Request for Codex

1. How to properly interact with Vue custom elements in Playwright?
2. Why does clicking the Activity tab not trigger the view switch?
3. What's the correct way to wait for and assert on shadow DOM content?
4. Should we use page.evaluate() to manipulate widget state directly?

## Environment

- Playwright 1.58.2
- Chromium 1208
- Vue 3.5 custom elements with open shadow DOM
- Pinia state management inside widget
