import { test} from '@playwright/test';
import { datajson } from '../dataFiles/ProposalData';
import { PlaywrightDevPage } from '../defenition/PlaywrightDevPage';
let data,mobileNumber
data =Object.values(datajson);


// test('capture seesion ', async ({ page }) => {
//     //const mobile = new BasePage()
//   let  mobileNumber = '9650867130'
//     const playwrightDev = new lifeBuyDevPage(page);
//     await playwrightDev.proceedToOtpPagewebProd(mobileNumber);
//     await page.waitForTimeout(7000);
//     //await page.goto("https://www.ackodev.com/profile");
//     await page.context().storageState({path :"user.json"});
  
//    });

//    test('used the relogin number', async ({ browser }) => {
   
//     const context = await browser.newContext({ storageState: "user.json" });
//     const page = await context.newPage();
//     await page.goto("https://www.acko.com/profile");
//     let num = await page.locator("(//p[text()='Mobile number']//following::p)").first().textContent();
//     console.log(num ,mobileNumber);
   
  
//    });

test('Prod buy organic journey testing',async ({ browser }) =>{
    const context = await browser.newContext({ storageState: "user.json" });
     const page = await context.newPage();
    const playwrightDev = new PlaywrightDevPage(page);
    await page.goto("https://www.acko.com/gi/p/health/segment");
    await playwrightDev.navigateSegementPage("Organic");
    await playwrightDev.FillInputDetailsPageGmc();
    await playwrightDev.selectSumInsured('Organic','₹50L');
    await playwrightDev.memberdetailsProd('monthly');
    await page.waitForTimeout(7000);
   

});