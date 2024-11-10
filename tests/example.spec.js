// @ts-check
const { test, expect } = require('@playwright/test');
import { decodeQRCode } from '../utilitize/qr.js';
const { runTest } = require('../utilitize/appium.js');

test('Connecting to web and mobile flow', async ({ page }) => {
  
   await page.goto("/verifier")
   
   await page.getByText("Biometric Verification").click()
   await page.locator("#email").fill("grootantes@gmail.com")
   await page.locator("#verify_button").click()
   await page.waitForTimeout(5000)
   const frameloc = await page.frameLocator("#ez-iframe")
   //console.log(await frameloc.locator("#retryBtn").textContent())
   //console.log(await frameloc.locator("#qr-code").getAttribute("src"))
   await page.waitForTimeout(5000)

   // Your data URL
  const dataUrl = await frameloc.locator("#qr-code").getAttribute("src");  // Shortened for readability
  //console.log(await decodeQRCode(dataUrl))
   await runTest(await decodeQRCode(dataUrl)).catch(console.error);
  //console.log(mess)
  console.log("Game over")
  

    
  });
