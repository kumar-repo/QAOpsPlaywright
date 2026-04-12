//const { expect } = require('@playwright/test');

import { Page , Locator} from "@playwright/test";

export class LoginPage {

    page:Page;
    username:Locator;
    password:Locator;
    loginButton:Locator;
    //products:Locator;

constructor (page:Page) {
    this.page = page;
    this.username = page.locator("#userEmail");
    this.password = page.locator("[type='password']");
    this.loginButton = page.locator("[type='submit']");
    //this.products = page.locator(".card-body");
}

async login (email: string, passwordkey: string) {
    await this.username.type(email);
    await this.password.type(passwordkey);
    await this.loginButton.click();
    //wait for network idle after login to load dashboard page is loaded
    await this.page.waitForLoadState('networkidle');
     //await expect(this.products.first()).toBeVisible();
}
async goto () {
   await this.page.goto("https://rahulshettyacademy.com/client");
   //await allProductList.first().waitFor();
}

}

module.exports = { LoginPage }  ;