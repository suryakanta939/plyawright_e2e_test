import {test, expect} from '@playwright/test';
import fileHelper  from '../helpers/file-helper';
import { log } from '../helpers/logger.ts';
import MakeApptHomePage from '../page-objects/makeappt.home.page';


test('Login to make appt page',async ({page},testInfo) => {
        //Get the URL from configfile
        const envConfig=testInfo.project.use as any;

    const homePage = new MakeApptHomePage(page);

    // Login to make appt page

    await homePage.loginTomakeappt(envConfig.appURL,process.env.TEST_USER_NAME ,process.env.TEST_PASSWORD )

   

})