import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Testing Home Page Functionality', () => {
  let homePage: HomePage;

  // navigate to home before each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  // Test case to verify search funactionality
  test('Should display the correct homepage title', async ({ page }) => {
    expect(await homePage.verifyPageTitle()).toContain('RealEstate');
    await homePage.performSearch('Berlin', '1000', '2000');
    await expect(page).toHaveURL('/search');
  });
});
