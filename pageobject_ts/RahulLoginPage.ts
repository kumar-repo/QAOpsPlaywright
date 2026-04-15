import { Page, Locator, expect } from '@playwright/test';

export class RahulLoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly adminRadio: Locator;
  readonly userRadio: Locator;
  readonly termsCheckbox: Locator;
  readonly signInButton: Locator;
  readonly modalOkayButton: Locator;
  readonly mainTitle: Locator;
  readonly shopHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
    this.adminRadio = page.getByRole('radio', { name: 'Admin' });
    this.userRadio = page.getByRole('radio', { name: 'User' });
    this.termsCheckbox = page.getByRole('checkbox', { name: /I Agree to the terms/ });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.modalOkayButton = page.getByRole('button', { name: 'Okay' });
    // Use strict locator for ProtoCommerce link only
    this.mainTitle = page.getByRole('link', { name: 'ProtoCommerce', exact: true });
    // Also expose the main heading for fallback
    this.shopHeading = page.getByRole('heading', { level: 1, name: 'Shop Name' });
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.userRadio.click();
    // Robustly handle modal if it appears
    try {
      await this.modalOkayButton.waitFor({ state: 'visible', timeout: 2000 });
      await this.modalOkayButton.click();
    } catch (e) {
      // Modal did not appear, continue
    }
    await this.termsCheckbox.click();
    await this.signInButton.click();
  }

  async waitForMainTitle() {
    // Wait for either the ProtoCommerce link or Shop Name heading
    try {
      await this.mainTitle.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      await this.shopHeading.waitFor({ state: 'visible', timeout: 5000 });
    }
  }
}
