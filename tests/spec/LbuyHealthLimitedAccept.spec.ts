import { test} from '@playwright/test';
import { PlaywrightDevPage } from '../defenition/PlaywrightDevPage';
import { datajson } from '../dataFiles/limitedEligibiltyData';
import BasePage from "../utils/basePage"
let data
data =Object.values(datajson);


test('E2E organic journey testing with limited eligibilty when user has selected 10 Lakh standard flow ', async ({ page }) => {
    test.slow()
  const mobile = new BasePage()
let mobileNumber = mobile.mobileNumber();
   const playwrightDev = new PlaywrightDevPage(page);
   await playwrightDev.journeyFlow('Organic');
   await playwrightDev.selectFamilyMember(data[0]);
   await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
   await playwrightDev.selectSumInsured('Organic','₹50L') // ₹25L, ₹1Cr,Unlimited
   await playwrightDev.proceedToOtpPage(mobileNumber);
   await playwrightDev.MemberDetailsGeneric(data[0])
   await playwrightDev.updateCreditScoreLimitedEligibility(data[0]);
  await playwrightDev.standardscreen()
  //await playwrightDev.PaymentFrequency("Monthly")
   //await playwrightDev.Payment('Standard');
  
   });

   test('E2E organic journey testing with limited eligibilty when user has selected platnium unlimited flow ', async ({ page }) => {
    test.slow()
  const mobile = new BasePage()
let mobileNumber = mobile.mobileNumber();
   const playwrightDev = new PlaywrightDevPage(page);
   await playwrightDev.journeyFlow('Organic');
   await playwrightDev.selectFamilyMember(data[0]);
   await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
   await playwrightDev.organicPlatnium('Unlimited') //₹1Cr,Unlimited
   await playwrightDev.proceedToOtpPage(mobileNumber);
   await playwrightDev.MemberDetailsGeneric(data[0])
   await playwrightDev.updateCreditScoreLimitedEligibility(data[0]);
  await playwrightDev.standardPlatniumscreen()
  //await playwrightDev.PaymentFrequency("Monthly")
  // await playwrightDev.Payment('Standard');
  
   });
   test('E2E organic journey testing with limited eligibilty when user has selected platnium 1cr flow ', async ({ page }) => {
    test.slow()
  const mobile = new BasePage()
let mobileNumber = mobile.mobileNumber();
   const playwrightDev = new PlaywrightDevPage(page);
   await playwrightDev.journeyFlow('Organic');
   await playwrightDev.selectFamilyMember(data[0]);
   await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
   await playwrightDev.organicPlatnium('₹1Cr') //₹1Cr,Unlimited
   await playwrightDev.proceedToOtpPage(mobileNumber);
   await playwrightDev.MemberDetailsGeneric(data[0])
   await playwrightDev.updateCreditScoreLimitedEligibility(data[0]);
  await playwrightDev.standardPlatniumscreen()
 // await playwrightDev.PaymentFrequency("Monthly")
  // await playwrightDev.Payment('Standard');
  
   });