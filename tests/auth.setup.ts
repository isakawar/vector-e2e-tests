import { test as setup, request } from '@playwright/test';
import { loginViaApi } from '../helpers/authHelper.js';

setup('authenticate via API', async ({ baseURL }) => {
  const email = process.env['TEST_EMAIL'];
  const password = process.env['TEST_PASSWORD'];

  if (!baseURL || !email || !password) {
    throw new Error(
      'BASE_URL, TEST_EMAIL and TEST_PASSWORD must be set in .env',
    );
  }

  const api = await request.newContext({ baseURL });

  await loginViaApi(api, baseURL, { email, password });
});
