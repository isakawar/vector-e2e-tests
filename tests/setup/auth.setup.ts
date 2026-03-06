import { test as setup } from '@playwright/test';
import { ApiClient } from '../../src/client/ApiClient.js';

setup('authenticate via API', async ({ baseURL }) => {
  const email = process.env['TEST_EMAIL'];
  const password = process.env['TEST_PASSWORD'];

  if (!baseURL || !email || !password) {
    throw new Error(
      'BASE_URL, TEST_EMAIL and TEST_PASSWORD must be set in .env',
    );
  }

  await ApiClient.authenticate(baseURL, { email, password });
});
