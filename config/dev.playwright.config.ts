import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from "../playwright.config.ts"
import { EnvConfig } from "../tests/helpers/config-fixtures.ts"
import path from 'node:path';

console.log(`>> test are running in DEV env.....`)

export default defineConfig<EnvConfig>({

    ...baseConfig,//loads all axisting config value
    testDir:path.resolve(process.cwd(),"./tests"),

    use: {
        ...baseConfig.use,
        envName: "dev",
        appURL: "https://www.saucedemo.com/inventory.html",
        dbConfig: {
            server:"",
            dbname:"",
            connectionStr:"",

        }

    }

});

