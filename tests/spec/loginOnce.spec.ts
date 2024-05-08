import { test} from '@playwright/test';
import {lifeBuyDevPage} from '../defenition/lifeBuyDevPage'
import { datajson } from '../dataFiles/ProposalData';
import BasePage from "../utils/basePage"
let data,mobileNumber
data =Object.values(datajson);


test('capture seesion ', async ({ page }) => {
    const mobile = new BasePage()
   mobileNumber = mobile.mobileNumber();
    const playwrightDev = new lifeBuyDevPage(page);
    await playwrightDev.proceedToOtpPageweb(mobileNumber);
    await page.waitForTimeout(5000);
    //await page.goto("https://www.ackodev.com/profile");
    await page.context().storageState({path :"user.json"});
  
   });

   test('used the relogin number', async ({ browser }) => {
   
    const context = await browser.newContext({ storageState: "user.json" });
    const page = await context.newPage();
    await page.goto("https://www.ackodev.com/profile");
    let num = await page.locator("(//p[text()='Mobile number']//following::p)").first().textContent();
    console.log(num ,mobileNumber);
   
  
   });