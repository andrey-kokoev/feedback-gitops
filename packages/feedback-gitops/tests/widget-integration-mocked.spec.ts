import { test, expect } from '@playwright/test';

test.describe('Widget Integration Harness Mocked Tests', () => {
  test('mounts integration harness and intercepts backend issue endpoints', async ({ page }) => {
    // Intercept backend /api/issue route
    await page.route('http://localhost:8787/api/issue', async (route) => {
      // Stub the GET response for the integration harness
      const json = [
        {
          number: 101,
          title: "Intercepted Integration Title",
          body: "Mocked from Playwright",
          state: "open",
          url: "https://github.com/mock/repo/issues/101",
          updatedAt: new Date().toISOString(),
          labels: [],
          status: "new",
          statusDetail: "",
          pullRequest: null,
          issueActions: [],
          pullRequestActions: [],
          mergePolicy: "manual"
        }
      ];
      await route.fulfill({ json });
    });

    await page.goto('/widget/integration.html');

    // Confirm custom element is attached
    const widget = page.locator('feedback-gitops-widget');
    await expect(widget).toBeAttached();

    // Confirm loud banner is visible on the host page
    await expect(page.locator('text=Setup Required')).toBeVisible();

    const launcher = widget.locator('button[aria-label="Submit Feedback"]');
    await expect(launcher).toBeVisible();

    // Trigger launcher. Depending on implementation, it may prompt for token
    await launcher.click();

    // Attempt to fill in the token if prompted
    const tokenInput = widget.locator('input[type="password"]');
    if (await tokenInput.isVisible()) {
      await tokenInput.fill('playwright-test-token');
      await widget.locator('button', { hasText: 'Continue' }).click();
    }

    // Now it should fetch the issues and use intercepted route
    await expect(widget.locator('text=Intercepted Integration Title')).toBeVisible();
  });
});
