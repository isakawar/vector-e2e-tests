import { test as setup, expect, request } from '@playwright/test';
import fs from 'fs';

export const AUTH_FILE = 'playwright/.auth/user.json';

setup('authenticate via API', async ({ baseURL }) => {
  const email = process.env['TEST_EMAIL'];
  const password = process.env['TEST_PASSWORD'];

  if (!email || !password) {
    throw new Error('TEST_EMAIL and TEST_PASSWORD must be set in .env');
  }

  fs.mkdirSync('playwright/.auth', { recursive: true });

  const api = await request.newContext({
    baseURL,
  });

  // 1️⃣ GET login page to receive CSRF cookie
  const loginPage = await api.get('/uk/accounts/login/?next=/uk/');
  expect(loginPage.ok()).toBeTruthy();

  // 2️⃣ Extract csrftoken cookie
  const storage = await api.storageState();
  const csrfCookie = storage.cookies.find((c) => c.name === 'csrftoken');

  if (!csrfCookie) {
    throw new Error('CSRF token cookie not found');
  }

  const csrfToken = csrfCookie.value;

  // 3️⃣ Send login POST request
  const loginResponse = await api.post('/uk/accounts/login/?next=/uk/', {
    form: {
      csrfmiddlewaretoken: csrfToken,
      email,
      password,
    },
    headers: {
      Referer: `${baseURL}/uk/accounts/login/`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  expect(loginResponse.status()).toBeLessThan(400);

  // 4️⃣ Check that session cookie appeared
  const newStorage = await api.storageState();
  const sessionCookie = newStorage.cookies.find((c) => c.name === 'sessionid');

  expect(
    sessionCookie,
    'sessionid cookie not found — login may have failed',
  ).toBeTruthy();

  // 5️⃣ Save session for tests
  await fs.promises.writeFile(AUTH_FILE, JSON.stringify(newStorage, null, 2));
});
