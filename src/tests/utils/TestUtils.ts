import { Page } from 'playwright';
import { join } from 'path';
import { readFileSync } from 'fs';
import { fa, faker } from '@faker-js/faker';

declare const page: Page;

export class TestUtils {
    static async waitForElement(selector: string, timeout = 5000) {
      await page.locator(selector).waitFor({ timeout });
    }

    static async getTestData(filePath: string) {
      const testDataPath = join(new URL(filePath, import.meta.url).pathname);
      return JSON.parse(readFileSync(testDataPath, 'utf-8'));
    }

    static generateFakeUserData() {
      const username = faker.internet.username();
      const email = faker.internet.email();
      const phoneNumber = faker.phone.number();
      const password = faker.internet.password({ length: 12, memorable: false, pattern: /[A-Z]/, prefix: '1!' });
      return { username: username, email: email, phoneNumber: phoneNumber, password: password };
    }
  }
  