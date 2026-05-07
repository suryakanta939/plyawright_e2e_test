import { defineConfig, FullConfig } from '@playwright/test';
import { exec } from 'child_process';

export default async function globalTearDown(config: FullConfig) {

    console.log(`>> Starting the global teardown process.....`)
    if (process.env.RUNNER?.toUpperCase() === "local") {
        console.log(">> Local run Detected- starting allure server ...")
        exec("allure serve", (error, stdout, stderr) => {
            console.error("ERROR: Staring allure server:", error?.message);

        })
    }
    console.log(`>> Done With the global teardown process.....`)

}
