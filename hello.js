// my first program

let greeting="hello world"
console.log(greeting);

/**
 * 
 * @param {*} num1 
 * @param {*} num2 
 * @returns 
 */

function sum(num1,num2){
    return num1+num2
}

/**
 * var,let, const variable
 */
let val=0
val=10
console.log(val)

/**
 * const can't be reassigned
 */
const APP_URL="https://google.com"

// use of let in block support

let count=10
if(true){
    let count=20;
    console.log("The value inside the block is: "+count)
}
 console.log("The value outside the block is: "+count)