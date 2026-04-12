const { LoginPage } = require('../pageobject/loginpage');
const { DashboardPage } = require('../pageobject/DashboardPage');
const { VerifyProductAndCheckOut } = require('../pageobject/VerfiyProductAndCheckOut');
const{OrderConfirmation} = require('../pageobject/OrderConfirmation');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.verifyProductAndCheckOut = new VerifyProductAndCheckOut(this.page);
        this.orderConfirmation = new OrderConfirmation(this.page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getVerifyProductAndCheckOut() {
        return this.verifyProductAndCheckOut;
    }
    getOrderConfirmation() {
        return this.orderConfirmation;
    }
}
module.exports = { POManager };