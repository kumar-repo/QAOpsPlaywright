// const { LoginPage } = require('../pageobject/loginpage');
// const { DashboardPage } = require('../pageobject/DashboardPage');
// const { VerifyProductAndCheckOut } = require('../pageobject/VerfiyProductAndCheckOut');
// const{OrderConfirmation} = require('../pageobject/OrderConfirmation');

//typescript import
import { VerifyProductAndCheckOut } from '../pageobject_ts/VerfiyProductAndCheckOut';
import { OrderConfirmation } from '../pageobject_ts/OrderConfirmation';
import { DashboardPage } from '../pageobject_ts/DashboardPage';
import { LoginPage } from '../pageobject_ts/LoginPage';
import {  Page } from '@playwright/test';

export class POManager {
    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    verifyProductAndCheckOut:VerifyProductAndCheckOut;
    orderConfirmation:OrderConfirmation;
    page:Page;
    constructor(page:Page) {
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