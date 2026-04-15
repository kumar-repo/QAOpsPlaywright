import { test, expect } from '@playwright/test';
import { POManager } from '../pageobject_ts/POManager';

// Unique nickname for this test: "RahulLoginPOTest"
test.describe('Rahul Login Page - POM', () => {
  test('should login successfully and see main page title', async ({ page }) => {
    const poManager = new POManager(page);
    const rahulLoginPage = poManager.getRahulLoginPage();

    await rahulLoginPage.goto();
    await rahulLoginPage.login('rahulshettyacademy', 'Learning@830$3mK2');
    await rahulLoginPage.waitForMainTitle();

    // Validate main page title or heading is visible (strict mode safe)
    if (await rahulLoginPage.mainTitle.isVisible()) {
      await expect(rahulLoginPage.mainTitle).toBeVisible();
      await expect(rahulLoginPage.mainTitle).toHaveText('ProtoCommerce');
    } else {
      await expect(rahulLoginPage.shopHeading).toBeVisible();
      await expect(rahulLoginPage.shopHeading).toHaveText('Shop Name');
    }
  });
});
