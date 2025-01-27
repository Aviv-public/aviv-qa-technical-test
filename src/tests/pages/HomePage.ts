import { Page } from '@playwright/test';
import { HomePageLocators } from '../locators/HomePageLocators';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHome() {
    await this.page.goto('/');
  }

  async verifyPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async performSearch(location: string, minPrice: string, maxPrice: string) {
    await this.page.locator(HomePageLocators.locationInput).fill(location);
    await this.page.locator(HomePageLocators.minPriceInput).fill(minPrice);
    await this.page.locator(HomePageLocators.maxPriceInput).fill(maxPrice);
    await this.page.locator(HomePageLocators.searchButton).click();
  }
}
