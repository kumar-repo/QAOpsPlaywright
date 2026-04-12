const base=require('@playwright/test');
exports.customtest=base.test.extend({
    testDataFixture: {
          email: "ksmvp@gmail.com",
        passwordkey: "Test@123",
        productName: "iphone 13 pro"
    }
}
)
