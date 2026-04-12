const { POManager } = require('../../pageobject/POManager');
const { Before,BeforeStep,After,AfterStep,Status } = require('@cucumber/cucumber');
const playwright = require('playwright');

Before(async function () {
      //playwright code to launch browser and create page object
    const browser = await playwright.chromium.launch(
        //to open the browser while running the test, we need to set headless to false
        {headless: false}
    );
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(async function () {
console.log("Closing the browser");
});

BeforeStep( async function () {
  // This hook will be executed before all steps in a scenario 
    console.log("verifying functionlaity of Before Step Hook");
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path: 'screenshot1.png'});
  }
});