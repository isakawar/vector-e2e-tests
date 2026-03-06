import { test, expect } from '../../fixtures/base.fixture.js';

test.describe('[Authorized] Header on main page', () => {
  test.describe('Authenticated navigation panel', () => {
    test('User sees the authenticated navigation panel after login', async ({
      mainPage,
    }) => {
      await test.step('Verify authenticated nav section is present in DOM', async () => {
        await expect(mainPage.header.authNav).toBeAttached();
      });
    });

    test('User can navigate to the home screen from the auth nav', async ({
      mainPage,
    }) => {
      await test.step('Verify "Домашній екран" link is present', async () => {
        await expect(mainPage.header.homeScreenLink).toBeAttached();
      });

      await test.step('Verify "Домашній екран" link points to dashboard', async () => {
        await expect(mainPage.header.homeScreenLink).toHaveAttribute(
          'href',
          '/uk/dashboard/home-screen/',
        );
      });
    });

    test('User sees personal profile section in authenticated navigation', async ({
      mainPage,
    }) => {
      await test.step('Verify "Користувацький профіль" button is present', async () => {
        await expect(mainPage.header.userProfileButton).toBeAttached();
      });
    });

    test('User sees "Кабінет" section in authenticated navigation', async ({
      mainPage,
    }) => {
      await test.step('Verify "Кабінет" auth button is present', async () => {
        await expect(mainPage.header.kabinetAuthButton).toBeAttached();
      });
    });

    test('User can log out from the authenticated navigation', async ({
      mainPage,
    }) => {
      await test.step('Verify "Вийти" link is present', async () => {
        await expect(mainPage.header.logoutLink).toBeAttached();
      });

      await test.step('Verify "Вийти" link points to logout endpoint', async () => {
        await expect(mainPage.header.logoutLink).toHaveAttribute(
          'href',
          '/uk/accounts/logout/',
        );
      });
    });
  });

  test.describe('User profile submenu', () => {
    test('User sees expected links in "Користувацький профіль" submenu', async ({
      mainPage,
    }) => {
      await test.step('Verify all profile submenu links are present in DOM', async () => {
        for (const link of mainPage.header.userProfileSubmenuItems) {
          await expect(mainPage.header.authNavLink(link)).toBeAttached();
        }
      });
    });
  });

  test.describe('"Кабінет" submenu', () => {
    test('User sees expected links in "Кабінет" submenu', async ({
      mainPage,
    }) => {
      await test.step('Verify all кабінет submenu links are present in DOM', async () => {
        for (const link of mainPage.header.kabinetAuthSubmenuItems) {
          await expect(mainPage.header.authNavLink(link)).toBeAttached();
        }
      });
    });
  });

  test.describe('Auth-only elements hidden', () => {
    test('User does not see login or register buttons after authentication', async ({
      mainPage,
    }) => {
      await test.step('Verify "Увійти" button is not visible', async () => {
        await expect(mainPage.header.loginButton).toBeHidden();
      });

      await test.step('Verify "Зареєструватися" button is not visible', async () => {
        await expect(mainPage.header.registerButton).toBeHidden();
      });
    });
  });

  test.describe('Shared elements still present', () => {
    test('User sees the logo and main navigation when authenticated', async ({
      mainPage,
    }) => {
      await test.step('Verify logo is visible', async () => {
        await expect(mainPage.header.logo).toBeVisible();
      });

      await test.step('Verify logo links to homepage', async () => {
        await expect(mainPage.header.logoLink).toHaveAttribute('href', '/');
      });

      await test.step('Verify "Кабінет" desktop nav link is visible', async () => {
        await expect(mainPage.header.kabinetLink).toBeVisible();
      });

      await test.step('Verify "Новини" link is visible', async () => {
        await expect(mainPage.header.novynyLink).toBeVisible();
      });
    });
  });
});
