import {  expect, Page } from '@playwright/test';
import DB from "./db"
import axios from "axios";
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
  else
  {
    await this.page.goto("https://www.ackodev.com/p/health/inputDetails?journey=organic");
  }
  await this.page.waitForTimeout(1000)

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
  console.log( "eldest age of the member " +max);
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



    async FillInputDetailsPage(mobileNumber)
    {
        
       
       await  this.page.getByRole('button',{ name: 'Continue' }).click();
      // await expect( this.page.getByText('Follow your policy’s progress')).toBeVisible();
     
    await  this.page.locator('div').filter({ hasText: /^Your pincode*/ }).getByRole('spinbutton').nth(0).fill('263148'); // fill the pincode
await  this.page.locator('div').filter({ hasText: /^Your pincode*/ }).getByRole('spinbutton').nth(1).fill(mobileNumber); // fill the phone number
//await  this.page.locator('div').filter({ hasText: /^Your pincode*/ }).getByRole('spinbutton').nth(1).fill('7737436781'); // fill the phone number

    }
    async proceedToOtpPage(mobileNumber)
    {

await this.page.getByRole('button',{ name: 'Get OTP' }).click();
await this.page.reload();
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
    async selectSumInsured(journey,amount)
    {
        
        if(journey !='Organic')
{
    await  this.page.getByRole('button',{ name: 'View plan' }).click();
    await this.page.getByText(amount).click();
    await this.page.getByRole('button',{ name: 'Proceed' }).click();
}

else
{
    await  this.page.getByRole('button',{ name: 'See your plans' }).click();
    await this.page.getByRole('button',{ name: 'Proceed with ACKO Standard' }).click();
}
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
                await  this.page.getByRole('textbox').nth(1).click();

              let dateFormat = await this.CalculateAge(data.family.Myself.age)
              console.log("Kiley kiley");
              console.log(dateFormat[0])
              console.log(dateFormat[1].toString())
              console.log(dateFormat[2])
                await  this.page.getByRole('button', { name: 'Open Year Selector' }).click();
                await  this.page.getByRole('button', { name: dateFormat[0].toString() }).click();
                await  this.page.getByRole('button', { name: 'Open Month Selector' }).click();
                await  this.page.getByRole('button', { name: dateFormat[2].toString() }).click();
                await  this.page.getByLabel(dateFormat[1].toString()).click();
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
       // 
        
        let familyMembers =Object.keys(data.family);
        //let ageOfSelf = Object.values(data.family.Myself);
        let ageOfSpouse = Object.values(data.family.Spouse);
        let count=0;
        await expect( this.page.getByText('Almost there!')).toBeVisible();
        await expect( this.page.getByText('Member Details')).toBeVisible();
        await this.page.reload();
         //let pincode = data.pincode
        let name ;
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
    
                        
                   
                        break;
                        }
            
            case "parent2" :
                        {
    
                           
                        
                 
                        break;
                        }
            }
    }
    
    
   
    
    }

    async UpdatingcreditScore(journey)
    {
// Changing risk profile
let arr,proposalid;
let urle = await  this.page.url();
if(journey="ASP")
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
console.log(proposalid);
let response,riskProfileID

let ProposalStatusUrl = `https://health-proposal-uat.internal.ackodev.com/api/v1/health/proposals/${proposalid}/status`

 response = await axios.get( ProposalStatusUrl);
 console.log(response.data.entity_profile_data.risk_profile_data_list);
  for (let x in response.data.entity_profile_data.risk_profile_data_list) {
    if(response.data.entity_profile_data.risk_profile_data_list[x].type=='Credit')
    riskProfileID =response.data.entity_profile_data.risk_profile_data_list[x].id ;
    
  }
  console.log("Risk profile ID for debugging");
   console.log( riskProfileID);
  const urlUpdateRiskProfileAtrribute = "https://health-risk-profile-uat.internal.ackodev.com/risk-profile"
  let data = {
    "risk_profile_id": riskProfileID,
    "risk_attribute_name": "creditScore",
    "risk_attribute_value": "7",
    "valid_till": "2024-04-10",
    "status": "complete"
}
response = await axios.put( urlUpdateRiskProfileAtrribute,data );
console.log("if it is updated");
console.log(response.data.risk_attribute_list);
await this.page.getByRole('button', { name: 'Continue' }).click();
if(journey !='Organic')
{
    await this.page.getByRole('button', { name: 'Continue' }).nth(1).click();
}
else
{
    await this.page.getByRole('button', { name: 'Proceed' }).click();
}



    }
    async PortingDetails()
    {
        await this.page.getByLabel('Current policy expiration date').click();
        // To calculate  date for porting (today date +1 date)
    var dateYesterday  = new Date();
    dateYesterday.setDate(dateYesterday.getDate() + 1);
    let datePort= new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full'
   
  }).format(dateYesterday)
 // this will give output in thid format 'Wednesday, 13 December 2023'

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
    }
    async Payment()
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
    console.log("Test case passed successfully");
      //await expect ( this.page.locator('span').filter({ hasText: 'ACKO Standard Health Plan' })).toBeVisible();




    }
}