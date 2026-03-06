import { expect } from '@playwright/test';
import fs from 'fs';
import { BaseController } from './BaseController.js';

export const AUTH_FILE = 'state/.auth/user.json';

const LOGIN_PATH = '/uk/accounts/login/?next=/uk/';

export interface Credentials {
  email: string;
  password: string;
}

export class AuthController extends BaseController {
  async login(baseURL: string, credentials: Credentials): Promise<void> {
    // 1. GET login page to receive CSRF cookie
    const loginPage = await this.request.get(LOGIN_PATH);
    expect(
      loginPage.ok(),
      `GET ${LOGIN_PATH} failed with status ${loginPage.status()}`,
    ).toBeTruthy();

    // 2. Extract csrftoken cookie
    const storage = await this.request.storageState();
    const csrfCookie = storage.cookies.find((c) => c.name === 'csrftoken');

    if (!csrfCookie) {
      throw new Error('CSRF token cookie not found after GET login page');
    }

    // 3. Send login POST
    const response = await this.request.post(LOGIN_PATH, {
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
      response.status(),
      `Login POST failed with status ${response.status()}`,
    ).toBeLessThan(400);

    // 4. Verify session cookie appeared
    const newStorage = await this.request.storageState();
    const sessionCookie = newStorage.cookies.find(
      (c) => c.name === 'sessionid',
    );

    expect(
      sessionCookie,
      'sessionid cookie not found — login may have failed',
    ).toBeTruthy();

    // 5. Persist session for authenticated tests
    fs.mkdirSync('state/.auth', { recursive: true });
    await fs.promises.writeFile(AUTH_FILE, JSON.stringify(newStorage, null, 2));
  }
}
