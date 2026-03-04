import type { Page } from '@playwright/test';

export class CookieBanner {
  readonly banner = this.page.locator('.cookies-banner');
  readonly acceptButton = this.page.getByText('Ознайомлена/-ний');

  constructor(private readonly page: Page) {}

  async accept() {
    await this.acceptButton.click();
  }
}
