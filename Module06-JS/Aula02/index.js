const buttonCompareNumbers = document.getElementById("compare-numbers");
const inputNumber1 = document.querySelector("#number1");
const inputNumber2 = document.querySelector("#number2");
const resultNumber = document.getElementById("result-number");
buttonCompareNumbers.addEventListener("click",function(event){
    event.preventDefault();//prevent the default behavior of a form is to reload the page
    compareNumbers();//call the function that compare two numbers
});

function compareNumbers(){
//    console.log("O evento foi:",event.target);
    const number1 = Number(inputNumber1.value);
    const number2 = Number(inputNumber2.value);

    if(number1>number2){
        resultNumber.innerHTML = `Number 1 is bigger than Number 2!`;
    }
    else{
        if(number2>number1){
            resultNumber.innerHTML = `Number 2 is bigger than Number 1!`;
        }
        else{
            resultNumber.innerHTML = `The two numbers are equal to ${number1}!`;
        }
    } 
}

const buttonCompareStrings = document.getElementById("compare-strings");
const inputString1 = document.querySelector("#string1");
const inputString2 = document.querySelector("#string2");
const resultString = document.getElementById("result-string");
buttonCompareStrings.addEventListener("click",function(event){
    event.preventDefault();//prevent the default behavior of a form is to reload the page
    compareStrings();//call the function that compare two numbers
});
//A string 1 é maior que a string 2
function compareStrings(){

    const lengthString1 = inputString1.value.length;
    const lengthString2 = inputString2.value.length;

    if(lengthString1>lengthString2){
        resultString.innerHTML = `String 1 is bigger than String 2! (${lengthString1}>${lengthString2})`;
    }
    else{
        if(lengthString2>lengthString1){
            resultString.innerHTML = `String 2 is bigger than String 1! (${lengthString2}>${lengthString1})`;
        }
        else{
            resultString.innerHTML = `Both strings are the same length! (${lengthString1})`;
        }
    } 
}
const clearInputNumber = document.getElementById("clear-input-number");
const clearInputString = document.getElementById("clear-input-string");

clearInputNumber.addEventListener("click",(event)=>{
    event.preventDefault();//prevent default behavior
    clearNumbers();
});
clearInputString.addEventListener("click",(event)=>{
    event.preventDefault();//prevent default behavior
    clearStrings();
});

function clearNumbers(){
    inputNumber1.value = "";
    inputNumber2.value = "";
    resultNumber.innerHTML = "--";
}
function clearStrings(){
    inputString1.value = "";
    inputString2.value = "";
    resultString.innerHTML = "--";
}
