import { test, expect } from '../../fixtures/base.fixture.js';
import { NAV_LABELS } from '../../test-data/navigation.js';
import { URLS } from '../../test-data/urls.js';

test.describe('[Non-authorized] Header on main page', () => {
  test('Anon sees the header on the main page', async ({ mainPage }) => {
    await test.step('Verify header section is visible', async () => {
      await expect(mainPage.header.root).toBeVisible();
    });
  });

  test.describe('Logo', () => {
    test('Anon sees the logo in the header', async ({ mainPage }) => {
      await test.step('Verify logo image is visible', async () => {
        await expect(mainPage.header.logo).toBeVisible();
      });
    });

    test('Anon is redirected to homepage when clicking the logo', async ({
      mainPage,
    }) => {
      await test.step('Verify logo link is visible', async () => {
        await expect(mainPage.header.logoLink).toBeVisible();
      });

      await test.step('Verify logo link points to homepage', async () => {
        await expect(mainPage.header.logoLink).toHaveAttribute(
          'href',
          URLS.homepage,
        );
      });
    });
  });

  test.describe('Navigation — Кабінет професійного зростання', () => {
    test('Anon sees the "Кабінет" section in main navigation', async ({
      mainPage,
    }) => {
      await test.step('Verify top-level "Кабінет" link is visible', async () => {
        await expect(mainPage.header.kabinetLink).toBeVisible();
      });
    });

    test('Anon sees expected links in "Кабінет професійного зростання" dropdown', async ({
      mainPage,
    }) => {
      await test.step('Verify all dropdown links are present in DOM', async () => {
        for (const link of NAV_LABELS.kabinet) {
          await expect(mainPage.header.navDropdownLink(link)).toBeAttached();
        }
      });
    });
  });

  test.describe('Navigation — Підтримка', () => {
    test('Anon sees expected links in "Підтримка" dropdown', async ({
      mainPage,
    }) => {
      await test.step('Verify all dropdown links are present in DOM', async () => {
        for (const link of NAV_LABELS.pidtrymka) {
          await expect(mainPage.header.navDropdownLink(link)).toBeAttached();
        }
      });
    });
  });

  test.describe('Navigation — Про платформу', () => {
    test('Anon sees expected links in "Про платформу" dropdown', async ({
      mainPage,
    }) => {
      await test.step('Verify all dropdown links are present in DOM', async () => {
        for (const link of NAV_LABELS.proPlatformu) {
          await expect(mainPage.header.navDropdownLink(link)).toBeAttached();
        }
      });
    });
  });

  test.describe('Navigation — Новини', () => {
    test('Anon sees the "Новини" link in navigation', async ({ mainPage }) => {
      await test.step('Verify "Новини" link is visible', async () => {
        await expect(mainPage.header.novynyLink).toBeVisible();
      });
    });

    test('Anon is redirected to the blog when clicking "Новини"', async ({
      mainPage,
    }) => {
      await test.step('Verify "Новини" link points to /uk/blog/', async () => {
        await expect(mainPage.header.novynyLink).toHaveAttribute(
          'href',
          URLS.blog,
        );
      });
    });
  });

  test.describe('Auth buttons (non-authenticated)', () => {
    test('Anon sees login and register buttons when not authenticated', async ({
      mainPage,
    }) => {
      await test.step('Verify "Увійти" button is visible', async () => {
        await expect(mainPage.header.loginButton).toBeVisible();
      });

      await test.step('Verify "Зареєструватися" button is visible', async () => {
        await expect(mainPage.header.registerButton).toBeVisible();
      });
    });
  });

  test.describe('Hamburger menu', () => {
    test('Anon can access hamburger menu for mobile navigation', async ({
      mainPage,
    }) => {
      await test.step('Verify hamburger menu button is present in DOM', async () => {
        await expect(mainPage.header.hamburgerMenu).toBeAttached();
      });
    });
  });
});
