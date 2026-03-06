import { test, expect } from '../../src/fixtures/base.fixture.js';
import {
  generateRegisterUser,
  saveRegisterUser,
} from '../../src/utils/generators/userGenerator.js';
import { createInbox } from '../../src/utils/mailslurp/createInbox.js';
import { waitForActivationEmail } from '../../src/utils/mailslurp/waitForActivationEmail.js';
import { extractActivationLink } from '../../src/utils/mailslurp/extractActivationLink.js';
import { URLS } from '../../src/test-data/urls.js';

test.describe('@auth', () => {
  test('@smoke user can register with MailSlurp email', async ({
    registerPage,
    page,
  }) => {
    const inbox = await createInbox();
    const user = generateRegisterUser();
    user.email = inbox.emailAddress;
    user.inboxId = inbox.inboxId;
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

  test('@regression user can register, activate account and login', async ({
    registerPage,
    loginPage,
    page,
  }) => {
    const inbox = await createInbox();
    const user = generateRegisterUser();
    user.email = inbox.emailAddress;
    user.inboxId = inbox.inboxId;
    saveRegisterUser(user);

    await test.step('Fill and submit registration form', async () => {
      await registerPage.fillPersonalInfo(user);
      await registerPage.fillLocation(user);
      await registerPage.fillStatuses(user);
      await registerPage.fillCredentials(user);
      await registerPage.acceptTerms();
      await registerPage.submit();
      await expect(page).toHaveURL(new RegExp(URLS.confirmEmail));
    });

    const email = await test.step('Wait for activation email', async () => {
      return waitForActivationEmail(inbox.inboxId);
    });

    await test.step('Verify email content', async () => {
      expect(email.subject).toContain('Активація');
      expect(email.body).toContain('активації');
    });

    const activationLink =
      await test.step('Extract activation link', async () => {
        return extractActivationLink(email.body!);
      });

    await test.step('Open activation link', async () => {
      await page.goto(activationLink);
    });

    await test.step('Verify account activation', async () => {
      await expect(
        page.getByRole('heading', { name: 'Вітаємо на платформі!' }),
      ).toBeVisible();
    });

    await test.step('Login with activated account', async () => {
      await loginPage.open();
      await loginPage.login(user.email, user.password);
    });

    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(new RegExp(URLS.homepage));
    });
  });
});
