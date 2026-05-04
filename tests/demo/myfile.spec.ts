import {test,expect} from "@playwright/test"

test("Should load Hope page with correct tittle",async({page})=>{

    // got to the home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/")

    //assert if the title is correct
    await expect(page).toHaveTitle("CURA Healthcare Service");

    await expect (page.locator('h1:has-text("CURA Healthcare Service")')).toBeTruthy();

})