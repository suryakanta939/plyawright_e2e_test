import fs from "fs"
import path from "path"
import {parse} from "csv-parse/sync"

//  const csvFilepath=path.resolve(`${process.cwd()}/data/functional/make-appt-test-data.csv`)
//  const csvDataString=fs.readFileSync(csvFilepath,{encoding:"utf-8"})
//  const csvDataArr=parse(csvDataString, 
//     { 
//         columns: true, 
//         skip_empty_lines: true ,
//         trim:true   
//      })
//  console.log(`>> csv data is :${JSON.stringify(csvDataArr)}`)

 //make the above code as re-usable functionfu

 function readcSV(filepath:string):any[]{
    const csvDataString=fs.readFileSync(filepath,{encoding:"utf-8"})
    const csvDataArr= parse(csvDataString, { 
        columns: true, 
        skip_empty_lines: true ,
        trim:true   
     })
     return csvDataArr
 }

 // unit testing the above function
 const testFilePath=path.resolve(`${process.cwd()}/data/functional/make-appt-test-data.csv`)
 const testData=readcSV(testFilePath)
 console.log(`>> test data is :${JSON.stringify(testData)}`)
 console.log(`>> test data length is :${testData.length}`)
 console.log(`>> test data first record is :${testData[0]}`)
 console.log(`>> test data first record name is :${testData[0].hcp}`)