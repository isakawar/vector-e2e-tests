import type { Page, Locator } from '@playwright/test';

export class Header {
  readonly root: Locator;
  readonly logo: Locator;
  readonly logoLink: Locator;
  readonly loginButton: Locator;
  readonly registerButton: Locator;
  readonly hamburgerMenu: Locator;
  readonly kabinetLink: Locator;
  readonly novynyLink: Locator;

  readonly kabinetDropdownItems = [
    'Можливості підвищення кваліфікації',
    'Онлайн-курси',
    'Проєкти ГХЗВ',
    'Календар можливостей',
    "Суб'єкти підвищення кваліфікації",
    'Заклади освіти',
    'Центри професійного розвитку',
    'Документи про підвищення кваліфікації',
    'Типові програми',
  ] as const;

  readonly pidtrymkaDropdownItems = [
    'Довідковий центр Вектор',
    'Направити звернення',
    'Онбординг',
    'Вектор Бот',
  ] as const;

  readonly proPlatformuDropdownItems = [
    'Що таке Вектор',
    'Новини',
    'Політика приватності',
    'Політика Cookies',
    'Умови використання',
    'Принципи співпраці',
    'Контакти',
  ] as const;

  constructor(page: Page) {
    this.root = page.locator('header');
    this.logo = this.root.locator('img[alt="Vector"]');
    this.logoLink = this.root.locator('a[href="/"]');
    this.loginButton = this.root.locator('.btn_login');
    this.registerButton = this.root.locator('.btn_register');
    this.hamburgerMenu = this.root.locator('button.hamburger-menu');
    this.kabinetLink = this.root.locator('.nav-menu-dropdown--link', {
      hasText: 'Кабінет професійного зростання',
    });
    this.novynyLink = this.root
      .locator('a.nav-menu-dropdown--link', { hasText: 'Новини' })
      .last();
  }

  navDropdownLink(text: string) {
    return this.root.locator('.nav-menu-dropdown--link', { hasText: text });
  }
}
