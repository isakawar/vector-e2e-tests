import { expect, test } from '../../fixtures/base.fixture.js';

test.describe('[Non-authorized] Main Page', () => {
  test('Anon sees the correct page title', async ({ mainPage }) => {
    await test.step('Verify page title matches expected value', async () => {
      await expect(mainPage.page).toHaveTitle(
        'Вектор | Національна платформа можливостей професійного розвитку педагогічних працівників',
      );
    });
  });

  test('Anon can accept the cookie banner and it disappears', async ({
    mainPage,
  }) => {
    await test.step('Verify cookie banner is visible on page load', async () => {
      await expect(mainPage.cookieBanner.banner).toBeVisible();
    });

    await test.step('Accept the cookie banner', async () => {
      await mainPage.cookieBanner.accept();
    });

    await test.step('Verify cookie banner is hidden after acceptance', async () => {
      await expect(mainPage.cookieBanner.banner).toBeHidden();
    });
  });
});
