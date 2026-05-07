import { test, expect } from '@playwright/test';

test.describe("Inventory feature", () => {

    test.beforeEach("Login with valid login", async ({ page }) => {
            //Launch the URL
            await page.goto('https://www.saucedemo.com/');

            // Login
            await page.locator('[data-test="username"]').fill('standard_user');
            await page.locator('[data-test="password"]').fill('secret_sauce');
            await page.locator('[data-test="login-button"]').click();

            //Assertion
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
            // await expect(page).toHaveURL("/.*\/inventory/")

        
    })

    test("Should confirm all prices are not zero", async ({ page }) => {
        let invenitmes = page.locator(".inventory_item")
        await expect(invenitmes).toHaveCount(6)

        let totalCount = await invenitmes.count()
         console.log("The total product count is: " + totalCount)
        let invenPrice = []

        for (let i = 0; i < totalCount; i++) {
            let productName = await invenitmes.nth(i).locator(".inventory_item_name").innerText();
            console.log(`The product name is: ${productName}`)
             let productprice = await invenitmes.nth(i).locator(".inventory_item_price").innerText();
              console.log(`The product price is: ${productprice}`)
              invenPrice.push(productprice);

        }
        console.log(`The proginal price list : ${invenPrice}`)

        let actualPrice=invenPrice.map((item)=>parseFloat(item.replace("$","")))
        console.log(`The price :${actualPrice}`)

        let priceresult=actualPrice.filter((item)=>item<=0)

        if(priceresult.length>0){
            console.log(`Zero price value found: ${priceresult}`)
        }else{
            console.log(`INFO: all price are non zero`)
        }

        expect(priceresult).toHaveLength(0)


    })
})