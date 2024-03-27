import { Page } from '@playwright/test';

export function lifeLocator(page: Page) {
  return {
   
      loginButton: page.getByRole('button', { name: 'Login' }),
      loginTextBox : page.getByRole('spinbutton'),
      loginOTPbtn: page.getByRole('button', { name: 'Log in' }),
      verificationText: page.getByText('Enter verification code'),
      otpFirstCol: page.getByPlaceholder('●').first(),
      otpSecondCol:page.getByPlaceholder('●').nth(1),
      otpThirdCol:page.getByPlaceholder('●').nth(2),
      otpFourCol :page.getByPlaceholder('●').nth(3),
      ackoIcon:  page.getByRole('link'),
      lifeIcon : page.getByRole('img', { name: 'life icon' }),
      exploreLifePlanbtn : page.getByRole('button', { name: 'Explore the plan' }),
      btnText: page.locator('[id="__next"]'),
      findMyrightCoverage :page.getByRole('button', { name: 'Find my right coverage' }),
      maleGender :page.locator('div').filter({ hasText: /^Male$/ }).first(),
      femaleGender : page.locator('div').filter({ hasText: /^Female$/ }).first(),
      continueBtn:page.getByRole('button', { name: 'Continue' }),
      sliderBtn : page.getByRole('slider'),
      pincodeText:page.getByRole('spinbutton'),
      textBox : page.getByRole('textbox'),
      nonRecommandationBtn : page.getByRole('button', { name: 'In a rush? Go straight to plan' }),
      noSmoke: page.getByText('No, I haven’t'),
      yesSmoke :page.locator('div').filter({ hasText: /^Yes, I have$/ }).first(),
      showPlanBtn :page.getByRole('button', { name: 'Show me my plan' }),
      noCoverage: page.locator('div').filter({ hasText: /^No, I don't want this cover$/ }),
      basicCoverage:page.getByText('Just want basic coverage? Tap here', { exact: true }),
    accidentalCoverage : page.getByRole('button', { name: 'Get accidental death cover' }),
    
  };
}



