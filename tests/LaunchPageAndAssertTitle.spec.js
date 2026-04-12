const {test,expect} = require ('@playwright/test');

test('@web Launch google page', async ({browser})=>
{
    const context =await browser.newContext();
    const page =await context.newPage();
     await page.goto("https://rahulshettyacademy.com/");
     console.log(await page.title());
});
test('@web Launch page', async ({page})=>
{
     await page.goto("https://www.google.com/");
     console.log(await page.title());
     await expect(page).toHaveTitle("Google");
});