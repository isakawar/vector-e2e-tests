import type { Page } from '@playwright/test';

export class Header {
  readonly root = this.page.locator('header');
  readonly desktop = this.page.locator('.header-desktop');
  readonly loginButton = this.page.getByRole('button', { name: 'Увійти' });
  readonly registerButton = this.page.getByRole('button', {
    name: 'Зареєструватися',
  });

  readonly navItems = [
    'Кабінет професійного зростання',
    'Пошук',
    'Підтримка',
    'Про платформу',
    'Новини',
  ] as const;

  constructor(private readonly page: Page) {}

  navItem(name: string) {
    return this.root.getByText(name).first();
  }
}
