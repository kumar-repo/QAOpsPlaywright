const {test,expect} = require ('@playwright/test');


test('Launch page', async ({page})=>
{
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log(await page.title());
    //await expect(page).toHaveTitle("QA Automation");
     await page.locator("#username").fill("rahulshetty");
     await page.locator("[type='password']").fill("lear");
       await page.locator("#signInBtn").click();
       console.log(await page.locator("[style*='block']").textContent());
       await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});