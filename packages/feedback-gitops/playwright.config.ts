import { defineConfig, devices } from '@playwright/test';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    viewport: { width: 390, height: 844 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: 'pnpm exec vite --config ./widget/vite.config.ts --host 127.0.0.1 --port 4173 --strictPort',
    cwd: ROOT_DIR,
    url: 'http://127.0.0.1:4173/widget/sandbox.html',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
