import { Page, expect } from '@playwright/test';
import { DashboardPageLocators } from '../locators/DashboardPageLocators';

export class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyDashboardForRole(role: String) {
    if (role === 'Admin') {
      await expect(this.page.locator(DashboardPageLocators.adminSubTab)).toBeVisible();
    } else if (role === 'Agent') {
    await expect(this.page.locator(DashboardPageLocators.agentSubTab)).toBeVisible();
    } else if (role === 'User') {
    await expect(this.page.locator(DashboardPageLocators.userSubTab)).toBeVisible();
    }
  }
}
