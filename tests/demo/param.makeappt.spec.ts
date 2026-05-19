import { test, expect } from '@playwright/test';
import constants from "../../data/constant.json"
import TestData from '../../data/test-data.ts';
import { json } from 'node:stream/consumers';
import fileHelper  from '../helpers/file-helper';


// const aaptData = TestData.makeAppoinmentTestData()
const aaptData = fileHelper.readCSV(`${process.cwd()}/data/functional/make-appt-test-data.csv`)

for (const data of aaptData) {
    console.log(`>> The datas are : ${JSON.stringify(data)}`)
    test.describe('Make appointment', async () => {

    test.beforeEach("login with valid cred", async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator('h1:has-text("CURA Healthcare Service")')).toBeTruthy();
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await expect(page.locator('#login')).toContainText('Please login to make appointment.');

        // Success login
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        //Get login cookies
        const logincookies=await page.context().cookies()
        process.env.LOGIN_COOKIE=JSON.stringify(logincookies)

        //assert test
        await expect(page.locator('h2')).toContainText('Make Appointment');

    })


    test(`${data.testId}: should make one appointment`, async ({ page }) => {
        console.log(`>> The login cookies : ${process.env.LOGIN_COOKIE}`)

        await page.getByLabel('Facility').selectOption(data.facility);
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
        await page.getByRole('radio', { name: data.hcp }).check();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('cell', { name: '20' }).click();
        // ✅await page.getByRole('textbox', { name: 'Comment' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).fill('this is a test ');
        await page.getByRole('button', { name: 'Book Appointment' }).click();
        await expect(page.getByText('Please be informed that your')).toBeVisible();
        await expect(page.locator('#summary')).toContainText('Please be informed that your appointment has been booked as following:');
    });

    // test('should make one appointment 1', async ({ page }, testInfo) => {

    //     console.log(`>> the test config details are : ${JSON.stringify(testInfo.config)}`)
    //     console.log(`>> constants datas are:${JSON.stringify(constants.STATUSCODES.success)}`)
    //     console.log(`>> constants datas are:${JSON.stringify(constants.STATUSCODES.validationError)}`)


    // });


})
}




