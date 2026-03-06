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

  // Authenticated user nav
  readonly authNav: Locator;
  readonly userProfileButton: Locator;
  readonly homeScreenLink: Locator;
  readonly kabinetAuthButton: Locator;
  readonly logoutLink: Locator;

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

    // Authenticated nav
    this.authNav = this.root.locator('.authenticated-nav');
    this.userProfileButton = this.root.locator(
      'button.authenticated-nav--link',
      { hasText: 'Користувацький профіль' },
    );
    this.homeScreenLink = this.root.locator('a.authenticated-nav--link', {
      hasText: 'Домашній екран',
    });
    this.kabinetAuthButton = this.root.locator(
      'button.authenticated-nav--link',
      { hasText: 'Кабінет професійного зростання' },
    );
    this.logoutLink = this.root.locator('a.authenticated-nav--link', {
      hasText: 'Вийти',
    });
  }

  navDropdownLink(text: string) {
    return this.root.locator('.nav-menu-dropdown--link', { hasText: text });
  }

  authNavLink(text: string) {
    return this.root.locator(
      '.authenticated-nav--link, .authenticated-nav-submenu--link',
      { hasText: text },
    );
  }
}
