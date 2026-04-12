const {test,expect} = require ('@playwright/test');


test('Login page and capture', async ({page})=>
{
     const userName= page.locator("#userEmail");
     const passwordFiled = page.locator("[type='password']");
     const email="anshika@gmail.com";
     const passwordkey="Iamking@000";
     await page.goto("https://rahulshettyacademy.com/client");
     console.log(await page.title());
    //await expect(page).toHaveTitle("QA Automation");
     await userName.fill(email);
     await passwordFiled.fill(passwordkey);
       await page.locator("[type='submit']").click();
       // networkidle() is flaky so use waitFor()
         await page.locator(".card-body b").first().waitFor();
          //await page.waitForLoadState('networkidle');
          const titles = await page.locator(".card-body b").allTextContents();
          console.log(titles); 
   
});