import { test, expect } from '@playwright/test';




test.describe('Make appointment',{annotation:{type:"story",description:"JIRA-1234:Make an appointement feature"}}, async () => {

    test.beforeEach("login with valid cred", async ({ page,browserName },testInfo) => {
        //skip the test on ffx
        test.skip(browserName==='firefox',"still working on this")

        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator('h1:has-text("CURA Healthcare Service")')).toBeTruthy();
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await expect(page.locator('#login')).toContainText('Please login to make appointment.');
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        /**
         * add a custome screenshot
         * @todo need to create as helper
         */

        let fullpage=await page.screenshot({fullPage:true});
        testInfo.attach("loginpage",{body:fullpage,contentType:"image/png"})

        await expect(page.locator('h2')).toContainText('Make Appointment');


    })


    test('should make one appointment', {annotation:{type:"bug",description:"working in ffx"},tag:"@smoke"},async ({ page }) => {

    await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
    await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
    await page.getByRole('radio', { name: 'Medicaid' }).check();
    await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
    await page.getByRole('cell', { name: '20' }).click();
    // ✅await page.getByRole('textbox', { name: 'Comment' }).click();
    await page.getByRole('textbox', { name: 'Comment' }).fill('this is a test ');
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    await expect(page.getByText('Please be informed that your')).toBeVisible();
    await expect(page.locator('#summary')).toContainText('Please be informed that your appointment has been booked as following:');
});


})

