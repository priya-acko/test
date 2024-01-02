// @ts-check
import { expect, test} from '@playwright/test';
import { PlaywrightDevPage } from './PlaywrightDevPage';
import { datajson } from './Data/ProposalData';
import BasePage from "./basePage"

let data
data =Object.values(datajson);

  test('E2E organic journey testing with standard plan of default selection ', async ({ page }) => {
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
   await playwrightDev .Payment();

   });
  test('E2E testing of unblocked PHP plan  ', async ({ page }) => {
   test.slow()
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
     await playwrightDev.PaymentFrequency("Monthly")
     await playwrightDev.Payment();
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
      await playwrightDev.PaymentFrequency("Monthly")
      await playwrightDev .Payment();
    
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
         await playwrightDev .Payment();
            
      });
   test('E2E testing of porting jounrney ', async ({ page }) => {
            test.slow()
            const mobile = new BasePage()
            let mobileNumber = mobile.mobileNumber();
             const playwrightDev = new PlaywrightDevPage(page);
             await playwrightDev.journeyFlow('Porting');
             await playwrightDev.selectFamilyMember(data[0]);
            await playwrightDev.FillInputDetailsPage(mobileNumber);
            await playwrightDev.selectSumInsured('Porting','Unlimited')  //Unlimited' ,1Cr, 50L,25L,10L
            await playwrightDev.proceedToOtpPage(mobileNumber);
            await playwrightDev.MemberDetailsGeneric(data[0])
            await playwrightDev.UpdatingcreditScore('Porting');
            await playwrightDev.PortingDetails();
            await playwrightDev.PaymentFrequency("Monthly")
            await playwrightDev .Payment();  
      });

  
         
    test.only('E2E testing of ASP jounrney ', async ({ page }) => {
            test.slow()
            const mobile = new BasePage()
            let mobileNumber = mobile.mobileNumber();
             const playwrightDev = new PlaywrightDevPage(page);
             await playwrightDev.journeyFlow('ASP');
            await playwrightDev.selectFamilyMember(data[0]);
            await playwrightDev.FillInputDetailsPage(mobileNumber);
            await playwrightDev.selectSumInsured('ASP','₹ 10L')  //Unlimited' ,1Cr, 50L,25L,10L
            await playwrightDev.proceedToOtpPage(mobileNumber);
            await playwrightDev.medicalDetailsQuestion()
            await playwrightDev.MemberDetailsASP(data[0])
           await playwrightDev.UpdatingcreditScore('Porting');
            //await playwrightDev.PaymentFrequency("Monthly")
           // await playwrightDev .Payment();  
      });
         





//         test.slow()
//    const playwrightDev = new PlaywrightDevPage(page);
//    await playwrightDev.journeyFlow('UnblockedAHP');
//    //await playwrightDev.selectDeductible("10L")
//    await playwrightDev.selectFamilyMember(data[0]);
// //   await playwrightDev.FillInputDetailsPage(data[0],'UnblockedTopUp');
// //   await playwrightDev.selectSumInsured('₹25L') // ₹25L, ₹1Cr,Unlimited
// //    await playwrightDev.proceedToOtpPage();
// //     await playwrightDev.MemberDetailsGeneric(data[0])
//    // await playwrightDev.MemberDetailsPage();
//    // await playwrightDev.PortingDetails();
//    // await playwrightDev.PaymentFrequency("Monthly")
//    // await playwrightDev .Payment()


//    })
//    test("Verfiy proposal creation for platnium plan for unblocked php for 10L sum insured ", async ({ page }) => {
//       test.slow()
//  const playwrightDev = new PlaywrightDevPage(page);
//  await playwrightDev.journeyFlow('UnblockedAHP');
//  //await playwrightDev.selectDeductible("10L")
//  await playwrightDev.selectFamilyMember(data[0]);
// //   await playwrightDev.FillInputDetailsPage(data[0],'UnblockedTopUp');
// //   await playwrightDev.selectSumInsured('₹25L') // ₹25L, ₹1Cr,Unlimited
// //    await playwrightDev.proceedToOtpPage();
// //     await playwrightDev.MemberDetailsGeneric(data[0])
//  // await playwrightDev.MemberDetailsPage();
//  // await playwrightDev.PortingDetails();
//  // await playwrightDev.PaymentFrequency("Monthly")
//  // await playwrightDev .Payment()


//  })
      
// });


