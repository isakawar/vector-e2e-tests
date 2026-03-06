import { request as playwrightRequest } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { AuthController } from '../controllers/AuthController.js';
import type { Credentials } from '../controllers/AuthController.js';

export class ApiClient {
  readonly auth: AuthController;

  constructor(request: APIRequestContext) {
    this.auth = new AuthController(request);
  }

  /**
   * Creates an authenticated ApiClient instance.
   * Performs login and saves session state to AUTH_FILE.
   *
   * Usage in auth.setup.ts:
   *   await ApiClient.authenticate(baseURL, { email, password });
   */
  static async authenticate(
    baseURL: string,
    credentials: Credentials,
  ): Promise<ApiClient> {
    const ctx = await playwrightRequest.newContext({ baseURL });
    const client = new ApiClient(ctx);
    await client.auth.login(baseURL, credentials);
    return client;
  }
}
