import {  expect, Page } from '@playwright/test';
import DB from "../utils/db"
import { lifeLocator } from '../locator/buyLifeLocator';
import { healthLocator } from '../locator/buyHealthLocator';
import {getProposalStatus} from '../api/test/getProposalStatus'
import { assert } from 'console';

let proposalID;
export class lifeBuyDevPage {

    page: Page
    constructor(page: Page) {
        this.page = page;
 
    }
    async proceedToOtpPageweb(mobileNumber)
   {
    const {loginButton,loginTextBox ,loginOTPbtn,verificationText,otpFirstCol,otpSecondCol,otpThirdCol,otpFourCol}=lifeLocator(this.page)
    console.log("Mobile number used in automation " +mobileNumber);
      await this.page.goto('https://www.ackodev.com/');
      await loginButton.click();
      await loginTextBox.click();
      await loginTextBox.fill(mobileNumber)
      await this.page.reload();
      await loginTextBox.fill(mobileNumber)
      await loginOTPbtn.click();
      await expect(verificationText).toBeVisible();
      await this.page.waitForTimeout(3000);
      const db = new DB();
    let res = await db.executeQuery(`SELECT template_context_data->>'otp' AS otp FROM sms_report WHERE template_name = 'send_otp_default' AND recipient='${mobileNumber}' AND created_on > NOW()- INTERVAL '800 second' ORDER BY id DESC LIMIT 1`);
      console.log("Getting OTP from DB");
      let otp = res
       console.log(otp[0].otp);
      let otpArray = otp[0].otp.split('')
      await otpFirstCol.fill(otpArray[0])
      await otpSecondCol.fill(otpArray[1])
      await otpThirdCol.fill(otpArray[2])
      await otpFourCol.fill(otpArray[3])

   }
   async rejectionJourney()
   {
    const {rejectionText,gotItBtn} = lifeLocator(this.page)
    await expect(rejectionText).toBeVisible();
    await gotItBtn.click();
    let urlOfackodev  =  this.page.url();
    assert(urlOfackodev ,"https://www.ackodev.com/");



   }
   async navigateToLifeJourney()
{
const {ackoIcon,lifeIcon,exploreLifePlanbtn,btnText,findMyrightCoverage} = lifeLocator(this.page)
    await ackoIcon.click();
    await lifeIcon.click();
    await exploreLifePlanbtn.click();
    await expect(btnText).toContainText('Find my right coverage');
    await expect(btnText).toContainText('Coverage starting at');
    await expect(btnText).toContainText('₹534/month*');
    await findMyrightCoverage.click();
  console.log("we reached to the buy journey of Life");
}

async segementCommonJourney(gender,age)
   {
     const {btnText,maleGender,femaleGender,continueBtn,sliderBtn,pincodeText,textBox} = lifeLocator(this.page)
 
    await expect(btnText).toContainText('Did you know? Women typically pay less for life insurance due to their longer life expectancy.');
    if(gender === 'Male')
    {
      await maleGender.click();
    }
    else
    {
      await femaleGender.click();
    }
    await continueBtn.click();
    await sliderBtn.fill(age);
    await continueBtn.click();
    await pincodeText.fill('100085');
    await continueBtn.click();
    await textBox.first().click();
    await textBox.first().fill('Priya singh');
    await continueBtn.click();
    console.log("fill all the relevant details");

   
   }
   async semIntroductionPage()
   {
    const{btnText}  = healthLocator(this.page)
    await expect(btnText).toContainText('Get tax deductions up to ₹75,000 with ACKO health insurance')
    //await expect(this.page.locator('[id="__next"]')).toContainText('Get your health plan save taxes up to ₹75,000 this year');

   }
   async recomendationJourneyIntro(type)
   {
    const {btnText,nonRecommandationBtn,continueBtn} = lifeLocator(this.page)
    await expect(btnText).toContainText('Great! We have the basics.')

    if(type === 'Non-recommendation')
    {
      await nonRecommandationBtn.click();
    }
    else
    {
      await continueBtn.click();
    }
    console.log("reached to recommandation journey")

   }
   async smokerQuestion(answer)
   {
    const {noSmoke,yesSmoke,showPlanBtn} = lifeLocator(this.page)
    //await expect(this.page.locator('[id="__next"]')).toContainText('Non-smokers typically enjoy lower premiums due to reduced health risks, but rest assured, we have excellent plans for everyone.');
      if(answer =="no")
      {
        await noSmoke.click();
      }
      else
      {
        await yesSmoke.click();
      }
      await showPlanBtn.click();
      console.log("Reached to the smoker question")
    }
    async addonLife(answer)
 {
  const {continueBtn,btnText,noCoverage,basicCoverage,accidentalCoverage} = lifeLocator(this.page)
  await continueBtn.click();
   await expect(btnText).toContainText('A smart way toincrease your coverage')
  if(answer == "no")
  {
    await noCoverage.click();
    await basicCoverage.click();
  }
  else
  {
    await accidentalCoverage.click();

   }
 
  console.log("Reached to add on page")
 }
 async myaccountPage()
 {
  
 }
 async enterEmailAndDob()
   {
    const {dateOfBirthSelector,yearDropdownSelector,yearSelector,monthSelector,dayLocator,emailInputBox,currentYear,reviewButton,payNow} = lifeLocator(this.page)
      await dateOfBirthSelector.click();
      await currentYear.click();
       await yearDropdownSelector.click();
       await yearSelector('1996').click();
       await monthSelector('May').click();
      await dayLocator('10').click();
     let emailId = "priya.singh@acko.tech"
      await emailInputBox.fill(emailId)
      await reviewButton.click();
     
      await this.page.waitForTimeout(1000);
   }

   async getIdFromUrl(url: string) {
    const match = url.match(/[?&]id=([^&]+)/);
  
    return match ? match[1] : null;
}

async getProposalIdFromUrl(url: string) {
    const match = url.match(/[?&]proposal_id=([^&]+)/);
    return match ? match[1] : null;
}
   async reviewPage()
   {
    const {payNow,juspayMock,juspayPamentPage,successButton,paymentPageLocator,appBaner,completeText} =lifeLocator(this.page)
    await payNow.click();
    await this.page.waitForTimeout(3000)
    await expect(paymentPageLocator).toBeVisible();
    await this.page.waitForTimeout(3000)
    let urlOfPaymentPage  =  this.page.url();
    console.log(urlOfPaymentPage)
     let ekey  =await this.getIdFromUrl(urlOfPaymentPage)
      console.log("Ekey of payment page " +ekey);
         await this.page.goto(`https://platform-simulator-frontend-uat.internal.ackodev.com/payments?id=${ekey}`);
       await expect(juspayMock).toBeVisible();
       await expect(juspayPamentPage).toBeVisible();
       await this.page.waitForTimeout(2000)
     await successButton.click();
     await  expect(appBaner).toBeVisible();
     await expect(completeText).toBeVisible()
      let urloflastPage =  this.page.url();
      console.log(urloflastPage);
      proposalID = await this.getProposalIdFromUrl(urloflastPage)
      console.log(proposalID);
   let status   = await getProposalStatus(proposalID);
   console.log(status);
     console.log("Test case passed successfully");

   }
}
  

