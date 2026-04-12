const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName) {
    // Find the product by accessible heading, not by h5/css assumptions
    const productHeading = this.page.getByRole('heading', {
      name: productName,
      exact: true
    });

    // Wait until the product exists on the page
    await expect(productHeading).toHaveCount(1, { timeout: 30000 });

    // Find the first Add To Cart button that comes after this heading
    const addToCartButton = productHeading.locator(
      'xpath=following::button[normalize-space()="Add To Cart"][1]'
    );

    await expect(addToCartButton).toBeVisible({ timeout: 30000 });
    await addToCartButton.click();
  }

  async nagivateToCart() {
    await this.cart.click();
  }
}

module.exports = { DashboardPage };