//const base=require('@playwright/test');
import {test as baseTest} from '@playwright/test';
interface TestData {
    email: string;
    passwordkey: string;
    productName: string;
}
export const customTest=baseTest.extend <{ testDataFixture: TestData }>({
    testDataFixture: {
          email: "ksmvp@gmail.com",
        passwordkey: "Test@123",
        productName: "iphone 13 pro"
    }
}
)
