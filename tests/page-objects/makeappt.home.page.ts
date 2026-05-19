import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page";
import { log } from "../helpers/logger";

class MakeApptHomePage extends BasePage {

    constructor(page: Page) {
        super(page)

    }

    /** Elements*/

    get MakeAppybtn() {
        return this.page.getByRole('link', { name: 'Make Appointment' })

    }

    get userNameInputBox() {
        return this.page.getByLabel('Username')

    }

    get passwordInputBox() {
        return this.page.getByLabel('Password')

    }

    get loginBtn() {
        return this.page.getByRole('button', { name: 'Login' })

    }



    /**Page Actions */

    async loginTomakeappt(url: string, username: string, password: string) {
        // await log("info", `Navigating to the URL : ${url}...`)
        await this.naviagteTo(url);
        await this.click(this.MakeAppybtn)
        await this.typeInto(this.userNameInputBox, username)
        await this.typeInto(this.passwordInputBox, password)
        await this.click(this.loginBtn)
        await log("info", `Login successful with username : ${username} and password : ${password}...`)

    }


}
export default MakeApptHomePage;

/**
 * 
 *    await expect(page.locator('h1:has-text("CURA Healthcare Service")')).toBeTruthy();
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await expect(page.locator('#login')).toContainText('Please login to make appointment.');
        await page.getByLabel('Username').fill(process.env.TEST_USER_NAME);
        await page.getByLabel('Password').fill(process.env.TEST_PASSWORD);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('h2')).toContainText('Make Appointment');

 * 
 */