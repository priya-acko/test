import { expect, test} from '@playwright/test';
import { PlaywrightDevPage } from './PlaywrightDevPage';
import { datajson } from './Data/ProposalData';
import BasePage from "./basePage"

test('E2E simple journey of life buy journey ', async ({ page }) => {
    test.slow()
    const playwrightDev = new PlaywrightDevPage(page);
    let mobileNumber = "6074363213"
    await playwrightDev.proceedToOtpPageweb(mobileNumber);
    await playwrightDev.journeyFlow('life');
    await playwrightDev.segementCommonJourney('Male','25');
    await playwrightDev.recomendationJourneyIntro('Non-recommendation');
   
    
     });