import {  test} from '@playwright/test';
import {lifeBuyDevPage} from '../defenition/lifeBuyDevPage'
import BasePage from "../utils/basePage";
import { createDataForLife} from  '../api/test/lifeDataCreation'
let skipTest = true;


test.beforeEach(async ({ page }) => {
  if(!skipTest){
test.slow()
  const mobile = new BasePage()
  let mobileNumber = mobile.mobileNumber();
  createDataForLife(mobileNumber);
  const playwrightDev = new lifeBuyDevPage(page);
  await playwrightDev.proceedToOtpPageweb(mobileNumber);
   await playwrightDev.navigateToLifeJourney();
}

});



test('E2E rejection journey of life buy journey ', async ({ page }) => {
    test.slow()
   const playwrightDev = new lifeBuyDevPage(page);
   const mobileNumber  = "6001091955"
   await playwrightDev.proceedToOtpPageweb(mobileNumber);
   await playwrightDev.navigateToLifeJourney();
    await playwrightDev.segementCommonJourney('Male','27');
    await playwrightDev.rejectionJourney();
    
 
   });


  


test.only('E2E simple journey of life buy journey ', async ({ page }) => {
    test.slow()
     const playwrightDev = new lifeBuyDevPage(page);
      await playwrightDev.segementCommonJourney('Male','27');
      await playwrightDev.recomendationJourneyIntro('Non-recommendation');
      await playwrightDev.smokerQuestion('no');
      await playwrightDev.addonLife('no');
      await playwrightDev.enterEmailAndDob();
      await playwrightDev.reviewPage();
      await playwrightDev.myaccountPage()
   
     });

    //  test('E2E rejection journey of life buy journey ', async ({ page }) => {
    //   test.slow()
    //    const playwrightDev = new lifeBuyDevPage(page);
    //     await playwrightDev.segementCommonJourney('Male','27');
    //     await playwrightDev.recomendationJourneyIntro('Non-recommendation');
    //     await playwrightDev.smokerQuestion('no');
    //     await playwrightDev.addonLife('no');
    //     await playwrightDev.enterEmailAndDob();
    //     await playwrightDev.reviewPage();
    //     await playwrightDev.myaccountPage()
     
    //    });

     test.afterEach(async ({page}) =>{
      skipTest =false;
    console.log("test case executed successfully")
       
     });