import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TestUtils } from '../utils/TestUtils';

test.describe.parallel('User Role Login Tests', async () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;
  const testData = await TestUtils.getTestData('../data/userData.json');

  // Initialize required pages before each test
  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
  });

  // Loop through test data and perform login tests for each user role
  for (const user of testData.users) {
    test(`Verify login functionality for role: ${user.role}`, async ({ page }) => {
      await authPage.loginUser(user.email, user.password);
      await expect(page).toHaveURL('/dashboard');
      await dashboardPage.verifyDashboardForRole(user.role);
    });
  }
});
