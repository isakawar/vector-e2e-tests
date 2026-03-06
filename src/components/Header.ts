import type { Page, Locator } from '@playwright/test';

const SELECTORS = {
  navDropdownLink: '.nav-menu-dropdown--link',
  authNavLink: '.authenticated-nav--link',
  authNavSubmenuLink: '.authenticated-nav-submenu--link',
} as const;

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
    this.kabinetLink = this.root.locator(SELECTORS.navDropdownLink, {
      hasText: 'Кабінет професійного зростання',
    });
    this.novynyLink = this.root
      .locator(`a${SELECTORS.navDropdownLink}`, { hasText: 'Новини' })
      .last();

    // Authenticated nav
    this.authNav = this.root.locator('.authenticated-nav');
    this.userProfileButton = this.root.locator(
      `button${SELECTORS.authNavLink}`,
      { hasText: 'Користувацький профіль' },
    );
    this.homeScreenLink = this.root.locator(`a${SELECTORS.authNavLink}`, {
      hasText: 'Домашній екран',
    });
    this.kabinetAuthButton = this.root.locator(
      `button${SELECTORS.authNavLink}`,
      { hasText: 'Кабінет професійного зростання' },
    );
    this.logoutLink = this.root.locator(`a${SELECTORS.authNavLink}`, {
      hasText: 'Вийти',
    });
  }

  navDropdownLink(text: string): Locator {
    return this.root.locator(SELECTORS.navDropdownLink, { hasText: text });
  }

  authNavLink(text: string): Locator {
    return this.root.locator(
      `${SELECTORS.authNavLink}, ${SELECTORS.authNavSubmenuLink}`,
      { hasText: text },
    );
  }
}
