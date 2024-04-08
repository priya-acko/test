import {  expect, Page } from '@playwright/test';
import DB from "../utils/db"
import axios from "axios";
import { assert } from 'console';
import BasePage from "../utils/basePage";
import { lifeLocator } from '../locator/buyLifeLocator';
import { healthLocator } from '../locator/buyHealthLocator';
 //const ifeJourneyLocators = require('../tests/locator/buyLifeLocator');
  //import {helpers } from "../tests/locator/buyLifeLocator"
 // import { buttonLocator } from '../tests/locator/buyLifeLocator';


let customerData={};
let proposalid;
let userDetails=[{}]
let value =  [
  {
      "type": "under_writer",
      "group_code": "140 (M60-M79)",
      "group_name": "Other enthesopathies",
      "group_display_name": "Other enthesopathies",
      "declared_ped": true,
      "peds": [
          {
              "id": "ebd13f77-6b74-4b74-81e8-42be07b954f4",
              "ped_name": "Medial epicondylitis",
              "icd_code": "M77.0",
              "ped_code": "99",
              "display_name": "Golfer's elbow",
              "definition": "Medial epicondylitis, also called golfer's elbow, is tendinopathy of the medial common flexor tendon of the elbow due to overload or overuse."
          }
      ],
      "clauses": [
          {
              "name": "Loading",
              "type": "loading",
              "unit": "percentage",
              "value": "10"
          }
      ]
  }
]
let waitingPeriod =[
  {
      "type": "under_writer",
      "group_code": "140 (M60-M79)",
      "group_name": "Other enthesopathies",
      "group_display_name": "Other enthesopathies",
      "declared_ped": true,
      "peds": [
          {
              "id": "ebd13f77-6b74-4b74-81e8-42be07b954f4",
              "ped_name": "Medial epicondylitis",
              "icd_code": "M77.0",
              "ped_code": "99",
              "display_name": "Golfer's elbow",
              "definition": "Medial epicondylitis, also called golfer's elbow, is tendinopathy of the medial common flexor tendon of the elbow due to overload or overuse."
          }
      ],
      "clauses": [
        {
            "name": "Waiting period",
            "type": "waiting_period",
            "unit": "year",
            "value": "2"
        }
    ]
  }
]
let locators ;
export class PlaywrightDevPage {

 page: Page
    constructor(page: Page) {
        this.page = page;
 
    }


async  SelectMembersDetailsASP(data)
    {
        await this.page.getByRole('button', { name: 'Select and customize' }).click();
        let familyMembers =Object.keys(data.family);  
        for(let i in familyMembers )
        {
         
         switch(familyMembers[i])
           {
             case  "Myself" :
               break;
             
               case "Spouse" :
                {
                  if(data.family.Spouse.age!='')
                  {
                    await  this.page.locator('div').filter({ hasText: /^SpouseAdd$/ }).getByRole('button').click();
                
                  }  
               break;
                }
        
             case "Child" :{

                await this.page.locator('div').filter({ hasText: /^ChildAdd$/ }).getByRole('button').click();   
                  
                    break; 
             } 
             case "Child1" :
               {
                await this.page.locator('div').filter({ hasText: /^ChildAdd$/ }).getByRole('button').click();  
                 break;
               }
               case "Child2" : 
               {
                await this.page.getByRole('button', { name: 'plus' }).click(); 
                 break;
               } 
               case "Child3" : 
               {
                await this.page.getByRole('button', { name: 'plus' }).click(); 
                 break;
               } 
               case "Child4" :
                 {
                    await this.page.getByRole('button', { name: 'plus' }).click(); 
                 break;
                 } 
                }
            }    
        


    }

    async medicalDetailsQuestion()
    {
      const{disclamirText,continueBtn,smokeTabacooQs,noAnswer,alchoalQs,diagonsedMedicalCondition,noMedicalConditionOption,prescribedText,
        experincingSymptoms,noSymptomsOption,suregeryText,noAns,
        pregQues,ongoingHealthIssue,confirmationQuestion,iConirmBtn}  = healthLocator(this.page)
        await expect(disclamirText).toBeVisible()     // Disclmair page
        await continueBtn.click(); 
        await expect(smokeTabacooQs).toBeVisible() // tobacco page
        await noAnswer.click();
        await continueBtn.click(); 
        await expect(alchoalQs).toBeVisible() // Alchoal Page
        await noAnswer.click()
        await continueBtn.click(); 
        await expect(diagonsedMedicalCondition).toBeVisible() // Medical condition page
        await noMedicalConditionOption.click();
        await continueBtn.click(); 
        await expect(prescribedText).toBeVisible() // prescribed medicines page
        await noAns.click()
        await continueBtn.click(); 
        await expect(experincingSymptoms).toBeVisible() // experncing symptoms page
        await noSymptomsOption.click();
        await continueBtn.click(); 
        await expect(suregeryText).toBeVisible() // has hospitalized page
        await noAns.click();
        await continueBtn.click();
        await expect(pregQues).toBeVisible() //preganat page 
        await noAnswer.click()
        await continueBtn.click();
        await expect(ongoingHealthIssue).toBeVisible() // DoctorVisit page
        await noAnswer.click()
        await continueBtn.click();
        await expect(confirmationQuestion).toBeVisible()
        await iConirmBtn.click();
    }
    async endorsemnetUrl()
    {
      //let policyId = "ec1dff3d-75ba-4f53-b020-b15c8eb13fd8"
      let policyId = "16210cb2-e87b-4430-b87a-76b9ff97e734"
     let  endorsementUrl ="https://www.ackodev.com/p/health/endorsement/membersDetail?policy_id="+policyId 
     await this.page.goto(endorsementUrl);

    }
    async getPolicyDetails() {

      //let policyId = "ec1dff3d-75ba-4f53-b020-b15c8eb13fd8"
      let policyId = "16210cb2-e87b-4430-b87a-76b9ff97e734"
      const policyService = "https://policy-service-layer.internal.ackodev.com/policies/" +policyId;
      let policyData = await  axios.get(policyService);
      let premium = policyData.data.policy.premium.amount;
      let phone= policyData.data.users[0].phone;
      let name = policyData.data.users[0].name;
      let email =policyData.data.users[0].email;
    let paymentFrequency = policyData.data.policy.payment_frequency
  let memberCount = policyData.data.insured.length
  console.log("the number of member in proposal " +memberCount) ;
  let ageArray=[3]
  for(let i=0;i<memberCount;i++)
  {
      let agePerson= policyData.data.insured[i].person.age
      ageArray.push(agePerson);

  }
  customerData ={
    "name": name,
    "phone_Number" : phone,
    "premium" : premium,
    "email" : email,
    "frequency":paymentFrequency,
    "ageMember" : ageArray
  }

console.log(customerData);
    
  }
  async calculateMemberAdditionPrice()
  {

  }
   async navigateSegementPage(Journey)
   {
    const{gmcClick,buyaNewPlan,portingJourney,portingLessThantwoMonths,topupJourney,seeAllAckoHealthPlan,standardPlan,selectAndCustomizeBtn,arogyaSanjevini,platniumPlan}  = healthLocator(this.page)
      await gmcClick.click();
      await this.page.waitForTimeout(2000);
      

      if(Journey === 'Organic')
      {
       // await this.page.locator('div').filter({ hasText: 'Buy a new planCover uninsured' }).nth(3).click();
      // await this.page.getByRole('img', { name: 'cheveron' }).first().click();
       await buyaNewPlan.click();

      }
      else if (Journey ==='Porting')
    {
      await portingJourney.click();
      await portingLessThantwoMonths.click();
   
    }
    else if (Journey === 'UnblockedTopUp')
    { 
      await topupJourney.click();
    
    }
    else if (Journey === 'UnblockedAHP')
  {
    await seeAllAckoHealthPlan.click();
    await standardPlan.click();
    await selectAndCustomizeBtn.click();
  }
  else if (Journey ==='ASP')
  {
    await seeAllAckoHealthPlan.click();
    await arogyaSanjevini.click();
    await selectAndCustomizeBtn.click();
   
  }
  else
  {
    await seeAllAckoHealthPlan.click();
    await platniumPlan.click();
    await selectAndCustomizeBtn.click();
  }

   }
   async enterEmailAndDob()
   {
    const {dateOfBirthSelector,yearDropdownSelector,yearSelector,monthSelector,dayLocator,emailInputBox,currentYear,reviewButton,payNow} = lifeLocator(this.page)
      await dateOfBirthSelector.click();
      await currentYear.click();
       await yearDropdownSelector.click();
       await yearSelector('1996').click();
       await monthSelector('May').click();
      await dayLocator('1').click();
      const email= new BasePage();
      let emailId = email.randomName(4)
      emailId = "priya.singh+"+emailId+"@acko.tech"
      await emailInputBox.fill(emailId)
      await reviewButton.click();
     
      await this.page.waitForTimeout(4000);
   }
   async reviewPage()
   {
    const {payNow} =lifeLocator(this.page)
    await payNow.click();
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
   async selectFamilyMemberSEO(data)
   {
    const{spouseSEM,childSEM,childSEMtwo,multiChildSEM,parentSEM,multiParentSEM,parentInLawSEM,parentInLawTwo}  = healthLocator(this.page)
    let familyMembers =Object.keys(data.family);
    for(let i in familyMembers )
    {
     
     switch(familyMembers[i])
       {
         case  "Myself" :
           break;
         
           case "Spouse" :
            {
              if(data.family.Spouse.age!='')
              {
                await spouseSEM.click();
                console.log("spouse is selcted")
            
              }  
           break;
            }
    
         case "Child" :{

             await childSEM.click();
              console.log("one child is selcted")  
              
                break; 
         } 
         case "Child1" :
           {
            await childSEMtwo.click();  
            console.log("one child is selcted")  
             break;
           }
           case "Child2" : 
           {
            await multiChildSEM.click();
            console.log("two child is selcted")  
             break;
           } 
           case "Child3" : 
           {
            await multiChildSEM.click();
            console.log("three child is selcted")  
             break;
           } 
           case "Child4" :
             {
              await multiChildSEM.click(); 
              console.log("four child is selcted") 
             break;
             }     
             case "parent1" :  
             {
              if(data.family.parent1.age!='')
              {
                await parentSEM.click();
                console.log("one parent  is selcted")
              }
                  break;
             }
    
             case "parent2" :
              {
                if(data.family.parent2.age!='')
                {
                  await multiParentSEM.click();
                  console.log("two parent  is selcted")
                }
                   break;
              }
    
             case "parentInLaw1" : 
               
                  {
                    if(data.family.parentInLaw1.age!='')
                    {
                      await parentInLawSEM.click();
                      console.log("one parentinLAW  is selcted")
                    }
                     break; 
                  } 
                  
                  case "parentInLaw2" : 
                  {
                    if(data.family.parentInLaw2.age!='')
                    {
                        await parentInLawTwo.click();
                        console.log("two parentinLAW  is selcted")
                    }
                    break;
                  }
       }
     }

   }
   async selectFamilyMemberSEM(data)
   {
    const{spouseSelectSEM,childSelectSEM,plusBtn,parentSEM,multiParent,parentInLawSEM,multiParentInLaw}  = healthLocator(this.page)
    let familyMembers =Object.keys(data.family);  
        for(let i in familyMembers )
        {
         
         switch(familyMembers[i])
           {
             case  "Myself" :
               break;
             
               case "Spouse" :
                {
                  if(data.family.Spouse.age!='')
                  {
                    await spouseSelectSEM.click();
                    console.log("spouse is selcted")
                
                  }  
               break;
                }
        
             case "Child" :{

              await childSelectSEM.click(); 
              console.log("one child is selcted")  
                  
                    break; 
             } 
             case "Child1" :
               {
               await childSelectSEM.click();  
                console.log("one child is selcted")  
                 break;
               }
               case "Child2" : 
               {
                await plusBtn.click();
                console.log("two child is selcted")  
                 break;
               } 
               case "Child3" : 
               {
                await plusBtn.click();
                console.log("three child is selcted")  
                 break;
               } 
               case "Child4" :
                 {
                  await plusBtn.click(); 
                  console.log("four child is selcted") 
                 break;
                 }     
                 case "parent1" :  
                 {
                  if(data.family.parent1.age!='')
                  {
                    await parentSEM.click();
                    console.log("one parent  is selcted")
                  }
                      break;
                 }
        
                 case "parent2" :
                  {
                    if(data.family.parent2.age!='')
                    {
                      await multiParent.click();
                      console.log("two parent  is selcted")
                    }
                       break;
                  }
        
                 case "parentInLaw1" : 
                   
                      {
                        if(data.family.parentInLaw1.age!='')
                        {
                          await parentInLawSEM.click();
                          console.log("one parentinLAW  is selcted")
                        }
                         break; 
                      } 
                      
                      case "parentInLaw2" : 
                      {
                        if(data.family.parentInLaw2.age!='')
                        {
                            await multiParentInLaw.click();
                            console.log("two parentinLAW  is selcted")
                        }
                        break;
                      }
           }
         }

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
    async journeyFlow(journey)
    {
        if(journey == 'UnblockedPHP')
  {
    await this.page.goto("https://www.ackodev.com/p/health/inputDetails?journey=unblocked_php");
   
  }
  else if (journey =='Porting')
  {
    await this.page.goto("https://www.ackodev.com/p/health/inputDetails?journey=porting");
  }
  else if (journey == 'endorsement')
  {
    await this.page.goto("https://www.ackodev.com/p/health/endorsement/membersDetail?policy_id=ba9fb760-4111-4adb-8ad3-d7113452c913");
    
  }
  else if (journey == 'SEO')
  {
    await this.page.goto("https://www.ackodev.com/health-insurance/");
    
  }
  else if (journey ==='life')
  {
    await this.page.goto("https://www.ackodev.com/life/p/segment");
    
  }
  else if (journey == 'SEM-Base')
  {
    await this.page.goto("https://www.ackodev.com/gi/p/health/buy-base");
    
  }

  else if (journey == 'SEM-Base-comp')
  {
    await this.page.goto("https://www.ackodev.com/gi/p/health/buy-base-comp");
    
  }
  else if (journey == 'SEM-Topup')
  {
    await this.page.goto("https://www.ackodev.com/gi/p/health/semBuyV3Topup");
    
  }

  else if (journey== 'UnblockedTopUp')
  {
    await this.page.goto("https://www.ackodev.com/p/health/inputDetails?journey=unblocked_topup");
    
  }
  else if (journey == 'BlockedTopup')
  {
    await this.page.goto("https://www.ackodev.com/p/health/buy?journey=blocked_topup");
  }
  else if (journey == 'Enrollement')
  {
    await this.page.goto("https://www.ackodev.com/p/health/enrollment/packageGroupsGmc");
  }
  else if (journey =='ASP')
  {
    await this.page.goto("https://www.ackodev.com/p/health/as/inputDetails");
   
  }
  else if (journey == 'UnblockedAHP')
  {
    await this.page.goto("https://www.ackodev.com/p/health/inputDetails?journey=unblocked_ahp");
  }
  else if(journey == 'endorsemnet')
  {
    await this.endorsemnetUrl();
  }
  else
  {
    await this.page.goto("https://www.ackodev.com/p/health/inputDetails?journey=organic");
  }
  await this.page.waitForTimeout(1000)
  console.log("Script is going to the " +journey+" page");

    }
    async selectDeductible(amount)
    {
       
      const{selectDeductible} = healthLocator(this.page)
        await selectDeductible.click();
        await this.page.getByText(amount ,{ exact: true }).click();

    }
    async selectFamilyMember(data)
    {
      const{selectFamilyMembers,selectMemberCovered,spouseAdd,childAdd,multiChild,plusBtn,parentAdd,multiParent,parentInLawAdd,multiParentInLaw,maxAge,maxAgeParent,
        maxAgeParentInLaw}
       = healthLocator(this.page)
       
        //await expect(this.page.getByText('Who in your family needs coverage?')).toBeVisible();
       await selectFamilyMembers.click();
      await expect(selectMemberCovered).toBeVisible();
        let familyMembers =Object.keys(data.family);  
        for(let i in familyMembers )
        {
         
         switch(familyMembers[i])
           {
             case  "Myself" :
               break;
             
               case "Spouse" :
                {
                  if(data.family.Spouse.age!='')
                  {
                    await spouseAdd.click();
                
                  }  
               break;
                }
        
             case "Child" :{

                await childAdd.click();   
                  
                    break; 
             } 
             case "Child1" :
               {
                await multiChild.click();  
                 break;
               }
               case "Child2" : 
               {
                await plusBtn.click(); 
                 break;
               } 
               case "Child3" : 
               {
                await plusBtn.click(); 
                 break;
               } 
               case "Child4" :
                 {
                  await plusBtn.click();  
                 break;
                 }     
                 case "parent1" :  
                 {
                  if(data.family.parent1.age!='')
                  {
                    await parentAdd.click();
                  }
                      break;
                 }
        
                 case "parent2" :
                  {
                    if(data.family.parent2.age!='')
                    {
                        await multiParent.click();
                    }
                       break;
                  }
        
                 case "parentInLaw1" : 
                   
                      {
                        if(data.family.parentInLaw1.age!='')
                        {
                            await parentInLawAdd.click()
                        }
                         break; 
                      } 
                      
                      case "parentInLaw2" : 
                      {
                        if(data.family.parentInLaw2.age!='')
                        {
                            await multiParentInLaw.click();
                        }
                        break;
                      }
           }
         }
         let max = Math.max(data.family.Myself.age, data.family.Spouse.age)
        await maxAge.fill(max.toString());
        if(data.familyParent=="yes")  // If parent is present in proposal
        {
         
         max = Math.max(data.family.parent1.age, data.family.parent2.age)
         await maxAgeParent.fill(max.toString());
         
        }
        if(data.familyParentInLaw =="yes")   // if parentInLaw is present in proposal
        {
           
           max = Math.max(data.family.parentInLaw1.age, data.family.ParentInLaw2.age)
           await maxAgeParentInLaw.fill(max.toString());
       
        }
    }

async FillInputDetailsPageGmc()
{
  await expect(this.page.locator('[id="__next"]')).toContainText('Follow your policy’s progress');
  await this.page.waitForTimeout(2000);
  const{pincodeGMC}  = healthLocator(this.page)
  await  pincodeGMC.fill('263148'); // fill the pincode
  console.log("Filled the pincode");

}
async FillInputDetailsPageSEO(mobileNumber,data)
{
  const{maxAgeSEM,mobileNumberSEO,pincodeSEO,checkPriceBtnSEO}  = healthLocator(this.page)
  console.log("Mobile number used in automation " +mobileNumber);
  let max = Math.max(data.family.Myself.age, data.family.Spouse.age)
  await maxAgeSEM.click();
  await maxAgeSEM.fill(max.toString());
  await mobileNumberSEO.fill(mobileNumber);
  await pincodeSEO.fill('100085');
  await checkPriceBtnSEO.click();
}
async FillInputDetailsPageSEM(mobileNumber,data,type)
{
  const{maxAgeSEM,topuPSelector,maxAgeParentSEM,maxAgeParentInLawSEM,mobileNumberSEM,pincodeSEM,checkPriceBtn}  = healthLocator(this.page)
  console.log("Mobile number used in automation " +mobileNumber);
     let max = Math.max(data.family.Myself.age, data.family.Spouse.age)
     await maxAgeSEM.click();
     await maxAgeSEM.fill(max.toString());

     if(type ==='Topup')
     {
      await topuPSelector.click();
       await this.page.getByText('5L' ,{ exact: true }).click();

     }
  
        if(data.familyParent === "yes")  // If parent is present in proposal
        {
         
         max = Math.max(data.family.parent1.age, data.family.parent2.age)
         await maxAgeParentSEM.click();
         await maxAgeParentSEM.fill(max.toString());

         
        }
        if(data.familyParentInLaw ==="yes")   // if parentInLaw is present in proposal
        {
           
           max = Math.max(data.family.parentInLaw1.age, data.family.parentInLaw2.age)
           await maxAgeParentInLawSEM.click();
           await maxAgeParentInLawSEM.fill(max.toString());
          }

        await mobileNumberSEM.fill(mobileNumber);
        await pincodeSEM.fill('100085');
        await checkPriceBtn.click();
           
       
        
}

    async FillInputDetailsPage(mobileNumber)
    {
      const{continueBtn,pincodeText,mobileText}  = healthLocator(this.page)
        
       console.log("Mobile number used in automation " +mobileNumber); 
        await continueBtn.click();
        await pincodeText.fill('431518'); // fill the pincode
        await mobileText.fill(mobileNumber); // fill the phone number
      console.log("All the details of input page is filled")
    }
    async memberdetailScreen()
    {
      await expect(this.page.locator('[id="__next"]')).toContainText('Personal Information');
      await expect(this.page.locator('[id="__next"]')).toContainText('Edit policy');
  await expect(this.page.locator('[id="__next"]')).toContainText('Some changes may require document uploads, and charges may apply')

    }
    async changeNameOfSelf()
    {
      await this.page.waitForTimeout(4000);
      await this.page.getByRole('img', { name: 'chevron icon' }).first().click();
      await this.page.getByRole('textbox').first().click();
      await this.page.getByRole('textbox').first().fill(customerData["name"]+'updated');
      if(customerData["frequency"]=='MONTHLY')
      {
        await expect(this.page.locator('[id="__next"]')).toContainText('₹0/mo');
      }
      else
      {
        await expect(this.page.locator('[id="__next"]')).toContainText('₹0/yr');
      }
      
      await expect(this.page.locator('[id="__next"]')).toContainText('Total edits : 1');
      await this.page.getByRole('button', { name: 'Continue' }).nth(1).click();
    }
    async changeEmailID()
    {
      await this.page.waitForTimeout(1000);
      await this.page.getByRole('img', { name: 'chevron icon' }).first().click();
      await this.page.locator('input[type="email"]').click();
      let email =customerData["email"]+"updated";
      await this.page.locator('input[type="email"]').fill(email);
      await this.page.waitForTimeout(1000);
      if(customerData["frequency"]=='MONTHLY')
      {
        await expect(this.page.locator('[id="__next"]')).toContainText('₹0/mo');
      }
      else
      {
        await expect(this.page.locator('[id="__next"]')).toContainText('₹0/yr');
      }
      await expect(this.page.locator('[id="__next"]')).toContainText('Total edits : 1');
      await this.page.getByRole('button', { name: 'Continue' }).nth(1).click();

    }
    async dobChange()
    {
      await this.page.waitForTimeout(1000);
      await this.page.getByRole('img', { name: 'chevron icon' }).first().click();
      await this.page.getByRole('textbox').nth(1).click();
      await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
      await this.page.getByRole('button', { name: '1997' }).click();
      await this.page.getByLabel('Friday, 3 January').click();
      await this.page.getByRole('button', { name: 'Continue' }).nth(1).click()
    }

    
    async addMember()
    {
      await this.page.waitForTimeout(1000);
      await this.page.getByRole('img', { name: 'chevron icon' }).nth(1).click();
      await this.page.getByText('Add new member').click();
      await this.page.waitForTimeout(3000);
      await this.page.locator('.sc-8183604c-0').first().click();
      await this.page.getByRole('button', { name: 'Child' }).click();
      await this.page.getByRole('textbox').first().click()
      await this.page.getByRole('textbox').first().fill('new child');
      await this.page.getByRole('textbox').nth(1).click();
      await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
      await this.page.getByRole('button', { name: '2021' }).click();
      await this.page.getByLabel('Friday, 1 January').click();
      await this.page.locator('div:nth-child(4) > div > div > .sc-b08e82b1-0 > .sc-8183604c-0').click();
      await this.page.getByRole('button', { name: 'Female' }).click();
      await this.page.getByText('Height\' "').click();
      await this.page.locator('#undefined-feet').fill('5');
      await this.page.locator('#undefined-height-inches').fill('5');
      await this.page.getByRole('spinbutton').nth(2).click();
      await this.page.getByRole('spinbutton').nth(2).fill('55')
    await expect(this.page.locator('[id="__next"]')).toContainText('Please keep your child’s birth certificate or the hospital’s discharge summary handy for member addition');
      await this.page.getByRole('button', { name: 'Save' }).click();
      await this.page.getByRole('button', { name: 'Continue' }).nth(1).click();
    }
    async uploadDocumentsDobChange()
    {
      await this.page.setInputFiles("input[type='file']", '/Users/priya.singh/Desktop/test/tests/Data/platinum-updated.pdf');
      await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async uploadDocumnetsMemberAddition()
    {
      await this.page.getByRole('img', { name: 'note' }).click();
      await expect(this.page.locator('[id="__next"]')).toContainText('new child');
      await expect(this.page.locator('[id="__next"]')).toContainText('2021-01-01');
      await expect(this.page.locator('[id="__next"]')).toContainText('female');
      await expect(this.page.locator('[id="__next"]')).toContainText('Child')
      await expect(this.page.locator('[id="__next"]')).toContainText('For member addition (child)');
      await expect(this.page.locator('[id="__next"]')).toContainText('Birth certificate or discharge summary');
      await this.page.setInputFiles("input[type='file']", '/Users/priya.singh/Desktop/test/tests/Data/platinum-updated.pdf');
      await this.page.getByRole('button', { name: 'Continue' }).click();
  
    }
    async uploadDocumnetsNameChange()
    {
      await this.page.getByRole('img', { name: 'note' }).click();
      await this.page.getByText(customerData["name"], { exact: true }).click();
      await this.page.getByText(customerData["name"] +'updated').click();
      await expect(this.page.locator('[id="__next"]')).toContainText('For name verification');
      await expect(this.page.locator('[id="__next"]')).toContainText('Aadhaar card, driving licence, PAN card or passport');
      await this.page.setInputFiles("input[type='file']", '/Users/priya.singh/Desktop/test/tests/Data/platinum-updated.pdf');
      await this.page.getByRole('button', { name: 'Continue' }).click();

    }
    async noUploadDocumentsEmailChange()
    {
      await this.page.getByRole('img', { name: 'note' }).click();
      await this.page.getByText(customerData["email"], { exact: true }).click();
      await this.page.getByText(customerData["email"] +'updated').click();
      await this.page.getByRole('button', { name: 'Continue' }).click();
    }
    async rejectCreatedEndorsementProposal(type)
    {
      let urle = await  this.page.url();
      let proposalUrl;
      let proposal_id;
      console.log(urle);
      if(type =="member addition")
      {
        let url =urle.split('?proposal_id=')
        let res = url[1].split('&order_id')
        proposal_id  =res[0];
      }
      else
      {
        proposalUrl =urle.split('&proposal_id=');
         proposal_id =proposalUrl[1];
      }

      let payload = {
          "remark":"Done Done Done",
        "action": "reject",
        "actor" : "underwriter",
      "actor_id":"AT448-employee-id-test",
        "internal_comment":"Done done done",
        "members_meta":[]
      };
    
      let endosementFulfilUrl=   `https://health-proposal-uat.internal.ackodev.com/api/v1/health/fulfil/endorsement/${proposal_id}`,
     
     res =await axios.post(endosementFulfilUrl,payload);
      console.log(res);

    }

async reviewPageEmailChange()
{
  await expect(this.page.locator('[id="__next"]')).toContainText('Premium details');
    await expect(this.page.locator('[id="__next"]')).toContainText('You need to pay₹0');
    await this.page.getByRole('button', { name: 'Accept' }).click();
    await expect(this.page.getByRole('heading')).toContainText('Thank you for your request');
    await expect(this.page.getByRole('paragraph')).toContainText('We will get back to you with an update within 72 hours');
}
async reviewPageMemberAdditonChange()
{
  await expect(this.page.locator('[id="__next"]')).toContainText('Your price has been updated basis of the edits made to the policy');
  //await expect(this.page.locator('[id="__next"]')).toContainText('₹1,517.44');
  //await expect(this.page.locator('[id="__next"]')).toContainText('₹1,194.18');
  //await expect(this.page.locator('[id="__next"]')).toContainText('You need to pay₹323.26');
  await expect(this.page.locator('[id="__next"]')).toContainText('Documents submitted');
  //await this.page.getByRole('button', { name: 'Pay now' }).click();


}

    async reviewPageNameChange()
    {
      await expect(this.page.locator('[id="__next"]')).toContainText('Premium details');
      await expect(this.page.locator('[id="__next"]')).toContainText('You need to pay₹0');
      await expect(this.page.locator('[id="__next"]')).toContainText('Documents submitted');
      await this.page.getByRole('button', { name: 'Accept' }).click();
      await expect(this.page.getByRole('heading')).toContainText('Thank you for your request');
      await expect(this.page.getByRole('paragraph')).toContainText('We will get back to you with an update within 72 hours');
    }
    async proceedToOtpPageMweb()
    {
      //let mobileNumber =customerData["phone_Number"];
      let mobileNumber = "6034567106";
      await this.page.waitForTimeout(5000);
      await this.page.getByRole('spinbutton').click();
      await this.page.getByRole('spinbutton').fill(mobileNumber);
      await this.page.getByRole('button',{ name: 'Get OTP' }).click();
      await expect(this.page.getByText('Enter verification code')).toBeVisible();
//connecting with a database 
const db = new DB();
 let res = await db.executeQuery(`SELECT template_context_data->>'otp' AS otp FROM sms_report WHERE template_name = 'send_otp_default' AND recipient='${mobileNumber}' AND created_on > NOW()- INTERVAL '800 second' ORDER BY id DESC LIMIT 1`);
console.log("Getting OTP from DB");
let otp = res
console.log(otp[0].otp);
let otpArray = otp[0].otp.split('')

await this. page.getByPlaceholder('●').first().fill(otpArray[0])
await  this.page.getByPlaceholder('●').nth(1).fill(otpArray[1])
await  this.page.getByPlaceholder('●').nth(2).fill(otpArray[2])
await  this.page.getByPlaceholder('●').nth(3).fill(otpArray[3])


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
    async proceedToOtpPage(mobileNumber)
    {
      const{getOTP,enterVerificationCode,otpFirstCol,otpSecondCol,otpThirdCol,otpFourCol}  = healthLocator(this.page)
       
      await getOTP.click();
      await this.page.reload();
      await getOTP.click();;
      await expect(enterVerificationCode).toBeVisible();
//connecting with a database 
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

console.log("proceeding to Member details Page");
    }
    async selectSumInsured(journey,amount)
    {
      const{proceedWithAckoPlatniumBtn,mandatoryTest,proceedBtn,viewPlanBtn,seeYourPlanBtn,proceedWithAckoStandard}  = healthLocator(this.page)
        
        if(journey !='Organic')
{
  if(journey == 'SEM')
  {
    await proceedWithAckoPlatniumBtn.click();
    await mandatoryTest.click();
  }
  else if (journey == 'SEM-Topup')
  {
    await this.page.getByText(amount).click();
    await proceedBtn.click();
  }
  else
  {
    await  viewPlanBtn.click();
    await this.page.getByText(amount).click();
   await proceedBtn.click();
  }
}

else
{
    await seeYourPlanBtn.click();
    await proceedWithAckoStandard.click();
}
console.log("proceeding to OTP page")
    }

    async CalculateAge(ageOfMember)
    {
      var currentTime = new Date();
       var year = currentTime.getFullYear();
         var adultyear = year - ageOfMember;
         console.log(adultyear)

         var adultmonth = Math.floor(Math.random() * (12 - 1 + 1) + 1);
            var adultdate = Math.floor(Math.random() * (28 - 1 + 1) + 1);
          const date = new Date(Date.UTC(adultyear, adultmonth, adultdate, 3, 0, 0, 200));
          let format = new Intl.DateTimeFormat("en", {month: "long",
    day: "numeric", weekday: 'long' }).format(date);
    let month = format.split(' ')
    let dateOrder = month[0]+" "+ month[2]+ " " +month[1]
    return [adultyear,dateOrder,month[1]]

      
    }

    async  MemberDetailsASP(data)
    {
      const{almostThereText,memberDetailsText,mySelfName,dateSelector,yearSelector,yearChoose,monthSelector,monthChoose,exactDate,genderBtn,femaleBtn,selfCheck,selfCheckTwo,panCardTextBox,emailTextBox,
        spouseName,spouseDateSelctor,spouseSelect,maleGender,childName,childCheck,parentName,parentChoose,femaleGender,
        parentTwo,parentchoose,parentInLawName,parentInLawChoose,parentInLawTwoName,parentInLawTwoChoose}  = healthLocator(this.page)
        
        let familyMembers =Object.keys(data.family);
        await expect(almostThereText).toBeVisible();
        await expect(memberDetailsText).toBeVisible();
        await this.page.reload();
        const email= new BasePage()
        let emailId = email.randomName(4)
        emailId = "priya.singh+"+emailId+"@acko.tech"
        // let ageOfSelf = Object.values(data.family.Myself);
        // let ageOfSpouse = Object.values(data.family.Spouse)
        for(let i in familyMembers ){ 
            switch(familyMembers[i])
          {
            case  "Myself" :
                {
                await mySelfName.click();
                await mySelfName.fill('selfAutomation');
             //   await this.page.waitForTimeout(8000);
             let dateFormat = await this.CalculateAge(data.family.Myself.age);
              console.log(dateFormat[0])
              console.log(dateFormat[1].toString())
              console.log(dateFormat[2])
                await  this.page.getByRole('textbox').nth(1).click();
                await  this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                await this.page.waitForTimeout(2000)
                await  this.page.getByRole('button', { name: dateFormat[0].toString() }).click();
                await this.page.waitForTimeout(2000)
                await  this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                await this.page.waitForTimeout(2000)
                await  this.page.getByRole('button', { name: dateFormat[2].toString() }).click();
                await this.page.waitForTimeout(2000)
                await  this.page.getByLabel(dateFormat[1].toString()).click();
                await this.page.waitForTimeout(2000)
                 await  this.page.locator('.sc-8183604c-0').first().click();
                 await  this.page.getByRole('button', { name: 'Female' }).click();
                 await this.page.getByText('Height\' "').first().click();
                 await this.page.locator('#undefined-feet').first().click()
                 await this.page.locator('#undefined-feet').first().fill('5')
                 await this.page.locator('#undefined-height-inches').first().click();
                 await this.page.locator('#undefined-height-inches').first().fill('0')
                 await this.page.locator('(//input[@type="number"])').nth(2).click()
                await this.page.locator('(//input[@type="number"])').nth(2).fill('55')
                 await  emailTextBox.click();
                 await  emailTextBox.fill(emailId);


                    
                       
                            if(data.familyconstruct =='1A_1')
                            {
                            
                            }
                           
                             
    
                        break;
                }
                case "Spouse" :
                    { 
                         
                        await spouseName.click();
                        await spouseName.fill('SpouseAutomation');
                        await this.page.getByRole('textbox').nth(4).click();
                        await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                        await this.page.getByRole('button', { name: '1996' }).click();
                        await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                        await  this.page.getByRole('button', { name: 'May' }).click();
                        await this.page.getByLabel('Saturday, 4 May').click();
                        await this.page.locator('.sc-8183604c-0').nth(1).click();
                        await this.page.getByRole('button', { name: 'Male', exact: true }).click();
                        await this.page.getByText('Height\' "').nth(1).click();
                        await this.page.locator('#undefined-feet').nth(1).click()
                        await this.page.locator('#undefined-feet').nth(1).fill('5')
                        await this.page.locator('#undefined-height-inches').nth(1).click();
                        await this.page.locator('#undefined-height-inches').nth(1).fill('0');
                        await this.page.locator('(//input[@type="number"])').nth(6).click()
                        await this.page.locator('(//input[@type="number"])').nth(6).fill('55')

                        break ; 
                    }
                    case "Child" : 
                    {
                        await  this.page.locator('(//*[text()="Child"] //following::input)[1]').click();
                        await this.page.locator('(//*[text()="Child"] //following::input)[1]').fill('ChildAutomation');
                        await this.page.getByRole('textbox').nth(6).click();
                        await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                        await this.page.getByRole('button', { name: '2016' }).click();
                        await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                        await  this.page.getByRole('button', { name: 'May' }).click();
                        await this.page.getByLabel('Saturday, 7 May').click();
                        await this.page.locator('.sc-8183604c-0').nth(2).click();
                        await this.page.getByRole('button', { name: 'Male', exact: true }).click();
                        await this.page.getByText('Height\' "').nth(2).click();
                        await this.page.locator('#undefined-feet').nth(2).click()
                        await this.page.locator('#undefined-feet').nth(2).fill('5')
                        await this.page.locator('#undefined-height-inches').nth(2).click();
                        await this.page.locator('#undefined-height-inches').nth(2).fill('0')
                        await this.page.locator('(//input[@type="number"])').nth(9).click()
                        await this.page.locator('(//input[@type="number"])').nth(9).fill('55')
                       
                 
                        break;
                    }
                    case "Child1" :
                     {
                      await  this.page.locator('(//*[text()="Child"] //following::input)[1]').click();
                      await this.page.locator('(//*[text()="Child"] //following::input)[1]').fill('ChildAutomation');
                      await this.page.getByRole('textbox').nth(6).click();
                      await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                      await this.page.getByRole('button', { name: '2016' }).click();
                      await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                      await  this.page.getByRole('button', { name: 'May' }).click();
                      await this.page.getByLabel('Saturday, 7 May').click();
                      await this.page.locator('.sc-8183604c-0').nth(2).click();
                      await this.page.getByRole('button', { name: 'Male', exact: true }).click();
                      await this.page.getByText('Height\' "').nth(2).click();
                      await this.page.locator('#undefined-feet').nth(2).click()
                      await this.page.locator('#undefined-feet').nth(2).fill('5')
                      await this.page.locator('#undefined-height-inches').nth(2).click();
                      await this.page.locator('#undefined-height-inches').nth(2).fill('0')
                      await this.page.locator('(//input[@type="number"])').nth(9).click()
                      await this.page.locator('(//input[@type="number"])').nth(9).fill('55')
                  
                        break;
                     }
                     case "Child2" :
                     {
                      
                        break;
                        }
                        case "Child3" :
                        {
                            
                            break;
                        }
                        case "Child4" :
                        {
                            
                    
                        break;
                        }
                      
            }
    }

    }
    
    async MemberDetailsGeneric(data)
    {
      const{almostThereText,memberDetailsText,mySelfName,dateSelector,yearSelector,yearChoose,monthSelector,monthChoose,exactDate,genderBtn,femaleBtn,selfCheck,selfCheckTwo,panCardTextBox,emailTextBox,
        spouseName,spouseDateSelctor,spouseSelect,maleGender,childName,childCheck,parentName,parentChoose,femaleGender,
        parentTwo,parentchoose,parentInLawName,parentInLawChoose,parentInLawTwoName,parentInLawTwoChoose}  = healthLocator(this.page)
        
        let familyMembers =Object.keys(data.family);
        //let ageOfSelf = Object.values(data.family.Myself);
        let ageOfSpouse = Object.values(data.family.Spouse);
        let count=0;
        await expect(almostThereText).toBeVisible();
        await expect( memberDetailsText).toBeVisible();
        await this.page.reload();
         //let pincode = data.pincode
        let name ;
        const email= new BasePage()
        let emailId = email.randomName(4)
        emailId = "priya.singh+"+emailId+"@acko.tech"
        for(let i in familyMembers ){ 
            switch(familyMembers[i])
          {
            case  "Myself" :
                {
                await mySelfName.click();
                await mySelfName.fill('selfAutomation');
                await dateSelector.click();
                await yearSelector.click();
                await yearChoose.click();
                await monthSelector.click();
                await monthChoose.click();
                await exactDate.click();
                await genderBtn.click();
                await femaleBtn.click();
               await selfCheckTwo.click();
               await selfCheckTwo.fill('JOLPS5134F')
              await emailTextBox.click();
              await emailTextBox.fill(emailId);

                            if(data.familyconstruct =='1A_1')
                            {
                            
                            }
                           
                             
    
                        break;
                }
                case "Spouse" :
                    { 
                         
                        await spouseName.click();
                        await spouseName.fill('SpouseAutomation');
                        await spouseDateSelctor.click();
                        await yearSelector.click();
                        await yearChoose.click();;
                        await monthSelector.click();
                        await monthChoose.click();;
                        await exactDate.click();
                        await spouseSelect.click();
                        await maleGender.click();

                        break ; 
                    }
                    case "Child" : 
                    {
                        await childName.click();
                        await childName.fill('ChildAutomation');
                        await childCheck.click();
                        await yearSelector.click();
                        await this.page.getByRole('button', { name: '2016' }).click();
                        await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                        await  this.page.getByRole('button', { name: 'May' }).click();
                        await this.page.getByLabel('Saturday, 7 May').click();
                        await this.page.locator('.sc-8183604c-0').nth(2).click();
                        await maleGender.click();
                        break;
                    }
                    case "Child1" :
                     {
                        
                    ;
                        break;
                     }
                     case "Child2" :
                     {
                      
                        break;
                        }
                        case "Child3" :
                        {
                            
                            break;
                        }
                        case "Child4" :
                        {
                            
                    
                        break;
                        }
                        case "parent1" :
                        {
                          await parentName.click();
                          await parentName.fill('ChildAutomation');
                          await parentChoose.click();
                          await yearSelector.click();
                          await this.page.getByRole('button', { name: '1957' }).click();
                          await this.page.getByLabel('Wednesday, 6 March').click();
                          await this.page.waitForTimeout(2000);
                          await this.page.locator('.sc-8183604c-0').nth(3).click();
                          await femaleGender.click();
                        break;
                        }
            
            case "parent2" :
                        {
                          await parentTwo.click();
                          await parentTwo.fill('ChildAutomation');
                          await parentchoose.click();
                          await yearSelector.click();
                          await this.page.getByRole('button', { name: '1957' }).click();
                          await monthSelector.click();
                          await this.page.getByRole('button', { name: 'May' }).click();
                          await this.page.getByLabel('Thursday, 9 May').click();
                          await this.page.waitForTimeout(2000);
                           await this.page.locator('.sc-8183604c-0').nth(4).click();
                           await maleGender.click();
                            break;
                        }
                        case "parentInLaw1" :
                        {
                          await parentInLawName.click();
                          await parentInLawName.fill('ChildAutomation');
                          await parentInLawChoose.click();
                          await yearSelector.click();
                          await this.page.getByRole('button', { name: '1957' }).click();
                          await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                          await this.page.getByRole('button', { name: 'May' }).click();
                          await this.page.getByLabel('Thursday, 9 May').click();
                          await this.page.locator('.sc-8183604c-0').nth(5).click();
                          await maleGender.click();
                        break;
                        }
                        case "parentInLaw2" :
                          {
                            await parentInLawTwoName.click();
                            await parentInLawTwoName.fill('ChildAutomation');
                            await parentInLawTwoChoose.click();
                            await yearSelector.click();
                            await this.page.getByRole('button', { name: '1957' }).click();
                            await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                            await this.page.getByRole('button', { name: 'May' }).click();
                            await this.page.getByLabel('Thursday, 9 May').click();
                            await this.page.locator('.sc-8183604c-0').nth(6).click();
                            await femaleGender.click();
                          break;
                          }
            }
    }
    
    console.log("All the details of member details page is fulfilled proceeding to update credit score")
   
    
    }

    async UpdatingcreditScore(journey)
    {
      const{continueBtn,proceedBtn,continueSecondBtn}  = healthLocator(this.page)
// Changing risk profile
let arr
let urle = await  this.page.url();
if(journey == 'ASP')
  {
    arr= urle.split('?proposal_id=')
    proposalid = arr[1]
  }
  else
  {
  
    arr = urle.split('&proposal_id=')
    proposalid = arr[1]
  }
  


// Integerate API in Playwright
console.log("Fetching Proposal ID that we have created so far");
console.log(proposalid);
let response,riskProfileID

let ProposalStatusUrl = `https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/${proposalid}/status`

 response = await axios.get( ProposalStatusUrl);
 //console.log(response.data.entity_profile_data.risk_profile_data_list);
  for (let x in response.data.entity_profile_data.risk_profile_data_list) {
    if(response.data.entity_profile_data.risk_profile_data_list[x].type=='Credit')
    riskProfileID =response.data.entity_profile_data.risk_profile_data_list[x].id ;
    
  }
  // console.log("Risk profile ID for debugging");
  //  console.log( riskProfileID);
  const urlUpdateRiskProfileAtrribute = "https://health-risk-profile-uat.internal.ackodev.com/risk-profile"
  let data = {
    "risk_profile_id": riskProfileID,
    "risk_attribute_name": "creditScore",
    "risk_attribute_value": "7",
    "valid_till": "2024-04-10",
    "status": "complete"
}
response = await axios.put( urlUpdateRiskProfileAtrribute,data );
console.log("credit score is updated of the user");
// console.log(response.data.risk_attribute_list);
  await continueBtn.click();


if(journey =='Organic')
{

    await proceedBtn.click();
  // await this.page.getByRole('button', { name: 'Continue' }).click();
}
else if(journey =='ASP')
{
 // await this.page.getByRole('button', { name: 'Pay now' }).nth(1).click();
  //console.log("just pretended that we are friend");
}
else if(journey =='GMC')
{
  console.log("we have reached in review page")
}
else
{
  await continueSecondBtn.click();
  //await this.page.getByRole('button', { name: 'Proceed' }).click();
}

console.log("Proceeding to review Page")

    }
    async loginFlow(mobileNumber)
    {
      const{loginButton,loginTextBox,loginOTPbtn,verificationText,otpFirstCol,otpSecondCol,otpThirdCol,otpFourCol}  = healthLocator(this.page)
      await this.page.goto('https://www.ackodev.com/');
      await loginButton.click();
      await loginTextBox.click();
      await loginTextBox.fill(mobileNumber);
      await loginOTPbtn.click();
      await this.page.reload();
      await loginTextBox.click();
      await loginTextBox.fill(mobileNumber);
      await loginOTPbtn.click();
     await expect(verificationText).toBeVisible();
//connecting with a database 
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
    async PortingDetails()
    {
      const{policyExpirationDate,submitBtn,proceedToPaymentBtn}  = healthLocator(this.page)
        await policyExpirationDate.click();
        // To calculate  date for porting (today date +1 date)
    var dateYesterday  = new Date();
    dateYesterday.setDate(dateYesterday.getDate());
    let datePort= new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full'
   
  }).format(dateYesterday)
 // this will give output in thid format 'Wednesday, 13 December 2023'
 //console.log(datePort);
 let portingDates = datePort.split('2024').join('')
 console.log(portingDates);
 await this.page.getByLabel(portingDates).click();
   //await this.page.getByLabel(datePort).click();
  // await this.page.getByLabel('Friday, 29 March').click();
        const currentDir = process.cwd();
        console.log(currentDir);
        const relativePath = 'tests/dataFiles/platinum-updated.pdf';
        //tests/Data/platinum-updated.pdf
        const absolutePath = require('path').join(currentDir, relativePath);
        console.log(absolutePath);
    await this.page.setInputFiles("input[type='file']", absolutePath);
    //await this.page.setInputFiles("input[type='file']", '/Users/priya.singh/Desktop/test/tests/Data/platinum-updated.pdf');
    await submitBtn.click();
    await proceedToPaymentBtn.click();


    }
    async PaymentFrequency(type)
    {
      const{monthlyPayment}  = healthLocator(this.page)
            if(type=="Monthly")
            {
                await monthlyPayment.click();
            }
            else
            {
                console.log("Yearly is selected by bydefault");
            }
            console.log("selected the "+type+"frequency")
    }
    async BmiDetails(data)
    {
      await this.page.getByRole('button', { name: 'Proceed to member details' }).click();
      let familyMembers =Object.keys(data.family);
      for(let i in familyMembers ){ 
        switch(familyMembers[i])
      {
        case  "Myself" :
            {
            
             await this.page.getByText('Height\' "').first().click();
             await this.page.locator('#undefined-feet').first().click()
             await this.page.locator('#undefined-feet').first().fill('5')
              await this.page.locator('#undefined-height-inches').first().click();
              await this.page.locator('#undefined-height-inches').first().fill('0')
             await this.page.locator('(//input[@type="number"])').nth(2).click()
            await this.page.locator('(//input[@type="number"])').nth(2).fill('55');
              break;
            }
            case "Spouse" :
                { 
                    await this.page.getByText('Height\' "').nth(2).click();
                    await this.page.locator('#undefined-feet').nth(2).click()
                    await this.page.locator('#undefined-feet').nth(2).fill('5')
                   await this.page.locator('#undefined-height-inches').nth(2).click();
                   await this.page.locator('#undefined-height-inches').nth(2).fill('0');
                    await this.page.locator('(//input[@type="number"])').nth(3).click()
                   await this.page.locator('(//input[@type="number"])').nth(3).fill('55')
                    break ; 
                }
                case "Child" : 
                {
                    
                    await this.page.getByText('Height\' "').nth(2).click();
                    await this.page.locator('#undefined-feet').nth(2).click()
                    await this.page.locator('#undefined-feet').nth(2).fill('5')
                    //await this.page.locator('#undefined-height-inches').nth(2).click();
                    //await this.page.locator('#undefined-height-inches').nth(2).fill('0')
                   // await this.page.locator('(//input[@type="number"])').nth(5).click()
                   // await this.page.locator('(//input[@type="number"])').nth(5).fill('55')
                   
             
                    break;
                }
                case "Child1" :
                 {
                  
                  await this.page.getByText('Height\' "').nth(2).click();
                  await this.page.locator('#undefined-feet').nth(2).click()
                  await this.page.locator('#undefined-feet').nth(2).fill('5')
                  await this.page.locator('#undefined-height-inches').nth(2).click();
                  await this.page.locator('#undefined-height-inches').nth(2).fill('0')
                 // await this.page.locator('(//input[@type="number"])').nth(5).click()
                 // await this.page.locator('(//input[@type="number"])').nth(5).fill('55')
              
                    break;
                 }
                 case "Child2" :
                 {
                  
                    break;
                    }
                    case "Child3" :
                    {
                        
                        break;
                    }
                    case "Child4" :
                    {
                        
                
                    break;
                    }
                  
        }
        await this.page.getByRole('button', { name: 'Continue' }).click();
}
    

    }
    async paymentEndorsement()
    {
      await  this.page.getByRole('button', { name: 'Pay now' }).click();
      await this.page.waitForTimeout(2000);
     // await expect(this.page.locator('#subtype')).toContainText('Paying 1 of 12 instalments');
     await expect(this.page.locator('#root')).toContainText('See why')
      let urle  =  await this.page.url();
        console.log(urle);
     let ekey = urle.split('id=')
     console.log("Ekey fr")
     console.log(ekey[1]);
        await this.page.goto(`https://platform-simulator-frontend-uat.internal.ackodev.com/payments?id=${ekey[1]}`);
        await this.page.waitForTimeout(3000);
      await expect(this.page.getByRole('heading', { name: 'Juspay Mock' })).toBeVisible()
      await expect( this.page.getByText('This is a mock page for Juspay payment')).toBeVisible();
    await this.page.getByRole('button',{ name: 'Success' }).click();
    console.log("Test case passed successfully");
    await this.page.waitForTimeout(3000);
    await expect(this.page.getByRole('heading')).toContainText('Thank you for your request');
    await expect(this.page.getByRole('paragraph')).toContainText('We will get back to you with an update within 72 hours');
    }
    async withdrawProposal()
    {
  
      let urlWithdraw = `https://health-retail-admin-panel.corp.ackodev.com/api/v1/health/proposals/action/${proposalid}/withdraw`
      let payload ={
        "comment": "",
        "withdraw_reason": {
            "disposition": "Pre policy edit request",
            "sub_disposition": "Modify members",
            "reason": "Add members"
        }
    }
    let response = await axios.post(urlWithdraw,payload);
    console.log(response.status);
    }
    async Payment(type)
    {
      const{payNowBtn,paySub,juspayMock,jusupayText,successBtn,verifyKyc,aspPolicy,standardPolicy}  = healthLocator(this.page)
        await  payNowBtn.click();
        await paySub.click();
        let urle  =  await this.page.url();
        console.log(urle);
     let ekey = urle.split('id=')
     console.log("Ekey fr")
     console.log(ekey[1]);
        await this.page.goto(`https://platform-simulator-frontend-uat.internal.ackodev.com/payments?id=${ekey[1]}`);
        await this.page.waitForTimeout(3000);
      await expect(juspayMock).toBeVisible()
      await expect(jusupayText).toBeVisible();
    await successBtn.click();
    console.log("Payment done successfully");
    await this.page.waitForTimeout(5000);
    if(type =='Platnium')
    {
      
      await verifyKyc.click();
    }
    else if(type =='ASP')
    {
      
      await expect ( aspPolicy).toBeVisible();
    }
    else
    {
      await expect (standardPolicy).toBeVisible();
    }
    console.log("Reached to KYC page for all the journey apart from standard flow");
    }
    async repropsalLoading()
    {
      const{btnText,revisedPremiumtText,reviewYourPlanBtn,priceBreakup,okayBtn,acceptPayBtn,paySub,successBtn}  = healthLocator(this.page)
      await revisedPremiumtText.click();
  await expect(btnText).toContainText('We have revised your premium to provide you and your family with our superior medical coverage');
  await reviewYourPlanBtn.click();
  await priceBreakup.click();
  await okayBtn.click();
  await acceptPayBtn.click();
  await paySub.click();
  let urle  =  await this.page.url();
  console.log(urle);
let ekey = urle.split('id=')
console.log("Ekey fr")
console.log(ekey[1]);
  await this.page.goto(`https://platform-simulator-frontend-uat.internal.ackodev.com/payments?id=${ekey[1]}`);
  await this.page.waitForTimeout(3000);
  await successBtn.click();
  await expect(btnText).toContainText('Payment successfulACKO Platinum Health PlanCongratulations! Your health policy is now active');
}
    
    async goToReproposalCTA()
    {
      const{btnText,viewBtn}  = healthLocator(this.page)
      await this.page.waitForTimeout(1000);
      await this.page.goto('https://www.ackodev.com/myaccount');
      await expect(btnText).toContainText('New quote available');
      await expect(btnText).toContainText('Policy updateNew quote availableView');
      await viewBtn.click();
    }
    async memberWaitingPeriod()
    {
      let ProposalStatusUrl = `https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/${proposalid}`
      let response = await axios.get( ProposalStatusUrl);
       let users= response.data.users;
       //Filter insured Proposal
       let insuredArr = users.filter((users) =>{
     return users.role=='insured' });

     let memberUniqueIDArray : string[] =[]
     insuredArr.forEach( id=> memberUniqueIDArray.push(id.member_unique_id))
     let result : object[] =[]
     for (let i=0;i<memberUniqueIDArray.length;i++)
{
  let membersForm =
    
      {
          "member_unique_id": memberUniqueIDArray[i],
          "form_data": {
              "tele_mer_doctor_comments": {
                  "value": "",
                  "type": "text_area"
              },
              "medical_uw_comments": {
                  "value": "",
                  "type": "text_area"
              },
              "technical_uw_comments": {
                  "value": "",
                  "type": "text_area"
              },
              "disease_ped_with_clauses": {
                "value": waitingPeriod,
                  "type": "disease_ped"
              }
          },
          "status": "Accept member with clauses"
        }
        
        result.push(membersForm);

      }
      //console.log(result);
      let payload ={
        "proposal_id": proposalid,
        "members_form": result,
                 
      
      }
      console.log(JSON.stringify(payload));
      let calculateUrl =`https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/form/calculate`
let submitUrl =`https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/form/submit`
const config = {
  headers:{
   "Cookie":"corp_session=f0fb2626-9fac-4f5d-bed4-9a02dadcde72;"

  }
}
 response = await axios.post(calculateUrl,payload,config);
 //onsole.log(response.data);
 response = await axios.post(submitUrl,payload,config);
 //console.log(response.data);
 console.log("Member waiting period is completed through API")

    }
    async memberLoading()
    {
      //let proposalid ="e528fa12-ed4d-40d1-bea2-97ccbfcb3587"
      let ProposalStatusUrl = `https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/${proposalid}`
      let response = await axios.get( ProposalStatusUrl);
       let users= response.data.users;
       //Filter insured Proposal
       let insuredArr = users.filter((users) =>{
     return users.role=='insured' });

     let memberUniqueIDArray : string[] =[]
     insuredArr.forEach( id=> memberUniqueIDArray.push(id.member_unique_id))
     let result : object[] =[]
     for (let i=0;i<memberUniqueIDArray.length;i++)
{
  let membersForm =
    
      {
          "member_unique_id": memberUniqueIDArray[i],
          "form_data": {
              "tele_mer_doctor_comments": {
                  "value": "",
                  "type": "text_area"
              },
              "medical_uw_comments": {
                  "value": "",
                  "type": "text_area"
              },
              "technical_uw_comments": {
                  "value": "",
                  "type": "text_area"
              },
              "disease_ped_with_clauses": {
                "value": value,
                  "type": "disease_ped"
              }
          },
          "status": "Accept member with clauses"
        }
        
        result.push(membersForm);

      }
      //console.log(result);
      let payload ={
        "proposal_id": proposalid,
        "members_form": result,
                 
      
      }
      console.log(JSON.stringify(payload));
      let calculateUrl =`https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/form/calculate`
let submitUrl =`https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/form/submit`
const config = {
  headers:{
   "Cookie":"corp_session=c0598ccd-bc39-4187-9128-e2eca84f696f;"

  }
}
 response = await axios.post(calculateUrl,payload,config);
 console.log(response.data);
 console.log("Now we are calling submit API");
 response = await axios.post(submitUrl,payload,config);
 console.log(response.data);

    }
    async acceptMember()
    {
     
    //let proposalid ="e528fa12-ed4d-40d1-bea2-97ccbfcb3587"

    let ProposalStatusUrl = `https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/${proposalid}`
      let response = await axios.get( ProposalStatusUrl);
       let users= response.data.users;
       //Filter insured Proposal
       let insuredArr = users.filter((users) =>{
     return users.role=='insured' });

     let memberUniqueIDArray : string[] =[]
     insuredArr.forEach( id=> memberUniqueIDArray.push(id.member_unique_id))
//console.log(memberUniqueIDArray)
let result : object[] =[]

for (let i=0;i<memberUniqueIDArray.length;i++)
{
  let membersForm =
    
      {
          "member_unique_id": memberUniqueIDArray[i],
          "form_data": {
              "tele_mer_doctor_comments": {
                  "value": "",
                  "type": "text_area"
              },
              "medical_uw_comments": {
                  "value": "",
                  "type": "text_area"
              },
              "technical_uw_comments": {
                  "value": "",
                  "type": "text_area"
              },
              "disease_ped_without_declaration": {
                  "value": [],
                  "type": "disease_ped"
              }
          },
          "status": "Accept member"
        }
        
        result.push(membersForm);

      }
      //console.log(result);
      let payload ={
        "proposal_id": proposalid,
        "members_form": result,
                 
      
      }
      console.log(JSON.stringify(payload));

let calculateUrl =`https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/form/calculate`
let submitUrl =`https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/form/submit`
const config = {
  headers:{
   "Cookie":"corp_session=7a9a9ae5-70b4-4826-bde3-e914655de864;"

  }
}
 response = await axios.post(calculateUrl,payload,config);
 console.log(response.data);
 response = await axios.post(submitUrl,payload,config);
 console.log(response.data);
}


    async fillHeightWeight()
    {
     // let proposalid ="e528fa12-ed4d-40d1-bea2-97ccbfcb3587"
      let ProposalStatusUrl = `https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/${proposalid}`
        let response = await axios.get( ProposalStatusUrl);
         let users= response.data.users;
         //Filter insured Proposal
         let insuredArr = users.filter((users) =>{
       return users.role=='insured' });

// extract Member Unique ID


let temp  = {}
insuredArr.filter((id)=>
{
  temp ={
    "member_unique_id": id.member_unique_id,
    "height":65,
    "weight":55
  }
  userDetails.push(temp);
})
userDetails.splice(0,1)
console.log(userDetails);

let  payload =
{"users": userDetails

}

let updateUrl =`https://health-retail-admin-panel.corp.ackodev.com/api/v1/health/proposals/${proposalid}/admin/postPayment`
response=await axios.put( updateUrl,payload )

console.log("Height and weight is filled through API is done");

    }



    async fillMedicalQuestionAPI()
    {
      //let proposalid = "e528fa12-ed4d-40d1-bea2-97ccbfcb3587"
        let medicalQuestionUrl ="https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/telemer-questions/"+proposalid;
        let payload = [
          {
              "question_id": "name_confirmation",
              "answer": "correct"
          },
          {
              "question_id": "dob_confirmation",
              "answer": "correct"
          },
          {
              "question_id": "height_weight_confirmation",
              "answer": "correct"
          },
          {
              "question_id": "tobacco",
              "answer": "no"
          },
          {
              "question_id": "alcohol",
              "answer": "no"
          },
          {
              "question_id": "medical_condition",
              "answer": [
                  "none",
                  "asthma"
              ]
          },
          {
              "question_id": "prescribed_medicines",
              "answer": "no"
          },
          {
              "question_id": "experiencing_symptoms",
              "answer": [
                  "none",
                  "bowel"
              ]
          },
          {
              "question_id": "has_hospitalised",
              "answer": "no"
          },
          {
              "question_id": "pregnant",
              "answer": "no"
          },
          {
              "question_id": "gynaecological_conditions",
              "answer": "yes"
          },
          {
              "question_id": "plan_doctor_visit",
              "answer": "no"
          },
          {
              "question_id": "insurance_history",
              "answer": "yes"
          },
          {
              "question_id": "health_and_habits",
              "answer": "dfsa"
          },
          {
              "question_id": "health_checkups",
              "answer": "yes"
          },
          {
              "question_id": "claim_history",
              "answer": "yes"
          },
          {
              "question_id": "doctor_remark",
              "answer": "fdada"
          },
          {
              "question_id": "call_id",
              "answer": "1223"
          }
      ]
     let response= await axios.post( medicalQuestionUrl,payload );
    assert("updated",response.data)
    console.log("Medical question through API is done")


    }
}