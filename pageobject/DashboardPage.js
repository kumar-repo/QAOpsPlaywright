//const { expect } = require('@playwright/test');
class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName) {
        const titles = await this.productsText.allTextContents();
        console.log(titles);

      
        // select iphone 13 pro product
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            const productTitle = await this.products.nth(i).locator("b").textContent();

            if (productTitle === productName) {
                console.log("selected product name : \n" + productTitle)
                //add product to card if it matches
                await this.products.nth(i).locator("text=Add To Cart").click();
                break;
            }

        }
    }
 
    async nagivateToCart() {
         //go to cart to check
     await this.cart.click();
    }
}
module.exports = { DashboardPage }  ;
