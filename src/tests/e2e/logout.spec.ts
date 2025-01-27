import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { HomePage } from '../pages/HomePage';
import { TestUtils } from '../utils/TestUtils';

test.describe('Testing User Logout Functionality', async () => {
  let authPage: AuthPage;
  let homePage: HomePage;
  const testData = await TestUtils.getTestData('../data/userData.json');

  // Perform login setup before each test
  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    homePage = new HomePage(page);
    await authPage.loginUser(testData.users[0].email, testData.users[0].password);
  });

  // Test case to verify successful logout
  test('Should log out the user successfully', async () => {
    await authPage.logoutUser();
    expect(await authPage.verifyLoginPage()).toBe(true);
  });
});
