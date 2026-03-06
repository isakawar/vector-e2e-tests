import type { Page, Locator } from '@playwright/test';

export class CookieBanner {
  readonly banner: Locator;
  readonly acceptButton: Locator;

  constructor(page: Page) {
    this.banner = page.locator('.cookies-banner');
    this.acceptButton = this.banner.getByText('Ознайомлена/-ний');
  }

  async accept() {
    await this.acceptButton.click();
  }
}
