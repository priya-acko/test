// @ts-check
import { expect, test} from '@playwright/test';
import { PlaywrightDevPage } from './PlaywrightDevPage';


test.only('Endorsemnet journey with changing the name of the user {Non- financial} change', async ({ page }) => {
    test.slow()
     const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.getPolicyDetails();
    await playwrightDev.endorsemnetUrl();
    await playwrightDev.proceedToOtpPageMweb();
    await playwrightDev.changeNameOfSelf();
    await playwrightDev.uploadDocumnetsNameChange();
     await playwrightDev.reviewPageNameChange();
     await playwrightDev.rejectCreatedEndorsementProposal("namechange");
 

     });
     test('Endorsemnet journey with changing the emailId of the user {Non- financial} change', async ({ page }) => {
        test.slow()
         const playwrightDev = new PlaywrightDevPage(page);
        await playwrightDev.getPolicyDetails();
        await playwrightDev.endorsemnetUrl();
        await playwrightDev.proceedToOtpPageMweb();
        await playwrightDev.memberdetailScreen();
        await playwrightDev.changeEmailID();
        await playwrightDev.noUploadDocumentsEmailChange();
        await playwrightDev.reviewPageEmailChange();
        await playwrightDev.rejectCreatedEndorsementProposal("emailchange");
         });
         test('Endorsemnet journey with adding child in the policy {Financial} change', async ({ page }) => {
            test.slow()
             const playwrightDev = new PlaywrightDevPage(page);
            await playwrightDev.getPolicyDetails();
            await playwrightDev.endorsemnetUrl();
            await playwrightDev.proceedToOtpPageMweb();
            await playwrightDev.memberdetailScreen();
            await playwrightDev.addMember();
            await playwrightDev.uploadDocumnetsMemberAddition();
            await playwrightDev.reviewPageMemberAdditonChange();
            await playwrightDev.paymentEndorsement();
            await playwrightDev.rejectCreatedEndorsementProposal("member addition");
             });
             test('Endorsemnet journey with changing DOB of self in the policy {Financial} change', async ({ page }) => {
                test.slow()
                 const playwrightDev = new PlaywrightDevPage(page);
                await playwrightDev.getPolicyDetails();
                await playwrightDev.endorsemnetUrl();
                await playwrightDev.proceedToOtpPageMweb();
                await playwrightDev.memberdetailScreen();
                await playwrightDev.dobChange();
                await playwrightDev.uploadDocumentsDobChange();
                await playwrightDev.reviewPageMemberAdditonChange();
                await playwrightDev.paymentEndorsement();
                await playwrightDev.rejectCreatedEndorsementProposal("member addition");
                 });
             