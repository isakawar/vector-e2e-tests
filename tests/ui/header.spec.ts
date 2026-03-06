import { test, expect } from '../../fixtures/base.fixture.js';

const kabinetDropdownLinks = [
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

const pidtrymkaDropdownLinks = [
  'Довідковий центр Вектор',
  'Направити звернення',
  'Онбординг',
  'Вектор Бот',
] as const;

const proPlatformuDropdownLinks = [
  'Що таке Вектор',
  'Політика приватності',
  'Політика Cookies',
  'Умови використання',
  'Принципи співпраці',
  'Контакти',
] as const;

test.describe('Header on main page (when logged out)', () => {
  test('User sees the header on the main page', async ({ mainPage }) => {
    await test.step('Verify header section is visible', async () => {
      await expect(mainPage.header.root).toBeVisible();
    });
  });

  test.describe('Logo', () => {
    test('User sees the logo in the header', async ({ mainPage }) => {
      await test.step('Verify logo image is visible', async () => {
        await expect(mainPage.header.logo).toBeVisible();
      });
    });

    test('User is redirected to homepage when clicking the logo', async ({
      mainPage,
    }) => {
      await test.step('Verify logo link is visible', async () => {
        await expect(mainPage.header.logoLink).toBeVisible();
      });

      await test.step('Verify logo link points to homepage', async () => {
        await expect(mainPage.header.logoLink).toHaveAttribute('href', '/');
      });
    });
  });

  test.describe('Navigation — Кабінет професійного зростання', () => {
    test('User sees the "Кабінет" section in main navigation', async ({
      mainPage,
    }) => {
      await test.step('Verify top-level "Кабінет" link is visible', async () => {
        await expect(mainPage.header.kabinetLink).toBeVisible();
      });
    });

    test('User sees expected links in "Кабінет професійного зростання" dropdown', async ({
      mainPage,
    }) => {
      await test.step('Verify all dropdown links are present in DOM', async () => {
        for (const link of kabinetDropdownLinks) {
          await expect(mainPage.header.navDropdownLink(link)).toBeAttached();
        }
      });
    });
  });

  test.describe('Navigation — Підтримка', () => {
    test('User sees expected links in "Підтримка" dropdown', async ({
      mainPage,
    }) => {
      await test.step('Verify all dropdown links are present in DOM', async () => {
        for (const link of pidtrymkaDropdownLinks) {
          await expect(mainPage.header.navDropdownLink(link)).toBeAttached();
        }
      });
    });
  });

  test.describe('Navigation — Про платформу', () => {
    test('User sees expected links in "Про платформу" dropdown', async ({
      mainPage,
    }) => {
      await test.step('Verify all dropdown links are present in DOM', async () => {
        for (const link of proPlatformuDropdownLinks) {
          await expect(mainPage.header.navDropdownLink(link)).toBeAttached();
        }
      });
    });
  });

  test.describe('Navigation — Новини', () => {
    test('User sees the "Новини" link in navigation', async ({ mainPage }) => {
      await test.step('Verify "Новини" link is visible', async () => {
        await expect(mainPage.header.novynyLink).toBeVisible();
      });
    });

    test('User is redirected to the blog when clicking "Новини"', async ({
      mainPage,
    }) => {
      await test.step('Verify "Новини" link points to /uk/blog/', async () => {
        await expect(mainPage.header.novynyLink).toHaveAttribute(
          'href',
          '/uk/blog/',
        );
      });
    });
  });

  test.describe('Auth buttons (non-authenticated)', () => {
    test('User sees login and register buttons when not authenticated', async ({
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
    test('User can access hamburger menu for mobile navigation', async ({
      mainPage,
    }) => {
      await test.step('Verify hamburger menu button is present in DOM', async () => {
        await expect(mainPage.header.hamburgerMenu).toBeAttached();
      });
    });
  });
});
