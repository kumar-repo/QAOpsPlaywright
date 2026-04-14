const {test} = require ('@playwright/test');

test('Launch google page', async ({browser})=>
{
    const context =await browser.newContext();
    const page =await context.newPage();
     page.goto("https://www.google.com/");
});
// test('Launch page', async ({page})=>
// {
//      await page.goto("https://www.google.com/");
// });