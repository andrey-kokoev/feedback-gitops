import { test, expect } from '@playwright/test';

test.describe('Widget Sandbox Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/widget/sandbox.html');
  });

  test('default scenario mounts widget and renders mixed data', async ({ page }) => {
    // Check if custom element is present
    const widget = page.locator('feedback-gitops-widget');
    await expect(widget).toBeAttached();

    // The launcher should be visible
    const launcher = widget.locator('button[aria-label="Submit Feedback"]');
    await expect(launcher).toBeVisible();

    // Verify it handles opening and rendering issues
    await launcher.click();
    
    // Default mock data should have an Unread Feedback Item
    await expect(widget.locator('text=Unread Feedback Item')).toBeVisible();
    await expect(widget.locator('text=Pinned Bug Report')).toBeVisible();
    await expect(widget.locator('text=Item with comments')).toBeVisible();
  });

  test('empty scenario renders empty state', async ({ page }) => {
    // Click the scenario button for "Empty"
    await page.locator('button[data-val="empty"]').click();

    const widget = page.locator('feedback-gitops-widget');
    const launcher = widget.locator('button[aria-label="Submit Feedback"]');
    await expect(launcher).toBeVisible();
    await launcher.click();

    // Wait for list to load
    await expect(widget.locator('text=No feedback items yet.')).toBeVisible();
  });

  test('comments scenario renders comment indicators', async ({ page }) => {
    await page.locator('button[data-val="comments"]').click();

    const widget = page.locator('feedback-gitops-widget');
    await widget.locator('button[aria-label="Submit Feedback"]').click();

    // 5+ comments mock has 6 comments
    await expect(widget.locator('text=Item with 5+ comments')).toBeVisible();
    // Assuming UI renders '6 comments' or similar badge, check for '6' in the list item
    const badge = widget.locator('text=6').first();
    await expect(badge).toBeVisible();
  });

  test('loading scenario renders loader', async ({ page }) => {
    await page.locator('button[data-val="loading"]').click();

    const widget = page.locator('feedback-gitops-widget');
    await widget.locator('button[aria-label="Submit Feedback"]').click();

    // Loading should render a spinner / skeleton
    await expect(widget.locator('.animate-spin')).toBeVisible();
  });

  test('error scenario renders error text', async ({ page }) => {
    await page.locator('button[data-val="error"]').click();

    const widget = page.locator('feedback-gitops-widget');
    await widget.locator('button[aria-label="Submit Feedback"]').click();

    await expect(widget.locator('text=Failed to load mock issues')).toBeVisible();
  });
});
