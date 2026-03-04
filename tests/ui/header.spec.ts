import { test, expect } from '../../fixtures/base.fixture.js';

test.describe('Header on main page (when logged out)', () => {
  test('header section is visible', async ({ mainPage }) => {
    await expect(mainPage.header.root).toBeVisible();
  });

  test.describe('Logo', () => {
    test('logo image is visible', async ({ mainPage }) => {
      await expect(mainPage.header.logo).toBeVisible();
    });

    test('logo links to homepage', async ({ mainPage }) => {
      await expect(mainPage.header.logoLink).toBeVisible();
      await expect(mainPage.header.logoLink).toHaveAttribute('href', '/');
    });
  });

  test.describe('Navigation — Кабінет професійного зростання', () => {
    test('top-level link is visible', async ({ mainPage }) => {
      await expect(mainPage.header.kabinetLink).toBeVisible();
    });

    for (const item of [
      'Можливості підвищення кваліфікації',
      'Онлайн-курси',
      'Проєкти ГХЗВ',
      'Календар можливостей',
      "Суб'єкти підвищення кваліфікації",
      'Заклади освіти',
      'Центри професійного розвитку',
      'Документи про підвищення кваліфікації',
      'Типові програми',
    ] as const) {
      test(`dropdown contains "${item}"`, async ({ mainPage }) => {
        await expect(mainPage.header.navDropdownLink(item)).toBeAttached();
      });
    }
  });

  test.describe('Navigation — Підтримка', () => {
    for (const item of [
      'Довідковий центр Вектор',
      'Направити звернення',
      'Онбординг',
      'Вектор Бот',
    ] as const) {
      test(`dropdown contains "${item}"`, async ({ mainPage }) => {
        await expect(mainPage.header.navDropdownLink(item)).toBeAttached();
      });
    }
  });

  test.describe('Navigation — Про платформу', () => {
    for (const item of [
      'Що таке Вектор',
      'Політика приватності',
      'Політика Cookies',
      'Умови використання',
      'Принципи співпраці',
      'Контакти',
    ] as const) {
      test(`dropdown contains "${item}"`, async ({ mainPage }) => {
        await expect(mainPage.header.navDropdownLink(item)).toBeAttached();
      });
    }
  });

  test.describe('Navigation — Новини', () => {
    test('standalone Новини link is visible', async ({ mainPage }) => {
      await expect(mainPage.header.novynyLink).toBeVisible();
    });

    test('Новини link points to /uk/blog/', async ({ mainPage }) => {
      await expect(mainPage.header.novynyLink).toHaveAttribute(
        'href',
        '/uk/blog/',
      );
    });
  });

  test.describe('Auth buttons (non-authenticated)', () => {
    test('login button is visible', async ({ mainPage }) => {
      await expect(mainPage.header.loginButton).toBeVisible();
    });

    test('register button is visible', async ({ mainPage }) => {
      await expect(mainPage.header.registerButton).toBeVisible();
    });
  });

  test.describe('Hamburger menu', () => {
    test('hamburger button is present in DOM', async ({ mainPage }) => {
      await expect(mainPage.header.hamburgerMenu).toBeAttached();
    });
  });
});
