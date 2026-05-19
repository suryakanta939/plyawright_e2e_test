import { defineConfig, FullConfig } from '@playwright/test';
import path from 'node:path';
import fs from "fs"


export default async function globalSetUp(config:FullConfig) {

    if(process.env.RUNNER?.toUpperCase()==="local"){
        console.log(`[INFO]: Detecting a local run...`)
    }

    // delete allure results
    const resultDir=path.resolve(process.cwd(),"allure-results")
    console.log(`>> the path is :${resultDir}`)
    if(fs.existsSync(resultDir)){
        fs.rmSync(resultDir,{recursive:true,force:true});
         console.log(`[INFO]: allure result delted fro local run..`)
    }
     console.log(`[INFO]: global set up is done...`)

     //set the login cookies as global varibale
     process.env.LOGIN_COOKIE=undefined
    
}
