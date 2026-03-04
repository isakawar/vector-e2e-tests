import { test, expect } from '../../fixtures/base.fixture.js';

test.describe('Header on main page (when logged in)', () => {
  test.describe('Auth nav — present', () => {
    test('authenticated-nav section is present', async ({ mainPage }) => {
      await expect(mainPage.header.authNav).toBeAttached();
    });

    // authenticated-nav is a mobile sidebar (hidden on desktop, opened via hamburger)
    // so its items are attached in DOM but not visible on desktop — use toBeAttached()

    test('"Домашній екран" link is present in auth nav', async ({
      mainPage,
    }) => {
      await expect(mainPage.header.homeScreenLink).toBeAttached();
    });

    test('"Домашній екран" link points to /uk/dashboard/home-screen/', async ({
      mainPage,
    }) => {
      await expect(mainPage.header.homeScreenLink).toHaveAttribute(
        'href',
        '/uk/dashboard/home-screen/',
      );
    });

    test('"Користувацький профіль" button is present in auth nav', async ({
      mainPage,
    }) => {
      await expect(mainPage.header.userProfileButton).toBeAttached();
    });

    test('"Кабінет професійного зростання" auth button is present', async ({
      mainPage,
    }) => {
      await expect(mainPage.header.kabinetAuthButton).toBeAttached();
    });

    test('"Вийти" link is present in auth nav', async ({ mainPage }) => {
      await expect(mainPage.header.logoutLink).toBeAttached();
    });

    test('"Вийти" link points to /uk/accounts/logout/', async ({
      mainPage,
    }) => {
      await expect(mainPage.header.logoutLink).toHaveAttribute(
        'href',
        '/uk/accounts/logout/',
      );
    });
  });

  test.describe('Auth nav — user profile submenu', () => {
    for (const item of ['Про мене', 'Освіта'] as const) {
      test(`"${item}" link is present`, async ({ mainPage }) => {
        await expect(mainPage.header.authNavLink(item)).toBeAttached();
      });
    }
  });

  test.describe('Auth nav — кабінет submenu', () => {
    for (const item of [
      'Моніторинг підвищення кваліфікації',
      'Мої документи',
      'Уподобання',
      'Оцінювання 360',
    ] as const) {
      test(`"${item}" link is present`, async ({ mainPage }) => {
        await expect(mainPage.header.authNavLink(item)).toBeAttached();
      });
    }
  });

  test.describe('Auth-only elements hidden', () => {
    test('"Увійти" button is not visible', async ({ mainPage }) => {
      await expect(mainPage.header.loginButton).toBeHidden();
    });

    test('"Зареєструватися" button is not visible', async ({ mainPage }) => {
      await expect(mainPage.header.registerButton).toBeHidden();
    });
  });

  test.describe('Shared elements still present', () => {
    test('logo is visible', async ({ mainPage }) => {
      await expect(mainPage.header.logo).toBeVisible();
    });

    test('logo links to homepage', async ({ mainPage }) => {
      await expect(mainPage.header.logoLink).toHaveAttribute('href', '/');
    });

    test('"Кабінет професійного зростання" desktop nav link is visible', async ({
      mainPage,
    }) => {
      await expect(mainPage.header.kabinetLink).toBeVisible();
    });

    test('"Новини" standalone link is visible', async ({ mainPage }) => {
      await expect(mainPage.header.novynyLink).toBeVisible();
    });
  });
});
