import { Page } from '@playwright/test';
import { AuthPageLocators } from '../locators/AuthPageLocators';
import { TestUtils } from '../utils/TestUtils';

export class AuthPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToRegistration() {
    await this.page.goto('/register');
  }

  async navigateToLogin() {
    await this.page.goto('/');
    await this.page.locator(AuthPageLocators.loginLink).click();
  }

  async registerUser() {
    await this.navigateToRegistration();
    let userData = TestUtils.generateFakeUserData();
    await this.page.locator(AuthPageLocators.usernameField).fill(userData.username);
    await this.page.locator(AuthPageLocators.emailField).fill(userData.email);
    await this.page.locator(AuthPageLocators.phoneNumber).fill(userData.phoneNumber);
    await this.page.locator(AuthPageLocators.passwordField).fill(userData.password);
    await this.page.locator(AuthPageLocators.confirmPasswordField).fill(userData.password);
    await this.page.locator(AuthPageLocators.submitButton).click();
  }

  async loginUser(email: string, password: string) {
    await this.navigateToLogin();
    await this.page.locator(AuthPageLocators.emailField).fill(email);
    await this.page.locator(AuthPageLocators.passwordField).fill(password);
    await this.page.locator(AuthPageLocators.submitButton).click();
  }

  async logoutUser() {
    await this.page.locator(AuthPageLocators.profileIcon).click();
    await this.page.locator(AuthPageLocators.logoutButton).click();
  }

  async verifyLoginPage() {
    return this.page.locator(AuthPageLocators.loginPageHeader).isVisible();
  }
}
