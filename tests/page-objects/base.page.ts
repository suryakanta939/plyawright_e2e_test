import { expect, type Locator, type Page } from "@playwright/test";
import { log } from "../helpers/logger.js";

export default class BasePage {
    readonly page:Page
    constructor(page:Page){
        this.page=page
    }

    /* All Reusable Actions */

    async naviagteTo(url:string){
        await log("info",`Navigating to the URL : ${url}...`)
        await this.page.goto(url);
    }

    /**Click action */
    async click(locator:Locator){
       try{
        await expect(locator).toBeVisible({timeout:5000})
        await locator.click();
       } catch (error) {
        await log("error", `Failed to click on element with locator : ${JSON.stringify(locator)}`)
        throw error;
       }
    }

    /** Type action */
    async typeInto(locator:Locator,text:string){
        try {
            await expect(locator).toBeVisible({timeout:5000})
            await locator.fill(text)
        } catch (error) {
            await log("error", `Failed to type on element with locator : ${JSON.stringify(locator)}`)
            throw error;
        }
    }

 
}