import {  test} from '@playwright/test';
import {lifeBuyDevPage} from '../defenition/lifeBuyDevPage'
import BasePage from "../utils/basePage";
import { createDataForLife} from  '../api/test/lifeDataCreation'

test.beforeEach(async ({ page }) => {
  test.slow()
    const mobile = new BasePage()
    let mobileNumber = mobile.mobileNumber();
    createDataForLife(mobileNumber);
    const playwrightDev = new lifeBuyDevPage(page);
    await playwrightDev.proceedToOtpPageweb(mobileNumber);
     await playwrightDev.navigateToLifeJourney();

  });


test('E2E simple journey of life buy journey ', async ({ page }) => {
    test.slow()
     const playwrightDev = new lifeBuyDevPage(page);
      await playwrightDev.segementCommonJourney('Male','27');
      await playwrightDev.recomendationJourneyIntro('Non-recommendation');
      await playwrightDev.smokerQuestion('no');
      await playwrightDev.addonLife('no');
      await playwrightDev.enterEmailAndDob();
      await playwrightDev.reviewPage();
   
     });