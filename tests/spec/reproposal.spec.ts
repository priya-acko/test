// @ts-check
import {  test} from '@playwright/test';
import { PlaywrightDevPage } from '../defenition/PlaywrightDevPage';
import { datajson } from '../data/ProposalData';
import BasePage from "../utils/basePage"

let data
data =Object.values(datajson);
test('E2E testing of member level loading', async ({ page }) => {
    test.slow()
    test.setTimeout(120000)
    const mobile = new BasePage()
       let mobileNumber = mobile.mobileNumber();
     const playwrightDev = new PlaywrightDevPage(page);
      await playwrightDev.journeyFlow('UnblockedPHP');
      await playwrightDev.selectFamilyMember(data[0]);
      await playwrightDev.FillInputDetailsPage(mobileNumber);
      await playwrightDev.selectSumInsured('UnblockedPHP','Unlimited') // ₹25L, ₹1Cr,Unlimited
      await playwrightDev.proceedToOtpPage(mobileNumber);
      await playwrightDev.MemberDetailsGeneric(data[0])
      await playwrightDev.UpdatingcreditScore('UnblockedPHP');
      await playwrightDev.PaymentFrequency("Yearly")
      await playwrightDev.Payment('Platnium');
      await playwrightDev.fillMedicalQuestionAPI();
      await playwrightDev.fillHeightWeight();
      await playwrightDev.memberLoading();
      await playwrightDev.goToReproposalCTA();
      await playwrightDev.repropsalLoading();

    });
    test.only('E2E testing of member level waiting period', async ({ page }) => {
      test.slow()
      test.setTimeout(120000)
      const mobile = new BasePage()
         let mobileNumber = mobile.mobileNumber();
       const playwrightDev = new PlaywrightDevPage(page);
        await playwrightDev.journeyFlow('Organic');
        await playwrightDev.selectFamilyMember(data[0]);
        await playwrightDev.FillInputDetailsPage(mobileNumber);
        await playwrightDev.selectSumInsured('Organic','₹50L') 
        await playwrightDev.proceedToOtpPage(mobileNumber);
        await playwrightDev.MemberDetailsGeneric(data[0])
        await playwrightDev.UpdatingcreditScore('Organic');
        await playwrightDev.PaymentFrequency("Yearly")
        await playwrightDev.Payment('Standard');
        await playwrightDev.fillMedicalQuestionAPI();
        await playwrightDev.fillHeightWeight();
        await playwrightDev.memberWaitingPeriod()
        // await playwrightDev.goToReproposalCTA();
        // await playwrightDev.repropsalLoading();
  
      });