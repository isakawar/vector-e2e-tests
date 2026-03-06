import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { CookieBanner } from '../components/CookieBanner.js';
import type {
  RegisterUser,
  StatusOption,
} from '../utils/generators/userGenerator.js';

const STATUS_LABELS: Record<StatusOption, string> = {
  yes: 'Так',
  no: 'Ні',
  not_specified: 'Не хочу зазначати',
};

export class RegisterPage extends BasePage {
  readonly cookieBanner: CookieBanner;

  private readonly lastNameInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly middleNameInput: Locator;
  private readonly taxIdInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly termsCheckbox: Locator;
  private readonly privacyCheckbox: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cookieBanner = new CookieBanner(page);
    this.lastNameInput = page.locator('#last_name');
    this.firstNameInput = page.locator('#first_name');
    this.middleNameInput = page.locator('#second_name');
    this.taxIdInput = page.locator('#rnokpp');
    this.emailInput = page.locator('input[name="email"]').first();
    this.passwordInput = page.locator('#password');
    this.termsCheckbox = page.locator('label[for="terms_of_use"]');
    this.privacyCheckbox = page.locator('label[for="privacy_policy"]');
    this.submitButton = page.locator('button.js-go-to-step[type="submit"]');
  }

  async open(): Promise<void> {
    await this.goto('/uk/accounts/register/');
    if (await this.cookieBanner.banner.isVisible()) {
      await this.cookieBanner.accept();
    }
  }

  private async selectSelect2(
    selectName: string,
    label: string,
  ): Promise<void> {
    await this.page
      .locator(`select[name="${selectName}"] + span.select2-container`)
      .click();
    await this.page.locator('.select2-search__field:visible').fill(label);
    await this.page
      .locator(
        '.select2-results__option--highlighted, .select2-results__option',
      )
      .filter({ hasText: label })
      .first()
      .click();
  }

  async fillPersonalInfo(user: RegisterUser): Promise<void> {
    await this.lastNameInput.fill(user.lastName);
    await this.firstNameInput.fill(user.firstName);
    await this.middleNameInput.fill(user.middleName);
    await this.taxIdInput.fill(user.taxId);
  }

  async fillLocation(user: RegisterUser): Promise<void> {
    await this.selectSelect2('region', user.region);
    await expect(
      this.page.locator('[name="administrative_unit"]'),
    ).toBeEnabled();
    await this.selectSelect2('administrative_unit', user.settlementType);
    await expect(this.page.locator('[name="settlement"]')).toBeEnabled();
    await this.selectSelect2('settlement', user.settlement);
  }

  async fillStatuses(user: RegisterUser): Promise<void> {
    await this.selectSelect2(
      'displaced_person_status',
      STATUS_LABELS[user.idpStatus],
    );
    await this.selectSelect2(
      'disability_status',
      STATUS_LABELS[user.disabilityStatus],
    );
  }

  async fillCredentials(user: RegisterUser): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  async acceptTerms(): Promise<void> {
    await this.termsCheckbox.click();
    await this.privacyCheckbox.click();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
