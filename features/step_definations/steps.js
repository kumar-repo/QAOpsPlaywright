const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobject/POManager');
const { expect } = require('@playwright/test');
const playwright = require('playwright');

Given('a login to Ecommerce website application with username {string} and password {string}', { timeout: 100 * 1000 }, async function (username, password) {
    

    //mainted below code in hooks.js file to avoid code duplication and to make it reusable for other scenarios as well
    
    //playwright code to launch browser and create page object
    // const browser = await playwright.chromium.launch(
    //     //to open the browser while running the test, we need to set headless to false
    //     {headless: false}
    // );
    // const context = await browser.newContext();
    // this.page = await context.newPage();

    this.email = username;
    const passwordkey = password;

    // this.poManager = new POManager(this.page);
    const loginpage = this.poManager.getLoginPage();
    await loginpage.goto();
    await loginpage.login(this.email, passwordkey);
});


When('Add {string} to the cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.nagivateToCart();
});
Then('verify {string} is displayed in the cart', async function (productName) {
    const productAndCheckOut = this.poManager.getVerifyProductAndCheckOut();
    await productAndCheckOut.checkProductAndCheckOut(productName);
});
When('Enter valid details and place the order', async function () {
    const productAndCheckOut = this.poManager.getVerifyProductAndCheckOut();
    await productAndCheckOut.enterBillingInfo("2222 9999 3333 0000", "07", "29", "Yuva Kumar", "DISCOUNT10", "123");
    await productAndCheckOut.shippingCountrySelection(" India");
    //assertion user email id
    await expect(this.page.locator(".user__name [type='text']").first()).toHaveText(this.email);
    await productAndCheckOut.placeOrder();


});
Then('verify the order is present in the order history', async function () {
    //checking order status page whether order is placed or not by checking status message
    await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    this.orderStatus = this.poManager.getOrderConfirmation();
    const orderId = await this.orderStatus.getOrderId();
    await this.orderStatus.findOrderIdInTable(orderId);
    const orderIdDetails = await this.page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});


Given('a login to Ecommerce2 website application with username {string} and password {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    //await expect(this.page).toHaveTitle("QA Automation");
    await this.page.locator("#username").fill(username);
    await this.page.locator("[type='password']").fill(password);
    await this.page.locator("#signInBtn").click();

});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
