// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { trace } from 'node:console';
import { TIMEOUT } from 'node:dns';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  /*Maximum time one test can run for. */
timeout:40*1000,

expect:{
  timeout:3000,
},
  reporter: 'html',
  /* Run tests in files in parallel */
use:{
  browserName :'chromium',
  headless: false,
  screenshot:'only-on-failure',
  trace:'on'
}
});
module.exports=config
