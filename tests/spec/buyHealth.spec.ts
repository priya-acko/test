// @ts-check
import { test} from '@playwright/test';
import { PlaywrightDevPage } from '../defenition/PlaywrightDevPage';
import { datajson } from '../dataFiles/ProposalData';
import BasePage from "../utils/basePage"

let data
data =Object.values(datajson);


  test('E2E organic journey testing with standard plan of default selection monthly ', async ({ page }) => {
    test.setTimeout(120000)
  const mobile = new BasePage()
let mobileNumber = mobile.mobileNumber();
   const playwrightDev = new PlaywrightDevPage(page);
   await playwrightDev.journeyFlow('Organic');
   await playwrightDev.selectFamilyMember(data[0]);
   await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
   await playwrightDev.selectSumInsured('Organic','₹50L') // ₹25L, ₹1Cr,Unlimited
   await playwrightDev.proceedToOtpPage(mobileNumber);
   await playwrightDev.MemberDetailsGeneric(data[0])
   await playwrightDev.UpdatingcreditScore('Organic');
   await playwrightDev.PaymentFrequency("Monthly")
   await playwrightDev.Payment('Standard');
  
   });
   test('E2E organic journey testing with standard plan of default selection yearly ', async ({ page }) => {
    test.setTimeout(120000)
    const mobile = new BasePage()
  let mobileNumber = mobile.mobileNumber();
     const playwrightDev = new PlaywrightDevPage(page);
     await playwrightDev.journeyFlow('Organic');
     await playwrightDev.selectFamilyMember(data[0]);
     await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
     await playwrightDev.selectSumInsured('Organic','₹50L') // ₹25L, ₹1Cr,Unlimited
     await playwrightDev.proceedToOtpPage(mobileNumber);
     await playwrightDev.MemberDetailsGeneric(data[0])
     await playwrightDev.UpdatingcreditScore('Organic');
     await playwrightDev.PaymentFrequency("Yearly")
     await playwrightDev.Payment('Standard');
    
     });
  test('E2E testing of unblocked PHP plan yearly ', async ({ page }) => {
   // test.slow()
   test.setTimeout(120000)
    const mobile = new BasePage()
       let mobileNumber = mobile.mobileNumber();
       const playwrightDev = new PlaywrightDevPage(page);
      await playwrightDev.journeyFlow('UnblockedPHP');
      await playwrightDev.selectFamilyMember(data[0]);
      await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
      await playwrightDev.selectSumInsured('UnblockedPHP','Unlimited') // ₹25L, ₹1Cr,Unlimited
      await playwrightDev.proceedToOtpPage(mobileNumber);
      await playwrightDev.MemberDetailsGeneric(data[0])
      await playwrightDev.UpdatingcreditScore('Organic');
      await playwrightDev.PaymentFrequency("yearly")
      await playwrightDev.Payment('Platnium');
      
   });

   test('E2E testing of standard plan yearly  ', async ({ page }) => {
    test.setTimeout(120000)
      const mobile = new BasePage()
            let mobileNumber = mobile.mobileNumber();
       const playwrightDev = new PlaywrightDevPage(page);
       await playwrightDev.journeyFlow('UnblockedAHP');
       await playwrightDev.selectFamilyMember(data[0]);
       await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
      await playwrightDev.selectSumInsured('UnblockedAHP','₹25L') // ₹25L, ₹1Cr,Unlimited
      await playwrightDev.proceedToOtpPage(mobileNumber);
      await playwrightDev.MemberDetailsGeneric(data[0])
      await playwrightDev.UpdatingcreditScore('Organic');
      await playwrightDev.PaymentFrequency("yearly")
      await playwrightDev .Payment('Standard');
       });



       test('E2E testing of standard plan monthly  ', async ({ page }) => {
        test.setTimeout(120000)
        const mobile = new BasePage()
              let mobileNumber = mobile.mobileNumber();
         const playwrightDev = new PlaywrightDevPage(page);
        await playwrightDev.journeyFlow('UnblockedAHP');
        await playwrightDev.selectFamilyMember(data[0]);
        await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
        await playwrightDev.selectSumInsured('UnblockedAHP','₹25L') // ₹25L, ₹1Cr,Unlimited
        await playwrightDev.proceedToOtpPage(mobileNumber);
        await playwrightDev.MemberDetailsGeneric(data[0])
        await playwrightDev.UpdatingcreditScore('Organic');
        await playwrightDev.PaymentFrequency("Monthly")
        await playwrightDev .Payment('Standard');
         });
   test('E2E  testing of topup plan monthly ', async ({ page }) => {
    test.setTimeout(120000)
         const mobile = new BasePage()
            let mobileNumber = mobile.mobileNumber();
          const playwrightDev = new PlaywrightDevPage(page);
          await playwrightDev.journeyFlow('UnblockedTopUp');
          await playwrightDev.selectDeductible("10L")
         await playwrightDev.selectFamilyMember(data[0]);
         await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
         await playwrightDev.selectSumInsured('UnblockedTopUp','1Cr') // ₹25L, ₹1Cr,Unlimited
         await playwrightDev.proceedToOtpPage(mobileNumber);
         await playwrightDev.MemberDetailsGeneric(data[0])
         await playwrightDev.UpdatingcreditScore('Topup');
         await playwrightDev.PaymentFrequency("Monthly")
         await playwrightDev .Payment('Platnium');
            
      });
      test('E2E  testing of topup plan yearly ', async ({ page }) => {
        test.setTimeout(120000)
        const mobile = new BasePage()
           let mobileNumber = mobile.mobileNumber();
         const playwrightDev = new PlaywrightDevPage(page);
         await playwrightDev.journeyFlow('UnblockedTopUp');
         await playwrightDev.selectDeductible("10L")
        await playwrightDev.selectFamilyMember(data[0]);
        await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
        await playwrightDev.selectSumInsured('UnblockedTopUp','1Cr') // ₹25L, ₹1Cr,Unlimited
        await playwrightDev.proceedToOtpPage(mobileNumber);
        await playwrightDev.MemberDetailsGeneric(data[0])
        await playwrightDev.UpdatingcreditScore('Topup');
        await playwrightDev.PaymentFrequency("Yearly")
        await playwrightDev .Payment('Platnium');
           
     });
   test.only('E2E testing of porting journey yearly ', async ({ page }) => {
        test.setTimeout(120000)
            const mobile = new BasePage()
            let mobileNumber =  mobile.mobileNumber();
             const playwrightDev = new PlaywrightDevPage(page);
             await playwrightDev.journeyFlow('Porting');
             await playwrightDev.selectFamilyMember(data[0]);
             await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
            await playwrightDev.selectSumInsured('Porting','Unlimited')  //Unlimited' ,1Cr, 50L,25L,10L
            await playwrightDev.MemberDetailsGeneric(data[0])
            await playwrightDev.UpdatingcreditScore('Porting');
            await playwrightDev.proceedToOtpPage(mobileNumber);
            await playwrightDev.PortingDetails();
            await playwrightDev.PaymentFrequency("Yearly")
            await playwrightDev .Payment('Platnium'); 
            await playwrightDev.fillMedicalQuestionAPI();
            await playwrightDev.fillHeightWeight() 
      });

  
         
    test('E2E testing of ASP journey ', async ({ page }) => {
      test.setTimeout(120000)
            const mobile = new BasePage()
            let mobileNumber = mobile.mobileNumber();
             const playwrightDev = new PlaywrightDevPage(page);
             await playwrightDev.journeyFlow('ASP');
            await playwrightDev.selectFamilyMember(data[0]);
            await playwrightDev.FillInputDetailsPage(mobileNumber,data[0]);
            await playwrightDev.selectSumInsured('ASP','₹ 10L')  //₹ 5L
            await playwrightDev.proceedToOtpPage(mobileNumber);
            await playwrightDev.medicalDetailsQuestion()
            await playwrightDev.MemberDetailsASP(data[0])
           await playwrightDev.UpdatingcreditScore('ASP');
           await playwrightDev.Payment('ASP');  
      });
      test('E2E testing of SEM base journey ', async ({ page }) => {
        test.setTimeout(120000)
        const mobile = new BasePage()
        let mobileNumber = mobile.mobileNumber();
         const playwrightDev = new PlaywrightDevPage(page);
         await playwrightDev.journeyFlow('SEM-Base');
         await playwrightDev.semIntroductionPage();
         await playwrightDev.selectFamilyMemberSEM(data[0]);
         await playwrightDev.FillInputDetailsPageSEM(mobileNumber,data[0],'base');
         await playwrightDev.selectSumInsured('SEM','₹50L') // ₹25L, ₹1Cr,Unlimited
         await playwrightDev.proceedToOtpPage(mobileNumber);
         await playwrightDev.MemberDetailsGeneric(data[0]);
         await playwrightDev.UpdatingcreditScore('Organic');
         await playwrightDev.PaymentFrequency("yearly")
         await playwrightDev.Payment('standard');
    
   });
   test('E2E testing of SEM base comp journey ', async ({ page }) => {
    test.setTimeout(120000)
    const mobile = new BasePage()
    let mobileNumber = mobile.mobileNumber();
     const playwrightDev = new PlaywrightDevPage(page);
     await playwrightDev.journeyFlow('SEM-Base');
     await playwrightDev.semIntroductionPage();
     await playwrightDev.selectFamilyMemberSEM(data[0]);
     await playwrightDev.FillInputDetailsPageSEM(mobileNumber,data[0],'base');
     await playwrightDev.selectSumInsured('SEM','₹50L') // ₹25L, ₹1Cr,Unlimited
     await playwrightDev.proceedToOtpPage(mobileNumber);
     await playwrightDev.MemberDetailsGeneric(data[0]);
     await playwrightDev.UpdatingcreditScore('Organic');
     await playwrightDev.PaymentFrequency("yearly")
     await playwrightDev.Payment('standard');

});
test('E2E testing of SEM topup journey ', async ({ page }) => {
  test.setTimeout(120000)
  const mobile = new BasePage()
  let mobileNumber = mobile.mobileNumber();
   const playwrightDev = new PlaywrightDevPage(page);
   await playwrightDev.journeyFlow('SEM-Topup');
   await playwrightDev.semIntroductionPage();
   await playwrightDev.selectFamilyMemberSEM(data[0]);
   await playwrightDev.FillInputDetailsPageSEM(mobileNumber,data[0],'Topup');
   await playwrightDev.selectSumInsured('SEM-Topup','1Cr')// ₹25L, ₹1Cr,Unlimited
   await playwrightDev.proceedToOtpPage(mobileNumber);
   await playwrightDev.MemberDetailsGeneric(data[0]);
   await playwrightDev.UpdatingcreditScore('topup');
   await playwrightDev.PaymentFrequency("yearly")
   await playwrightDev.Payment('Platnium');

});

      test('E2E testing of gmc number for Platnium product ', async ({ page }) => {
        test.setTimeout(120000)
         let mobileNumber = "6711671004"
          const playwrightDev = new PlaywrightDevPage(page);
          await playwrightDev.loginFlow(mobileNumber);
          await playwrightDev.navigateSegementPage("Organic");
          await playwrightDev.FillInputDetailsPageGmc();
          await playwrightDev.selectSumInsured('Organic','₹50L');
          await playwrightDev.UpdatingcreditScore('GMC');
          await playwrightDev.PaymentFrequency("Yearly")
         await playwrightDev.Payment('Standard');

         
      })
      test('E2E testing of SEO journey ', async ({ page }) => {
        test.setTimeout(120000)
         const mobile = new BasePage()
         let mobileNumber = mobile.mobileNumber();
        const playwrightDev = new PlaywrightDevPage(page);
        await playwrightDev.journeyFlow('SEO');
        await playwrightDev.selectFamilyMemberSEO(data[0])
        await playwrightDev.FillInputDetailsPageSEO(mobileNumber,data[0])
        await playwrightDev.selectSumInsured('SEM','₹50L') // ₹25L, ₹1Cr,Unlimited
        await playwrightDev.proceedToOtpPage(mobileNumber);
        await playwrightDev.MemberDetailsGeneric(data[0]);
        await playwrightDev.UpdatingcreditScore('Organic');
        await playwrightDev.PaymentFrequency("yearly")
        await playwrightDev.Payment('standard');   
      })
         











