import type { APIRequestContext } from '@playwright/test';
import { expect } from '@playwright/test';
import fs from 'fs';

export const AUTH_FILE = 'playwright/.auth/user.json';

const LOGIN_PATH = '/uk/accounts/login/?next=/uk/';

export interface Credentials {
  email: string;
  password: string;
}

export async function loginViaApi(
  api: APIRequestContext,
  baseURL: string,
  credentials: Credentials,
): Promise<void> {
  // 1️⃣ GET login page to receive CSRF cookie
  const loginPage = await api.get(LOGIN_PATH);
  expect(
    loginPage.ok(),
    `GET ${LOGIN_PATH} failed with status ${loginPage.status()}`,
  ).toBeTruthy();

  // 2️⃣ Extract csrftoken cookie
  const storage = await api.storageState();
  const csrfCookie = storage.cookies.find((c) => c.name === 'csrftoken');

  if (!csrfCookie) {
    throw new Error('CSRF token cookie not found after GET login page');
  }

  // 3️⃣ Send login POST request
  const loginResponse = await api.post(LOGIN_PATH, {
    form: {
      csrfmiddlewaretoken: csrfCookie.value,
      email: credentials.email,
      password: credentials.password,
    },
    headers: {
      Referer: `${baseURL}${LOGIN_PATH}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  expect(
    loginResponse.status(),
    `Login POST failed with status ${loginResponse.status()}`,
  ).toBeLessThan(400);

  // 4️⃣ Check that session cookie appeared
  const newStorage = await api.storageState();
  const sessionCookie = newStorage.cookies.find((c) => c.name === 'sessionid');

  expect(
    sessionCookie,
    'sessionid cookie not found — login may have failed',
  ).toBeTruthy();

  // 5️⃣ Save session for tests
  fs.mkdirSync('playwright/.auth', { recursive: true });
  await fs.promises.writeFile(AUTH_FILE, JSON.stringify(newStorage, null, 2));
}
