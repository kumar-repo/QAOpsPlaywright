const {test,expect} = require ('@playwright/test');


test('Login page and capture', async ({browser})=>

{
  //loading browser page context 
   const context = await browser.newContext();
    const page =  await context.newPage();

  //initalizing webElements - using CSS selector
  //-------------------------------------------------------------------------
     const userName= page.locator("#username");
     const passwordFiled = page.locator("[type='password']");
     const email="rahulshettyacademy";
     const passwordkey="Learning@830$3mK2";
     const radioButton=page.locator("[class='form-check-inline']>label.customradio:nth-of-type(2)>span.checkmark");
     const notification=page.locator("button#okayBtn");
     const dropDownSelection= page.locator("select[class='form-control']");
     const checkBox = page.locator("#terms");
     const submitButton=page.locator("[type='submit']");
     const documentLinkToClick=page.locator("[href*='documents-request']");

//goto website
//--------------------------------------------------------------------------
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log(await page.title());


 //User Action:
 //---------------------------------------------------------------------

 //Child page - capture new child tab page into newpage const varaible
 //-----------------------------------------------------------------
  const [newPage]=await Promise.all(
   [
    //listen for any new page pending,rejected,fulfilled
      context.waitForEvent('page'),
    // click url on parent page  
      documentLinkToClick.click(), 
   
   ])

   //new page is opened and capture specific text on child page using newpage const varaible
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]

    console.log("capture text from child page : \nhttps://rahulshettyacademy.com/client" + domain);


    //parent page
    //-------------------------------------------------------
     await userName.fill(email);
     await passwordFiled.fill(passwordkey);
     await radioButton.click();
     // checking whether radiobutton is clicked or not -isChecked() will return bollean value
     console.log(await radioButton.isChecked());
     await expect(radioButton).toBeChecked();
     await notification.click();
     await dropDownSelection.selectOption("Consultant");
     await checkBox.click();
     //assertion
     await expect(checkBox).toBeChecked();
     await submitButton.click();

   
});



