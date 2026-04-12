import { Page,Locator } from "@playwright/test";

export class OrderConfirmation {
    page:Page;      
        orderId:Locator;
        myOrdersButton:Locator;
        orderTable:Locator;
        orderTableRows:Locator;
        orderIdDetails:Locator;
        orderIdNumber:any;
        cleanOrderId:any;
    constructor(page:Page) {
        this.page = page;
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersButton = page.locator("button[routerlink*='myorders']");
        this.orderTable = page.locator("tbody");
        this.orderTableRows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }

    async getOrderId() {
        const orderIdNumber:any = await this.orderId.textContent();
        const cleanOrderId = orderIdNumber.split('|')[1].trim();
        console.log("purchased product order id: " + cleanOrderId);
        return cleanOrderId;


    }

    async navigateToMyOrders() {
        await this.myOrdersButton.click();
        await this.orderTable.waitFor();
    }

    async findOrderIdInTable(orderId:any) {
        await this.navigateToMyOrders();
        for (let i = 0; i < await this.orderTableRows.count(); ++i) {
            const rowOrderId = await this.orderTableRows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                // once order id match click on view button
                await this.orderTableRows.nth(i).locator("button").first().click();
                break;
            }
        }

    }
}
module.exports = { OrderConfirmation };