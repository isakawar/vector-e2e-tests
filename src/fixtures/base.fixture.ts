import { test as base } from '@playwright/test';
import { MainPage } from '../pageObjects/MainPage.js';
import { RegisterPage } from '../pageObjects/RegisterPage.js';
import { LoginPage } from '../pageObjects/LoginPage.js';

type Fixtures = {
  mainPage: MainPage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await use(mainPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await use(registerPage);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
