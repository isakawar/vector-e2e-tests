import { test as base } from '@playwright/test';
import { MainPage } from '../pages/MainPage.js';

type Fixtures = {
  mainPage: MainPage;
};

export const test = base.extend<Fixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await use(mainPage);
  },
});

export { expect } from '@playwright/test';
