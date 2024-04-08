import {  test} from '@playwright/test';
import { PlaywrightDevPage } from '../defenition/PlaywrightDevPage';
import BasePage from "../utils/basePage";
import { createDataForLife} from  '../api/test/lifeDataCreation'

test.beforeEach(async ({ page }) => {
  test.slow()
    const mobile = new BasePage()
    let mobileNumber = mobile.mobileNumber();
    createDataForLife(mobileNumber);
    console.log(mobileNumber);
    const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.proceedToOtpPageweb(mobileNumber);
     await playwrightDev.navigateToLifeJourney();

  });


test('E2E simple journey of life buy journey ', async ({ page }) => {
    test.slow()
     const playwrightDev = new PlaywrightDevPage(page);
     await playwrightDev.segementCommonJourney('Male','27');
     await playwrightDev.recomendationJourneyIntro('Non-recommendation');
     await playwrightDev.smokerQuestion('no');
     await playwrightDev.addonLife('no');
    await playwrightDev.enterEmailAndDob();

   
     });