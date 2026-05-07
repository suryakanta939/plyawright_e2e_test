import {test,expect} from "@playwright/test"

test("Should load Hope page with correct tittle",async({page})=>{

    // got to the home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/")

    //assert if the title is correct
    await expect(page).toHaveTitle("CURA Healthcare Service");

    await expect (page.locator('h1:has-text("CURA Healthcare Service")')).toBeTruthy();

})

test.only("Should do something",async({page})=>{

  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('heading', { name: 'We Care About Your Health' }).click()
  let makeAppoint= page.getByRole('link', { name: 'Make Appointment' })
  console.log('>> The type of locator is: ${typeof makeAppoint}, The value of locator is : ${JSON.stringfy(makeAppoint)}')
   await makeAppoint.click();
  await expect(page.locator('#login')).toContainText('Please login to make appointment.');
})

test("should demo fonfig",async({page},testInfo)=>{
    console.log(`>> Config at runtime: ${JSON.stringify(testInfo.config)}`);
})

test("should demo fioxtue",async({page,browserName},testInfo)=>{
   console.log(`>> The test run on ${browserName}`)
})