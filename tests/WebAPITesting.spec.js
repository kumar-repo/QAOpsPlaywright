const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

//request body payload variables
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;

test.beforeAll(async () => {
    // intilze apicontext before sending API request to service
    const apiContext = await request.newContext();
    // creating object to APIUtils class and send parameters to default constructor
    const apiutils = new APIUtils(apiContext, loginPayLoad);
    //calling createOrder method by pass orderPayload which will add to createOrder request
    response = await apiutils.createOrder(orderPayLoad)
})

//test case validation

test('@API testing - place order', async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    //check if created order is avaible under my order page
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //click on view button after matching the order id and check if same order id is displaye under view page
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});