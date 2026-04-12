//const { test, expect } = require('@playwright/test');
import {test,expect} from '@playwright/test';
//const { POManager } = require('../pageobject/POManager');
import {POManager} from '../pageobject_ts/POManager';
//const { customtest } = require('../utils/test-base');
import { customTest } from '../utils_ts/test-base';  

// best way to avoid any format issue Json -> string-> js object
 const testDataSet = JSON.parse(JSON.stringify(require('../TestData/testdatawithmultipleinputs.json')));

for (const inputData of testDataSet) 
     {
          // to run test parallet inside same test file we can use test.describe.parallel and to run sequentially we can use test.describe
     //test.describe.configure({ mode: 'parallel' });
     // when test are interdependent we can use test.step to run test sequentially inside same test file
     //test.describe.configure({ mode: 'serial' });
test(`@web Client app Login for ${inputData.productName}`, async ({ page }) => 
     {
     //Page Objects
     const email = inputData.email;
     const passwordkey = inputData.passwordkey;
     const productName = inputData.productName;
     const poManager = new POManager(page);
     const loginpage = poManager.getLoginPage();
     await loginpage.goto();
     await loginpage.login(email, passwordkey);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.nagivateToCart();
     const productAndCheckOut = poManager.getVerifyProductAndCheckOut();
     await productAndCheckOut.checkProductAndCheckOut(productName);
     await productAndCheckOut.enterBillingInfo("2222 9999 3333 0000", "07", "29", "Yuva Kumar", "DISCOUNT10", "123");
     await productAndCheckOut.shippingCountrySelection(" India");
     //assertion user email id
     await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
     await productAndCheckOut.placeOrder();

     //checking order status page whether order is placed or not by checking status message
     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
       let orderId: any;
     const orderStatus = poManager.getOrderConfirmation();
      orderId = await orderStatus.getOrderId();
     await orderStatus.findOrderIdInTable(orderId);

     //makes sure order id exisitng order summary page after clicking on view button
     const orderIdDetails = await page.locator(".col-text").textContent();
     expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
     }

     // passing test data through fixture instead of json input file
     // we can customize test execution by using fixture for each individual test case
customTest(`Client app Login with fixture data`, async ({ page, testDataFixture }) => 
     {
     //Page Objects
     const email = testDataFixture.email;
     const passwordkey = testDataFixture.passwordkey;
     const productName = testDataFixture.productName;
     const poManager = new POManager(page);
     const loginpage = poManager.getLoginPage();
     await loginpage.goto();
     await loginpage.login(email, passwordkey);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.nagivateToCart();
     const productAndCheckOut = poManager.getVerifyProductAndCheckOut();
     await productAndCheckOut.checkProductAndCheckOut(productName);
     await productAndCheckOut.enterBillingInfo("2222 9999 3333 0000", "07", "29", "Yuva Kumar", "DISCOUNT10", "123");
     await productAndCheckOut.shippingCountrySelection(" India");
     //assertion user email id
     await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
     await productAndCheckOut.placeOrder();

     //checking order status page whether order is placed or not by checking status message
     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

     const orderStatus = poManager.getOrderConfirmation();
     const orderId = await orderStatus.getOrderId();
     await orderStatus.findOrderIdInTable(orderId);

     //makes sure order id exisitng order summary page after clicking on view button
     const orderIdDetails = await page.locator(".col-text").textContent();
     expect(orderId.includes(orderIdDetails)).toBeTruthy();

})


