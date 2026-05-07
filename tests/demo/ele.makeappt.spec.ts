import { test, expect } from '@playwright/test';


// Single click on button or link
// .click()  

// Double click on button or link
// .dblclick()

// Right click on button or link (context menu)
// .click({button: 'right'})

// Press Enter key on focused element
// .press('Enter')

// Hover over element to show tooltips or trigger hover effects
// .hover()

// Click with custom timeout
// .click({timeout: 5000})

test.describe('Make appointment', async () => {

    test.beforeEach("login with valid cred", async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator('h1:has-text("CURA Healthcare Service")')).toBeTruthy();



        // await page.getByRole('link', { name: 'Make Appointment' }).click();
        // await page.getByRole('link', { name: 'Make Appointment' }).press('Enter');
        // await page.getByRole('link', { name: 'Make Appointment' }).dblclick();
        // await page.getByRole('link', { name: 'Make Appointment' }).click({button:"right"});
        //  await page.getByRole('link', { name: 'Make Appointment' }).hover()
        await page.getByRole('link', { name: 'Make Appointment' }).click({ timeout: 10_000 })


        await expect(page.locator('#login')).toContainText('Please login to make appointment.');
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').pressSequentially('ThisIsNotAPassword', { timeout: 5_000 });
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('h2')).toContainText('Make Appointment');

    })


    test('should make one appointment', async ({ page }) => {

        // dropdown
        await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center')
        await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

        //selct by lebel or index
        await page.getByLabel('Facility').selectOption({ label: 'Seoul CURA Healthcare Center' });
        await page.getByLabel('Facility').selectOption({ index: 1 });

        // assert for count of elemetns
        let dropdownoptions = page.getByLabel('Facility').locator('option')
        await expect(dropdownoptions).toHaveCount(3)

        // get all dropdown values
        let listOFdrwopdown = await page.getByLabel('Facility').all();
        let listOptions = []
        for (let ele of listOFdrwopdown) {
            let eleText = await ele.textContent();
            if (eleText) {
                listOptions.push(eleText)
            }

        }
        console.log(`>> list of options: ${listOptions}`);

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

