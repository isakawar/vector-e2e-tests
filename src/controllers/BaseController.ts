import type { APIRequestContext } from '@playwright/test';

export abstract class BaseController {
  constructor(protected readonly request: APIRequestContext) {}
}
