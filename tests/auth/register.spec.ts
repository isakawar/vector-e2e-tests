import { test, expect } from '../../src/fixtures/base.fixture.js';
import {
  generateRegisterUser,
  saveRegisterUser,
} from '../../src/utils/userGenerator.js';
import { URLS } from '../../src/test-data/urls.js';

test.describe('@auth', () => {
  test('@smoke user can register', async ({ registerPage, page }) => {
    const user = generateRegisterUser();
    saveRegisterUser(user);

    await test.step('Fill personal info', async () => {
      await registerPage.fillPersonalInfo(user);
    });

    await test.step('Fill location', async () => {
      await registerPage.fillLocation(user);
    });

    await test.step('Fill IDP and disability statuses', async () => {
      await registerPage.fillStatuses(user);
    });

    await test.step('Fill credentials', async () => {
      await registerPage.fillCredentials(user);
    });

    await test.step('Accept terms and privacy policy', async () => {
      await registerPage.acceptTerms();
    });

    await test.step('Submit registration', async () => {
      await registerPage.submit();
    });

    await test.step('Verify redirect to email confirmation', async () => {
      await expect(page).toHaveURL(new RegExp(URLS.confirmEmail));
    });
  });
});
