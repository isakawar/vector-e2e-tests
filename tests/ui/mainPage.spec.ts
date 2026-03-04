import { expect, test } from '../../fixtures/base.fixture.js';

test.describe('Main Page', () => {
  test('has correct title', async ({ mainPage }) => {
    await expect(mainPage.page).toHaveTitle(
      'Вектор | Національна платформа можливостей професійного розвитку педагогічних працівників',
    );
  });

  test('displays cookies banner and hides it after acceptance', async ({
    mainPage,
  }) => {
    await expect(mainPage.cookieBanner.banner).toBeVisible();
    await mainPage.cookieBanner.accept();
    await expect(mainPage.cookieBanner.banner).toBeHidden();
  });

  test('displays desktop header with navigation and auth buttons', async ({
    mainPage,
  }) => {
    await expect(mainPage.header.desktop).toBeVisible();

    for (const item of mainPage.header.navItems) {
      await expect(mainPage.header.navItem(item)).toBeVisible();
    }

    await expect(mainPage.header.loginButton).toBeVisible();
    await expect(mainPage.header.registerButton).toBeVisible();
  });
});
