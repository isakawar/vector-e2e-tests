import { defineConfig, devices } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load env/.env.<ENV> file (only sets vars not already set — env vars take precedence)
const envName = process.env['ENV'] ?? 'dev';
try {
  const env = readFileSync(
    join(process.cwd(), 'env', `.env.${envName}`),
    'utf-8',
  );
  for (const line of env.split('\n')) {
    const eq = line.indexOf('=');
    if (eq > 0 && !line.startsWith('#')) {
      const key = line.slice(0, eq).trim();
      const value = line.slice(eq + 1).trim();
      if (key && !(key in process.env)) process.env[key] = value;
    }
  }
} catch {
  /* env file is optional — CI can inject vars directly */
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: [
    ['html'],
    [
      'playwright-qase-reporter',
      {
        mode: process.env['QASE_MODE'] ?? 'off',
        debug: false,
        testops: {
          api: {
            token: process.env['QASE_TESTOPS_API_TOKEN'],
          },
          project: process.env['QASE_TESTOPS_PROJECT'],
          uploadAttachments: true,
          run: {
            complete: true,
          },
        },
      },
    ],
  ],
  use: {
    baseURL: process.env['BASE_URL'],
    trace: 'on-first-retry',
  },

  projects: [
    // 1. Auth setup — runs once, saves session to playwright/.auth/user.json
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    // 2. Non-authenticated tests
    {
      name: 'chromium',
      testIgnore: [/auth\.setup\.ts/, /ui-auth/],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1400, height: 1032 },
      },
    },

    // 3. Authenticated tests — reuse saved session from setup
    {
      name: 'chromium-auth',
      testMatch: /ui-auth\/.+\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1400, height: 1032 },
        storageState: 'state/.auth/user.json',
      },
    },
  ],
});
