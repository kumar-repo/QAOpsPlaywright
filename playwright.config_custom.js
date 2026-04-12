// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { workers } from 'node:cluster';
import { trace } from 'node:console';
import { TIMEOUT } from 'node:dns';
import { permission } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  // run fail test 10 retries before marking test as failed
  //retries:10,
  // to run number of test in parallel by default it is 5 but we can set to 6 or more to run test sequentially
  // test files are run in parallel but test steps inside test file are run sequentially
  //workers:6,
  
  /*Maximum time one test can run for. */
timeout:40*1000,

expect:{
  timeout:3000,
},
  reporter: 'html',
  projects:[
{
  name:'chromium',
  use:{
  browserName :'chromium',
  headless: false,
  screenshot:'only-on-failure',
  trace:'on',
  // to run test in specific viewport/window size
  //viewport:{width:1280, height:720},
  // to run test in mobile view
  //...devices['iphone 11']
  //to ignore https error in case of self signed certificate or any other certificate issue 
  //it click on advance and continue to unsafe site in case of certificate issue
  //ignorehttpserrors:true
  //to accept loaction pop up
  //permissions:['geolocation']
  // to record video of test execution while failure and save in specified path
  //video:'on-first-retry',

}
},
{
  name:'safari',
  use:{
  browserName :'webkit',
  headless: false,
  screenshot:'only-on-failure',
  trace:'on'
}
}

  ]

});
module.exports=config
