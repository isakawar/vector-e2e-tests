import { qase } from 'playwright-qase-reporter';
import { test, expect } from '../../fixtures/base.fixture.js';

test.describe('Header — Qase example tests', () => {
  test('User sees the logo and can navigate to homepage', async ({
    mainPage,
  }) => {
    qase.id(1);
    qase.title('User sees the logo and can navigate to homepage');
    qase.fields({ severity: 'critical', layer: 'e2e' });
    qase.suite('Header / Logo');

    await test.step('Verify logo is visible', async () => {
      await expect(mainPage.header.logo).toBeVisible();
    });

    await test.step('Verify logo link points to homepage', async () => {
      await expect(mainPage.header.logoLink).toHaveAttribute('href', '/');
    });
  });

  test('User sees login and register buttons when not authenticated', async ({
    mainPage,
  }) => {
    qase.id(2);
    qase.title('User sees login and register buttons when not authenticated');
    qase.fields({ severity: 'blocker', layer: 'e2e' });
    qase.suite('Header / Auth buttons');

    await test.step('Verify "Увійти" button is visible', async () => {
      await expect(mainPage.header.loginButton).toBeVisible();
    });

    await test.step('Verify "Зареєструватися" button is visible', async () => {
      await expect(mainPage.header.registerButton).toBeVisible();
    });
  });

  test('User can access hamburger menu for mobile navigation', async ({
    mainPage,
  }) => {
    qase.id(3);
    qase.title('User can access hamburger menu for mobile navigation');
    qase.fields({ severity: 'normal', layer: 'e2e' });
    qase.suite('Header / Navigation');

    await test.step('Verify hamburger menu button is present in DOM', async () => {
      await expect(mainPage.header.hamburgerMenu).toBeAttached();
    });
  });
});
