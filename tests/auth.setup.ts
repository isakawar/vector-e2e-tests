import { test as setup, expect } from '@playwright/test';
import fs from 'fs';

export const AUTH_FILE = 'playwright/.auth/user.json';

setup('authenticate via API', async ({ page }) => {
  const email = process.env['TEST_EMAIL'];
  const password = process.env['TEST_PASSWORD'];
  if (!email || !password) {
    throw new Error('TEST_EMAIL and TEST_PASSWORD must be set in .env');
  }

  fs.mkdirSync('playwright/.auth', { recursive: true });

  // 1. Navigate to login page
  await page.goto('/uk/accounts/login/');

  // 2. Dismiss cookie banner if present
  const cookieBanner = page.getByText('Ознайомлена/-ний');
  if (await cookieBanner.isVisible({ timeout: 2000 })) {
    await cookieBanner.click();
  }

  // 3. Fill credentials and submit (sends POST /uk/accounts/login/ under the hood)
  await page.locator('#id_email').fill(email);
  await page.locator('#id_password').fill(password);
  await page
    .locator('button[type="submit"]')
    .filter({ hasText: 'Увійти' })
    .click();

  // 4. Wait for successful redirect away from login page
  await page.waitForURL(/\/uk\/(?!accounts\/login)/, { timeout: 15000 });

  // 5. Verify sessionid cookie is present
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find((c) => c.name === 'sessionid');
  expect(
    sessionCookie,
    'sessionid cookie not found — login may have failed',
  ).toBeTruthy();

  // 6. Save full storageState (cookies + localStorage) for reuse across test runs
  await page.context().storageState({ path: AUTH_FILE });
});
