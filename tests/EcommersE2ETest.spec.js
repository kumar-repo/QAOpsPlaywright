const { test, expect } = require('@playwright/test');


test('Login page and capture', async ({ page }) => {
     //Page Objects
     const userName = page.locator("#userEmail");
     const passwordFiled = page.locator("[type='password']");
     const email = "anshika@gmail.com";
     const passwordkey = "Iamking@000";
     const loginButton = page.locator("[type='submit']");
     const productName = "iphone 13 pro";
     const allProductList = page.locator(".card-body b");
     const product = page.locator(".card-body");
     const productCheckOut = page.locator("div.ng-star-inserted li button");


     //launch Test website
     await page.goto("https://rahulshettyacademy.com/client");
     console.log(await page.title());


     //user actions on web page
     // login page actions
     await userName.fill(email);
     await passwordFiled.fill(passwordkey);
     await loginButton.click();

     // networkidle() is flaky so use waitFor()
     await allProductList.first().waitFor();
     //await page.waitForLoadState('networkidle');
     //capturing all product name text from webpage later we can iterate to find required product
     const titles = await allProductList.allTextContents();
     console.log(titles);
     // select iphone 13 pro product
     const count = await product.count();
     for (let i = 0; i < count; i++) {
          const productTitle = await product.nth(i).locator("b").textContent()
          if (productTitle === productName) {
               console.log("selected product name : \n" + productTitle)
               //add product to card if it matches
               await product.nth(i).locator("text=Add To Cart").click();
               break;
          }
     }
     //go to cart to check
     await page.locator("[routerlink*='cart']").click();

     // wait for all list of orders to showup until first order is loded in order page
     await page.locator("div li").first().waitFor();

     // make sure correct product is ordered
     const checkStatus = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
     expect(checkStatus).toBeTruthy();

     //click on check out
     await productCheckOut.click();

     //enter credit card details
     await page.locator("div.field input[type='text'][class*='txt']").first().fill("2222 9999 3333 0000");
     await page.locator("select.ddl").first().selectOption("07");
     await page.locator("select.ddl").nth(1).selectOption("29");
     const nameOnCard = page.locator(".field").filter({ hasText: "Name on Card" }).locator("input");
     await nameOnCard.fill("Yuva Kumar");
     const coupon = page.locator(".field").filter({ hasText: "Apply Coupon" }).locator("input");
     await coupon.fill("DISCOUNT10");
     const cvv = page.locator(".field").filter({ hasText: "CVV Code" }).locator("input");
     await cvv.fill("123");
     const applyCoupon = page.locator("button.mt-1");
     await applyCoupon.click();
     const couponMsg = page.locator("p.mt-1[style*='red']");
     await couponMsg.waitFor({ state: "visible" });
     const couponStatus = await couponMsg.textContent();
     console.log(couponStatus);

     // selecting country from suggestin dropdown
     await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
     const dropdown = page.locator(".ta-results");
     await dropdown.waitFor();
     const optionsCount = await dropdown.locator("button").count();
     for (let i = 0; i < optionsCount; ++i) {
          const text = await dropdown.locator("button").nth(i).textContent();
          if (text === " India") {
               await dropdown.locator("button").nth(i).click();
               break;
          }
     }
     //assertion user email id
     expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
     //click on place order button
     await page.locator(".action__submit").click();

     //checking order status page whether order is placed or not by checking status message
     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

     // capture order id number form status page
     const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
     //console.log("purchased product order id:" + " " + orderId);

     const cleanOrderId = orderId.split('|')[1].trim();
     console.log("purchased product order id: " + cleanOrderId);

     //go to orders page to check order status
     await page.locator("button[routerlink*='myorders']").click();
     // wait until all orders are loaded - waitfor() wait until tboady is loabed means all orders are displayed under tbody table
     await page.locator("tbody").waitFor();
     const rows = await page.locator("tbody tr");

     //check whether purcased product order id is matching in table -iterate through each order id in table to match

     for (let i = 0; i < await rows.count(); ++i) {
          const rowOrderId = await rows.nth(i).locator("th").textContent();
          if (orderId.includes(rowOrderId)) {
               // once order id match click on view button
               await rows.nth(i).locator("button").first().click();
               break;
          }
     }

     //makes sure order id exisitng order summary page after clicking on view button
     const orderIdDetails = await page.locator(".col-text").textContent();
     expect(orderId.includes(orderIdDetails)).toBeTruthy();

     // use for debug mode
     //await page.pause();

});
