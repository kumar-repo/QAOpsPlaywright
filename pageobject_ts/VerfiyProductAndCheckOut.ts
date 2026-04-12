import { Page,Locator,test,expect } from "@playwright/test";

//const { test, expect } = require('@playwright/test');
export class VerifyProductAndCheckOut {
page:Page;
productCheckOut:Locator;
cardNumber:Locator;
expMonth:Locator;
expYear:Locator;
nameOnCard:Locator;
coupon:Locator;
cvv:Locator;
applyCoupon:Locator;
couponMsg:Locator;
selectCountry:Locator;
cartProduct:Locator;


    constructor(page:Page) {
        this.page = page;
        this.productCheckOut = page.locator("div.ng-star-inserted li button");
        this.cardNumber = page.locator("div.field input[type='text'][class*='txt']").first();
        this.expMonth = page.locator("select.ddl").first();
        this.expYear = page.locator("select.ddl").nth(1);
        this.nameOnCard = page.locator(".field").filter({ hasText: "Name on Card" }).locator("input");
        this.coupon = page.locator(".field").filter({ hasText: "Apply Coupon" }).locator("input");
        this.cvv = page.locator(".field").filter({ hasText: "CVV Code" }).locator("input");
        this.applyCoupon = page.locator("button.mt-1");
        this.couponMsg = page.locator("p.mt-1[style*='red']");
        this.selectCountry = page.locator("[placeholder*='Country']");
        this.cartProduct = this.page.locator("div li").first();

    }
    async checkProductAndCheckOut(productName: string) {
        //const checkStatus = this.page.locator(`h3:has-text("${productName}")`);
        await this.cartProduct.waitFor();
        const status = await this.getProductLocator(productName).isVisible();
        await this.getProductLocator(productName).isVisible();
        expect(status).toBeTruthy();
        await this.productCheckOut.click();

    }
    getProductLocator(productName: string) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

    async enterBillingInfo(cardNumber: string, expMonth: string, expYear: string, nameOnCard: string, couponCode: string, cvv: string) {
        await this.cardNumber.fill(cardNumber);
        await this.expMonth.selectOption(expMonth);
        await this.expYear.selectOption(expYear);
        await this.nameOnCard.fill(nameOnCard);
        await this.coupon.fill(couponCode);
        await this.cvv.fill(cvv);
        await this.applyCoupon.click();
        await this.couponMsg.waitFor({ state: "visible" });
        const couponStatus = await this.couponMsg.textContent();
        console.log(couponStatus);
    }

    async shippingCountrySelection(countryName: string) {

        await this.selectCountry.pressSequentially("ind", { delay: 150 });
        const dropdown = this.page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text === countryName) {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

    }
    async placeOrder() {

        //click on place order button
        await this.page.locator(".action__submit").click();
    }

}
module.exports = { VerifyProductAndCheckOut };