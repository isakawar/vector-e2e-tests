import type { Page } from '@playwright/test';

export class Footer {
  readonly root = this.page.locator('footer');

  constructor(private readonly page: Page) {}
}
