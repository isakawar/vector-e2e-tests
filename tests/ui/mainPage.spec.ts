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
});
