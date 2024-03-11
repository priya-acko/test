import {  expect, Page } from '@playwright/test';
import DB from "./db"
import axios from "axios";
import { assert } from 'console';
import BasePage from "./basePage"
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
    
        await expect(this.page.getByText('Ensure your answers are')).toBeVisible()     // Disclmair page
        await this.page.getByRole('button', { name: 'Continue' }).click(); 
        await expect(this.page.getByText('Has anyone covered in this plan smoked or chewed tobacco in the past year?')).toBeVisible() // tobacco page
        await this.page.getByText('No').click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await expect(this.page.getByText('Has anyone covered in this plan consumed alcohol in the past year?')).toBeVisible() // Alchoal Page
        await this.page.getByText('No').click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await expect(this.page.getByText('Has anyone in this plan been diagnosed with a medical condition?')).toBeVisible() // Medical condition page
        await this.page.getByText('No medical conditions').click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await expect(this.page.getByText('Did anyone in this plan take any prescribed medicines in the past week?')).toBeVisible() // prescribed medicines page
        await this.page.getByText('No', { exact: true }).click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await expect(this.page.getByText('Is anyone in this plan currently experiencing any of the following symptoms?')).toBeVisible() // experncing symptoms page
        await this.page.locator('div').filter({ hasText: /^No symptoms$/ }).first().click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await expect(this.page.getByText('Did anyone in this plan undergo surgery or get hospitalised in the past 10 years?')).toBeVisible() // has hospitalized page
        await this.page.getByText('No', { exact: true }).click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await expect(this.page.getByText('Are you or your spouse pregnant?')).toBeVisible() //preganat page 
        await this.page.getByText('No').click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await expect(this.page.getByText('Does anyone in this plan have any other ongoing health issues or symptoms for which you are planning a doctor visit?')).toBeVisible() // DoctorVisit page
        await this.page.getByText('No').click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await expect(this.page.getByText('I confirm that I have answered all the medical questions truthfully and accurately.')).toBeVisible()
        await this.page.getByRole('button', { name: 'I confirm' }).click();
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
      await this.page.locator('div').filter({ hasText: /^Health$/ }).nth(1).click();
      await this.page.waitForTimeout(2000);
      

      if(Journey === 'Organic')
      {
       // await this.page.locator('div').filter({ hasText: 'Buy a new planCover uninsured' }).nth(3).click();
       await this.page.getByRole('img', { name: 'cheveron' }).first().click();

      }
      else if (Journey ==='Porting')
    {
      await this.page.getByText('Port to ACKO Health').click();
      await this.page.locator('div').filter({ hasText: /^Less than 2 months$/ }).click();
   
    }
    else if (Journey === 'UnblockedTopUp')
    { 
      await this.page.getByText('Top-up existing coverage').click();
    
    }
    else if (Journey === 'UnblockedAHP')
  {
    await this.page.getByRole('button', { name: 'See all ACKO health plans ->' }).click();
    await this.page.locator('label').filter({ hasText: 'ACKO Standard Health' }).locator('div').first().click();
    await this.page.getByRole('button', { name: 'Select and customize' }).click();
  }
  else if (Journey ==='ASP')
  {
    await this.page.getByRole('button', { name: 'See all ACKO health plans ->' }).click();
    await this.page.locator('label').filter({ hasText: 'Arogya SanjeevaniCovers you' }).locator('div').first().click();
    await this.page.getByRole('button', { name: 'Select and customize' }).click();
   
  }
  else
  {
    await this.page.getByRole('button', { name: 'See all ACKO health plans ->' }).click();
    await this.page.locator('label').filter({ hasText: 'ACKO Platinum Health' }).locator('div').first().click();
    await this.page.getByRole('button', { name: 'Select and customize' }).click();
  }


   }
   async recomendationJourneyIntro(type)
   {
    await expect(this.page.locator('[id="__next"]')).toContainText('Great! We have the basics.')
    if(type === 'Non-recommendation')
    {
      await this.page.getByRole('button', { name: 'In a rush? Go straight to plan' }).click();
    }
    else
    {
      await this.page.getByRole('button', { name: 'Continue' }).click();
    }
    await this.page.getByRole('button', { name: 'Continue' }).click()
    await this.page.waitForTimeout(7000)

   }
   async segementCommonJourney(gender,age)
   {
    await expect(this.page.locator('[id="__next"]')).toContainText('Find my right coverage');
    await expect(this.page.locator('[id="__next"]')).toContainText('Coverage starting at');
    await expect(this.page.locator('[id="__next"]')).toContainText('₹534/month*');
    await this.page.getByRole('button', { name: 'Find my right coverage' }).click();
    await expect(this.page.locator('[id="__next"]')).toContainText('Did you know? Women typically pay less for life insurance due to their longer life expectancy.');
    if(gender === 'Male')
    {
      await this.page.locator('div').filter({ hasText: /^Male$/ }).first().click();
    }
    else
    {
      await this.page.locator('div').filter({ hasText: /^Female$/ }).first().click();
    }
    await this.page.getByRole('button', { name: 'Continue' }).click();
    //await expect(this.page.locator('[id="__next"]')).toContainText(gender);
    await this.page.getByRole('slider').fill('25');
  await this.page.getByRole('slider').click();
  await this.page.getByRole('button', { name: 'Continue' }).click();
  //await expect(this.page.locator('[id="__next"]')).toContainText(gender);
  //await expect(this.page.locator('[id="__next"]')).toContainText(age +' years');
  await this.page.getByRole('spinbutton').click();
  await this.page.getByRole('spinbutton').fill('100085');
  await this.page.getByRole('button', { name: 'Continue' }).click();
  await this.page.getByRole('textbox').first().click();
  await this.page.getByRole('textbox').first().press('CapsLock');
  await this.page.getByRole('textbox').first().fill('Priya singh');
  await this.page.getByRole('button', { name: 'Continue' }).click()

   
   }
   async semIntroductionPage()
   {
    await expect(this.page.locator('[id="__next"]')).toContainText('Get tax deductions up to ₹75,000 with ACKO health insurance')
    //await expect(this.page.locator('[id="__next"]')).toContainText('Get your health plan save taxes up to ₹75,000 this year');

   }
   async selectFamilyMemberSEM(data)
   {
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
                    await this.page.getByRole('img', { name: 'family-logo' }).nth(1).click();
                    console.log("spouse is selcted")
                
                  }  
               break;
                }
        
             case "Child" :{

              await this.page.getByRole('img', { name: 'family-logo' }).nth(2).click(); 
              console.log("one child is selcted")  
                  
                    break; 
             } 
             case "Child1" :
               {
                await this.page.getByRole('img', { name: 'family-logo' }).nth(2).click();  
                console.log("one child is selcted")  
                 break;
               }
               case "Child2" : 
               {
                await this.page.getByRole('button', { name: 'plus' }).click();
                console.log("two child is selcted")  
                 break;
               } 
               case "Child3" : 
               {
                await this.page.getByRole('button', { name: 'plus' }).click();
                console.log("three child is selcted")  
                 break;
               } 
               case "Child4" :
                 {
                  await this.page.getByRole('button', { name: 'plus' }).click(); 
                  console.log("four child is selcted") 
                 break;
                 }     
                 case "parent1" :  
                 {
                  if(data.family.parent1.age!='')
                  {
                    await this.page.getByText('Parent', { exact: true }).click();
                    console.log("one parent  is selcted")
                  }
                      break;
                 }
        
                 case "parent2" :
                  {
                    if(data.family.parent2.age!='')
                    {
                      await this.page.getByRole('button', { name: 'plus' }).nth(1).click();
                      console.log("two parent  is selcted")
                    }
                       break;
                  }
        
                 case "parentInLaw1" : 
                   
                      {
                        if(data.family.parentInLaw1.age!='')
                        {
                          await this.page.getByText('Parent In-Law').click();
                          console.log("one parentinLAW  is selcted")
                        }
                         break; 
                      } 
                      
                      case "parentInLaw2" : 
                      {
                        if(data.family.parentInLaw2.age!='')
                        {
                            await this.page.getByRole('button', { name: 'plus' }).nth(2).click();
                            console.log("two parentinLAW  is selcted")
                        }
                        break;
                      }
           }
         }

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
  else if (journey ==='life')
  {
    await this.page.goto("https://www.ackodev.com/life/p/segment");
    
  }
  else if (journey == 'SEM-Base')
  {
    await this.page.goto("https://www.ackodev.com/gi/p/health/buy-base");
    
  }
  else if (journey == 'SEO')
  {
    await this.page.goto("https://www.ackodev.com/health-insurance/");
    
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
        
        await this.page.locator('div').filter({ hasText: /^Select existing cover \(deductible\)$/ }).nth(3).click();
        await this.page.getByText(amount ,{ exact: true }).click();

    }
    async selectFamilyMember(data)
    {
       
        //await expect(this.page.getByText('Who in your family needs coverage?')).toBeVisible();
       await this.page.locator('div').filter({ hasText: /^Select family members$/ }).first().click();
        await expect(this.page.getByText('Select members covered')).toBeVisible();
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
                 case "parent1" :  
                 {
                  if(data.family.parent1.age!='')
                  {
                    await this.page.locator('div').filter({ hasText: /^ParentAdd$/ }).getByRole('button').click();
                  }
                      break;
                 }
        
                 case "parent2" :
                  {
                    if(data.family.parent2.age!='')
                    {
                        await this.page.getByRole('button', { name: 'plus' }).nth(1).click();
                    }
                       break;
                  }
        
                 case "parentInLaw1" : 
                   
                      {
                        if(data.family.parentInLaw1.age!='')
                        {
                            await this.page.getByRole('button', { name: 'Add' }).click()
                        }
                         break; 
                      } 
                      
                      case "parentInLaw2" : 
                      {
                        if(data.family.parentInLaw2.age!='')
                        {
                            await this.page.getByRole('button', { name: 'plus' }).nth(2).click();
                        }
                        break;
                      }
           }
         }
         let max = Math.max(data.family.Myself.age, data.family.Spouse.age)
        await  this.page.locator('div').filter({ hasText: /^SelfSpouse*/ }).getByRole('spinbutton').fill(max.toString());
        if(data.familyParent=="yes")  // If parent is present in proposal
        {
         
         max = Math.max(data.family.parent1.age, data.family.parent2.age)
         await this.page.getByRole('spinbutton').nth(1).fill(max.toString());
         
        }
        if(data.familyParentInLaw =="yes")   // if parentInLaw is present in proposal
        {
           
           max = Math.max(data.family.parentInLaw1.age, data.family.ParentInLaw2.age)
           await this.page.getByRole('spinbutton').nth(2).fill(max.toString());
       
        }
    }

async FillInputDetailsPageGmc()
{
await  this.page.locator('div').filter({ hasText: /^Your pincode*/ }).getByRole('spinbutton').nth(0).fill('263148'); // fill the pincode

}
async FillInputDetailsPageSEM(mobileNumber,data,type)
{
  console.log("Mobile number used in automation " +mobileNumber);
     let max = Math.max(data.family.Myself.age, data.family.Spouse.age)
     await this.page.locator('div').filter({ hasText: /^Eldest member \(self, spouse\)$/ }).getByRole('spinbutton').click();
     await this.page.locator('div').filter({ hasText: /^Eldest member \(self, spouse\)$/ }).getByRole('spinbutton').fill(max.toString());

     if(type ==='Topup')
     {
      await this.page.locator('div').filter({ hasText: /^Select existing cover \(deductible\)$/ }).first().click();
       await this.page.getByText('5L' ,{ exact: true }).click();

     }
  
        if(data.familyParent === "yes")  // If parent is present in proposal
        {
         
         max = Math.max(data.family.parent1.age, data.family.parent2.age)
         await this.page.locator('div').filter({ hasText: /^Eldest parent$/ }).getByRole('spinbutton').click();
         await this.page.locator('div').filter({ hasText: /^Eldest parent$/ }).getByRole('spinbutton').fill(max.toString());

         
        }
        if(data.familyParentInLaw ==="yes")   // if parentInLaw is present in proposal
        {
           
           max = Math.max(data.family.parentInLaw1.age, data.family.parentInLaw2.age)
           await this.page.locator('div').filter({ hasText: /^Eldest parent-in-law$/ }).getByRole('spinbutton').click();
           await this.page.locator('div').filter({ hasText: /^Eldest parent-in-law$/ }).getByRole('spinbutton').fill(max.toString());
          }
  
        await this.page.locator('//div[text()="+91"]//following::input').first().fill(mobileNumber);
        await this.page.locator('//div[text()="+91"]//following::input').nth(1).fill('100085');
        await this.page.getByRole('button', { name: 'Check Your Price' }).click();
           
       
        
}

    async FillInputDetailsPage(mobileNumber)
    {
        
       console.log("Mobile number used in automation " +mobileNumber); 
       await  this.page.getByRole('button',{ name: 'Continue' }).click();
      await  this.page.locator('div').filter({ hasText: /^Your pincode*/ }).getByRole('spinbutton').nth(0).fill('263148'); // fill the pincode
      await  this.page.locator('div').filter({ hasText: /^Your pincode*/ }).getByRole('spinbutton').nth(1).fill(mobileNumber); // fill the phone number
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
    await this.page.goto('https://www.ackodev.com/');
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('spinbutton').click();
    await this.page.getByRole('spinbutton').fill(mobileNumber);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await expect(this.page.getByText('Enter verification code')).toBeVisible();
    await this.page.waitForTimeout(3000);
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
    async proceedToOtpPage(mobileNumber)
    {

await this.page.getByRole('button',{ name: 'Get OTP' }).click();
await this.page.reload();
await this.page.getByRole('button',{ name: 'Get OTP' }).click();
await expect(this.page.getByText('Enter verification code')).toBeVisible();
//connecting with a database 
await this.page.waitForTimeout(3000);
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

console.log("proceeding to Member details Page");
    }
    async selectSumInsured(journey,amount)
    {
        
        if(journey !='Organic')
{
  if(journey == 'SEM')
  {
    await this.page.getByRole('button',{ name: 'Proceed with ACKO Platinum' }).click();
    await this.page.getByRole('button',{ name: 'I am okay with mandatory tests' }).click();
  }
  else if (journey == 'SEM-Topup')
  {
    await this.page.getByText(amount).click();
    await this.page.getByRole('button',{ name: 'Proceed' }).click();
  }
  else
  {
    await  this.page.getByRole('button',{ name: 'View plan' }).click();
    await this.page.getByText(amount).click();
    await this.page.getByRole('button',{ name: 'Proceed' }).click();
  }
}

else
{
    await  this.page.getByRole('button',{ name: 'See your plans' }).click();
    await this.page.getByRole('button',{ name: 'Proceed with ACKO Standard' }).click();
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
        let familyMembers =Object.keys(data.family);
        await expect( this.page.getByText('Almost there!')).toBeVisible();
        await expect( this.page.getByText('Member Details')).toBeVisible();
        await this.page.reload();
        // let ageOfSelf = Object.values(data.family.Myself);
        // let ageOfSpouse = Object.values(data.family.Spouse)
        for(let i in familyMembers ){ 
            switch(familyMembers[i])
          {
            case  "Myself" :
                {
                await  this.page.getByRole('textbox').first().click();
                await  this.page.getByRole('textbox').first().fill('selfAutomation');
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
                 await  this.page.locator('input[type="email"]').click();
                 await  this.page.locator('input[type="email"]').fill('priya.singh+efkerh@acko.tech');


                    
                       
                            if(data.familyconstruct =='1A_1')
                            {
                            
                            }
                           
                             
    
                        break;
                }
                case "Spouse" :
                    { 
                         
                        await  this.page.locator('(//*[text()="Spouse"] //following::input)[1]').click();
                        await this.page.locator('(//*[text()="Spouse"] //following::input)[1]').fill('SpouseAutomation');
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
        
        
        let familyMembers =Object.keys(data.family);
        //let ageOfSelf = Object.values(data.family.Myself);
        let ageOfSpouse = Object.values(data.family.Spouse);
        let count=0;
        await expect( this.page.getByText('Almost there!')).toBeVisible();
        await expect( this.page.getByText('Member Details')).toBeVisible();
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
                await  this.page.getByRole('textbox').first().click();
                await  this.page.getByRole('textbox').first().fill('selfAutomation');
                await  this.page.getByRole('textbox').nth(1).click();
                await  this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                await  this.page.getByRole('button', { name: '1996' }).click();
                await  this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                await  this.page.getByRole('button', { name: 'May' }).click();
                await  this.page.getByLabel('Saturday, 4 May').click();
                await  this.page.locator('.sc-8183604c-0').first().click();
                await  this.page.getByRole('button', { name: 'Female' }).click();
                await this.page.getByRole('spinbutton').click();
                await this.page.locator('div:nth-child(3) > div > .sc-32538024-0 > .sc-32538024-1 > .sc-32538024-3').click();
                await this.page.locator('div:nth-child(3) > div > .sc-32538024-0 > .sc-32538024-1 > .sc-32538024-3').fill('JOLPS5134F');
                await  this.page.locator('input[type="email"]').click();
                await  this.page.locator('input[type="email"]').fill(emailId);


                    
                       
                            if(data.familyconstruct =='1A_1')
                            {
                            
                            }
                           
                             
    
                        break;
                }
                case "Spouse" :
                    { 
                         
                        await  this.page.locator('(//*[text()="Spouse"] //following::input)[1]').click();
                        await this.page.locator('(//*[text()="Spouse"] //following::input)[1]').fill('SpouseAutomation');
                        await this.page.getByRole('textbox').nth(5).click();
                        await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                        await this.page.getByRole('button', { name: '1996' }).click();
                        await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                        await  this.page.getByRole('button', { name: 'May' }).click();
                        await this.page.getByLabel('Saturday, 4 May').click();
                        await this.page.locator('.sc-8183604c-0').nth(1).click();
                        await this.page.getByRole('button', { name: 'Male', exact: true }).click();

                        break ; 
                    }
                    case "Child" : 
                    {
                        await  this.page.locator('(//*[text()="Child"] //following::input)[1]').click();
                        await this.page.locator('(//*[text()="Child"] //following::input)[1]').fill('ChildAutomation');
                        await this.page.getByRole('textbox').nth(7).click();
                        await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                        await this.page.getByRole('button', { name: '2016' }).click();
                        await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                        await  this.page.getByRole('button', { name: 'May' }).click();
                        await this.page.getByLabel('Saturday, 7 May').click();
                        await this.page.locator('.sc-8183604c-0').nth(2).click();
                        await this.page.getByRole('button', { name: 'Male', exact: true }).click();
                       
                 
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
                          await  this.page.locator('(//*[text()="Parent 1"] //following::input)[1]').click();
                          await this.page.locator('(//*[text()="Parent 1"] //following::input)[1]').fill('ChildAutomation');
                          await this.page.getByRole('textbox').nth(9).click();
                          await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                          await this.page.getByRole('button', { name: '1957' }).click();
                          await this.page.getByLabel('Wednesday, 6 March').click();
                          await this.page.waitForTimeout(2000);
                          await this.page.locator('.sc-8183604c-0').nth(3).click();
                          await this.page.getByRole('button', { name: 'Female', exact: true }).click();
                        break;
                        }
            
            case "parent2" :
                        {
                          await  this.page.locator('(//*[text()="Parent 2"] //following::input)[1]').click();
                          await this.page.locator('(//*[text()="Parent 2"] //following::input)[1]').fill('ChildAutomation');
                          await this.page.getByRole('textbox').nth(11).click();
                          await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                          await this.page.getByRole('button', { name: '1957' }).click();
                          await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                          await this.page.getByRole('button', { name: 'May' }).click();
                          await this.page.getByLabel('Thursday, 9 May').click();
                          await this.page.waitForTimeout(2000);
                           await this.page.locator('.sc-8183604c-0').nth(4).click();
                           await this.page.getByRole('button', { name: 'Male', exact: true }).click();
                            break;
                        }
                        case "parentInLaw1" :
                        {
                          await  this.page.locator('(//*[text()="Parent-in-Law 1"] //following::input)[1]').click();
                          await this.page.locator('(//*[text()="Parent-in-Law 1"] //following::input)[1]').fill('ChildAutomation');
                          await this.page.getByRole('textbox').nth(13).click();
                          await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                          await this.page.getByRole('button', { name: '1957' }).click();
                          await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                          await this.page.getByRole('button', { name: 'May' }).click();
                          await this.page.getByLabel('Thursday, 9 May').click();
                          await this.page.locator('.sc-8183604c-0').nth(5).click();
                          await this.page.getByRole('button', { name: 'Male', exact: true }).click();
                        break;
                        }
                        case "parentInLaw2" :
                          {
                            await  this.page.locator('(//*[text()="Parent-in-Law 2"] //following::input)[1]').click();
                            await this.page.locator('(//*[text()="Parent-in-Law 2"] //following::input)[1]').fill('ChildAutomation');
                            await this.page.getByRole('textbox').nth(15).click();
                            await this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                            await this.page.getByRole('button', { name: '1957' }).click();
                            await this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                            await this.page.getByRole('button', { name: 'May' }).click();
                            await this.page.getByLabel('Thursday, 9 May').click();
                            await this.page.locator('.sc-8183604c-0').nth(6).click();
                            await this.page.getByRole('button', { name: 'Female', exact: true }).click();
                          break;
                          }
            }
    }
    
    console.log("All the details of member details page is fulfilled proceeding to update credit score")
   
    
    }

    async UpdatingcreditScore(journey)
    {
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
  await this.page.getByRole('button', { name: 'Continue' }).click();


if(journey =='Organic')
{

    await this.page.getByRole('button', { name: 'Proceed' }).click();
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
  await this.page.getByRole('button', { name: 'Continue' }).nth(1).click();
  //await this.page.getByRole('button', { name: 'Proceed' }).click();
}

console.log("Proceeding to review Page")

    }
    async loginFlow(mobileNumber)
    {
      await this.page.goto('https://www.ackodev.com/');
      await this.page.getByRole('button', { name: 'Login' }).click();
      await this.page.getByRole('spinbutton').click();
      await this.page.getByRole('spinbutton').fill(mobileNumber);
      await this.page.getByRole('button', { name: 'Log in' }).click();
      await this.page.reload();
      await this.page.getByRole('spinbutton').click();
      await this.page.getByRole('spinbutton').fill(mobileNumber);
      await this.page.getByRole('button', { name: 'Log in' }).click();
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
    async PortingDetails()
    {
        await this.page.getByLabel('Current policy expiration date').click();
        // To calculate  date for porting (today date +1 date)
    var dateYesterday  = new Date();
    dateYesterday.setDate(dateYesterday.getDate());
    let datePort= new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full'
   
  }).format(dateYesterday)
 // this will give output in thid format 'Wednesday, 13 December 2023'
 console.log(datePort);
 await this.page.getByLabel('Monday, 11 March').click();
   await this.page.getByLabel(datePort).click();
    await this.page.setInputFiles("input[type='file']", '/Users/priya.singh/Desktop/test/tests/Data/platinum-updated.pdf')
    await this.page.getByRole('button', { name: 'Submit' }).click();
  await this.page.getByRole('button', { name: 'Proceed to payment' }).click();


    }
    async PaymentFrequency(type)
    {
            if(type=="Monthly")
            {
                await this.page.getByText('Monthly', { exact: true }).click();
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
    async Payment(type)
    {
        await  this.page.getByRole('button', { name: 'Pay now' }).click();
        await this.page.locator('#type').click();
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
    console.log("Payment done successfully");
    await this.page.waitForTimeout(3000);
    if(type =='Platnium')
    {
      
      await this.page.getByRole('button', { name: 'Verify KYC' }).click();
    }
    else if(type =='ASP')
    {
      
      await expect ( this.page.locator('span').filter({ hasText: 'Arogya Sanjeevani Policy' })).toBeVisible();
    }
    else
    {
      await expect ( this.page.locator('span').filter({ hasText: 'ACKO Standard Health Plan' })).toBeVisible();
    }
    console.log("Reached to KYC page for all the journey apart from standard flow");
    }
    async repropsalLoading()
    {
      await this.page.getByText('We have revised your premium').click();
  await expect(this.page.locator('[id="__next"]')).toContainText('We have revised your premium to provide you and your family with our superior medical coverage');
  await this.page.getByRole('button', { name: 'Review your plan' }).click();
  await this.page.getByText('See detailed price breakup').click();
  await this.page.getByRole('button', { name: 'Okay' }).click();
  await this.page.getByRole('button', { name: 'Accept & pay' }).click();
  await this.page.locator('#type').click();
  let urle  =  await this.page.url();
  console.log(urle);
let ekey = urle.split('id=')
console.log("Ekey fr")
console.log(ekey[1]);
  await this.page.goto(`https://platform-simulator-frontend-uat.internal.ackodev.com/payments?id=${ekey[1]}`);
  await this.page.waitForTimeout(3000);
  await this.page.getByRole('button', { name: 'Success' }).click();
  await expect(this.page.locator('[id="__next"]')).toContainText('Payment successfulACKO Platinum Health PlanCongratulations! Your health policy is now active');
}
    
    async goToReproposalCTA()
    {
      await this.page.waitForTimeout(1000);
      await this.page.goto('https://www.ackodev.com/myaccount');
      await expect(this.page.locator('[id="__next"]')).toContainText('New quote available');
      await expect(this.page.locator('[id="__next"]')).toContainText('Policy updateNew quote availableView');
      await this.page.getByRole('button', { name: 'View' }).click();
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