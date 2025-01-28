import { test } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Testing User Registration Flow', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  // Set up pages before each test
  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
  });

  // Test case for user registration
  test('Should successfully register a new user', async () => {
    await authPage.registerUser();
    await dashboardPage.verifyDashboardForRole('User');
  });
});
