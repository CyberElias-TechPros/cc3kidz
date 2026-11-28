import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  timeout: 30_000,
  webServer: { command: 'npm run dev -- -p 3100 --hostname 0.0.0.0', port: 3100, reuseExistingServer: !process.env.CI },
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'on-first-retry' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
