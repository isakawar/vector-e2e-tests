import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { CookieBanner } from '../components/CookieBanner.js';

export class LoginPage extends BasePage {
  readonly cookieBanner: CookieBanner;

  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cookieBanner = new CookieBanner(page);
    this.emailInput = page.locator('#id_email');
    this.passwordInput = page.locator('#id_password');
    this.submitButton = page.getByRole('button', { name: 'Увійти' });
  }

  async open(): Promise<void> {
    await this.goto('/uk/accounts/login/');
    if (await this.cookieBanner.banner.isVisible()) {
      await this.cookieBanner.accept();
    }
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
