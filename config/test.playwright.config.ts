import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from "../playwright.config.ts"
import { EnvConfig } from "../tests/helpers/config-fixtures.ts"
import path from 'node:path';

console.log(`>> test is running in test env.........`)

export default defineConfig<EnvConfig>({

    ...baseConfig,//loads all axisting config value
    testDir:path.resolve(process.cwd(),"./tests"),

    use: {
        ...baseConfig.use,
        envName: "test",
        appURL: "https://katalon-demo-cura.herokuapp.com/",
        dbConfig: {
            server:"",
            dbname:"",
            connectionStr:"",

        }

    }

});

