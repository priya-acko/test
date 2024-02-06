// @ts-check
import { expect, test} from '@playwright/test';
import { PlaywrightDevPage } from './PlaywrightDevPage';
import { datajson } from './Data/ProposalData';
import BasePage from "./basePage"

let data
data =Object.values(datajson);

  test.only('E2E organic journey testing with standard plan of default selection ', async ({ page }) => {
  test.slow()
  const mobile = new BasePage()
let mobileNumber = mobile.mobileNumber();
   const playwrightDev = new PlaywrightDevPage(page);
   await playwrightDev.journeyFlow('Organic');
   await playwrightDev.selectFamilyMember(data[0]);
   await playwrightDev.FillInputDetailsPage(mobileNumber);
   await playwrightDev.selectSumInsured('Organic','₹50L') // ₹25L, ₹1Cr,Unlimited
   await playwrightDev.proceedToOtpPage(mobileNumber);
   await playwrightDev.MemberDetailsGeneric(data[0])
   await playwrightDev.UpdatingcreditScore('Organic');
   await playwrightDev.PaymentFrequency("Monthly")
   await playwrightDev.Payment('Standard');
   await playwrightDev.BmiDetails(data[0]);
   await playwrightDev.medicalDetailsQuestion()
  
   });
  test('E2E testing of unblocked PHP plan  ', async ({ page }) => {
   test.slow()
  // test.setTimeout(120000)
    const mobile = new BasePage()
      let mobileNumber = mobile.mobileNumber();
       const playwrightDev = new PlaywrightDevPage(page);
      await playwrightDev.journeyFlow('UnblockedPHP');
      await playwrightDev.selectFamilyMember(data[0]);
      await playwrightDev.FillInputDetailsPage(mobileNumber);
      await playwrightDev.selectSumInsured('UnblockedPHP','Unlimited') // ₹25L, ₹1Cr,Unlimited
      await playwrightDev.proceedToOtpPage(mobileNumber);
      await playwrightDev.MemberDetailsGeneric(data[0])
      await playwrightDev.UpdatingcreditScore('Organic');
      await playwrightDev.PaymentFrequency("yearly")
      await playwrightDev.Payment('Platnium');
      await playwrightDev.fillMedicalQuestionAPI();
      await playwrightDev.fillHeightWeight()
     // await playwrightDev.acceptMember();
         //await playwrightDev.memberWaitingPeriod();
          //await playwrightDev.goToReproposalCTA();
          //await playwrightDev.repropsalLoading();
   });

   test('E2E testing of standard plan ', async ({ page }) => {
      test.slow()
      const mobile = new BasePage()
            let mobileNumber = mobile.mobileNumber();
       const playwrightDev = new PlaywrightDevPage(page);
       await playwrightDev.journeyFlow('UnblockedAHP');
       await playwrightDev.selectFamilyMember(data[0]);
      await playwrightDev.FillInputDetailsPage(mobileNumber);
      await playwrightDev.selectSumInsured('UnblockedAHP','₹25L') // ₹25L, ₹1Cr,Unlimited
      await playwrightDev.proceedToOtpPage(mobileNumber);
      await playwrightDev.MemberDetailsGeneric(data[0])
      await playwrightDev.UpdatingcreditScore('Organic');
      await playwrightDev.PaymentFrequency("yearly")
      await playwrightDev .Payment('Standard');
      await playwrightDev.BmiDetails(data[0]);
      await playwrightDev.medicalDetailsQuestion()
      
    
       });
   test('E2E  testing of topup plan ', async ({ page }) => {
         test.slow()
         const mobile = new BasePage()
            let mobileNumber = mobile.mobileNumber();
          const playwrightDev = new PlaywrightDevPage(page);
          await playwrightDev.journeyFlow('UnblockedTopUp');
          await playwrightDev.selectDeductible("10L")
         await playwrightDev.selectFamilyMember(data[0]);
         await playwrightDev.FillInputDetailsPage(mobileNumber);
         await playwrightDev.selectSumInsured('UnblockedTopUp','1Cr') // ₹25L, ₹1Cr,Unlimited
         await playwrightDev.proceedToOtpPage(mobileNumber);
         await playwrightDev.MemberDetailsGeneric(data[0])
         await playwrightDev.UpdatingcreditScore('Organic');
         await playwrightDev.PaymentFrequency("Monthly")
         await playwrightDev .Payment('Platnium');
         await playwrightDev.fillMedicalQuestionAPI();
         await playwrightDev.fillHeightWeight()
       
            
      });
   test('E2E testing of porting jounrney ', async ({ page }) => {
            test.slow()
            const mobile = new BasePage()
            let mobileNumber =  mobile.mobileNumber();
             const playwrightDev = new PlaywrightDevPage(page);
             await playwrightDev.journeyFlow('Porting');
             await playwrightDev.selectFamilyMember(data[0]);
            await playwrightDev.FillInputDetailsPage(mobileNumber);
            await playwrightDev.selectSumInsured('Porting','Unlimited')  //Unlimited' ,1Cr, 50L,25L,10L
            await playwrightDev.proceedToOtpPage(mobileNumber);
            await playwrightDev.MemberDetailsGeneric(data[0])
            await playwrightDev.UpdatingcreditScore('Porting');
            await playwrightDev.PortingDetails();
            await playwrightDev.PaymentFrequency("yearly")
            await playwrightDev .Payment('Platnium'); 
            await playwrightDev.fillMedicalQuestionAPI();
            await playwrightDev.fillHeightWeight() 
      });

  
         
    test('E2E testing of ASP jounrney ', async ({ page }) => {
            test.slow()
            const mobile = new BasePage()
            let mobileNumber = mobile.mobileNumber();
             const playwrightDev = new PlaywrightDevPage(page);
             await playwrightDev.journeyFlow('ASP');
            await playwrightDev.selectFamilyMember(data[0]);
            await playwrightDev.FillInputDetailsPage(mobileNumber);
            await playwrightDev.selectSumInsured('ASP','₹ 10L')  //₹ 5L
            await playwrightDev.proceedToOtpPage(mobileNumber);
            await playwrightDev.medicalDetailsQuestion()
            await playwrightDev.MemberDetailsASP(data[0])
           await playwrightDev.UpdatingcreditScore('ASP');
           await playwrightDev.Payment('ASP');  
      });
      test('E2E testing of gmc number for Platnium product ', async ({ page }) => {
         test.slow()
         const mobile = new BasePage()
         let mobileNumber = "6018980018"
          const playwrightDev = new PlaywrightDevPage(page);
          await playwrightDev.loginFlow(mobileNumber);
          await playwrightDev.navigateSegementPage("Organic");
          await playwrightDev.FillInputDetailsPageGmc();
          await playwrightDev.selectSumInsured('Organic','₹50L');
          await playwrightDev.UpdatingcreditScore('GMC');
          await playwrightDev.PaymentFrequency("Yearly")
         await playwrightDev.Payment('Standard');
      })
         











