import { test, expect } from '@playwright/test';

test.describe("login functinality", () => {

  test.beforeEach("Login before each", async ({ page }) => {
    // Login in and land on home page
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator('h1:has-text("CURA Healthcare Service")')).toBeTruthy();
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await expect(page.locator('#login')).toContainText('Please login to make appointment.');

  })

  test('Should login successfully', async ({ page }) => {

    await page.getByLabel('Username').fill('John Doe');
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('h2')).toContainText('Make Appointment');
  });

  test('Should login failed  with invlaid cred', async ({ page }) => {
    await page.getByLabel('Username').fill('John');
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
  });

})

