import { test, expect } from '@playwright/test';
import constants from "../../data/constant.json"
import { log } from '../helpers/logger';
import pwHelper from '../helpers/pw-helper';




test.describe('Make appointment', async () => {

    test.beforeEach("login with valid cred", async ({ page },testInfo) => {

        //Get the URL from configfile
        const envConfig=testInfo.project.use as any;

        // cusgtom log
        await log("info",`Navigating to the URL : ${envConfig.appURL}...`)
        await log("error",`This is a sample error log`)


        await page.goto(envConfig.appURL);
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator('h1:has-text("CURA Healthcare Service")')).toBeTruthy();
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await expect(page.locator('#login')).toContainText('Please login to make appointment.');
        console.log("The username and password are : ",process.env.TEST_USER_NAME,process.env.TEST_PASSWORD);
        // console.log(process.env.TEST_PASSWORD);
        await page.getByLabel('Username').fill(process.env.TEST_USER_NAME);
        await page.getByLabel('Password').fill(process.env.TEST_PASSWORD);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
        await pwHelper.takeFullPageScreenshot(page, "makeappt-homepage")

    })


    test('should make one appointment', async ({ page }) => {

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

 test('should make one appointment 1', async ({ page },testInfo) => {

    console.log(`>> the test config details are : ${JSON.stringify(testInfo.config)}`)
    console.log(`>> constants datas are:${JSON.stringify(constants.STATUSCODES.success)}`)
    console.log(`>> constants datas are:${JSON.stringify(constants.STATUSCODES.validationError)}`)

    
});


})

