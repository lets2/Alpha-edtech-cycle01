const buttonCalculate = document.querySelector("#button-calculate");
const buttonReset = document.querySelector("#button-reset");
const inputOperand1 = document.querySelector("#element1");
const inputOperand2 = document.querySelector("#element2");
const selectOperator = document.querySelector("#operator");
const resultMessage = document.querySelector(".result");

let resultNumber;

buttonReset.addEventListener("click", (event) => {
    event.preventDefault();
    clearAll();
})

buttonCalculate.addEventListener("click", function(event) {
    event.preventDefault();//avoids the default behavior of reloading the page
    let operatorSymbol;
    if(operatorSymbol !== "noOperator" && isNotEmpty()) {
        const number1 = Number(inputOperand1.value);
        const number2 = Number(inputOperand2.value);
        operatorSymbol = discoverSymbol(selectOperator.value);
        resultNumber = calculateResult(number1, number2, selectOperator.value);
        showResultOnConsole(number1, number2, operatorSymbol, resultNumber);
        showResultOnHTML(number1, number2, operatorSymbol, resultNumber);
    }

    else if(operatorSymbol == "noOperator") {
        resultMessage.innerHTML = "Please, select operator!";
        resultMessage.classList.remove("hide-result");
    }

    else {
        alert("Invalid input data, re-enter!")
    }
})

/*
function getInputs() {
    return {inputs,errors}
}

*/

function clearAll() {
    inputOperand1.value = "";
    inputOperand2.value = "";
    resultMessage.innerHTML = "";
    resultMessage.classList.add("hide-result");
}

function showResultOnConsole(number1, number2, operatorSymbol, resultNumber) {
    console.log("Result:");
    console.log(number1, operatorSymbol, number2, "=", resultNumber);
}

function showResultOnHTML(number1, number2, operatorSymbol, resultNumber){
    resultMessage.innerHTML = `${number1} ${operatorSymbol} ${number2} = ${resultNumber}`;
    resultMessage.classList.remove("hide-result");
}

function discoverSymbol(operator) {
    let symbol;
    switch(operator) {
        case "add":
            symbol = "+";
            break;
        case "sub":
            symbol = "-";
            break;
        case "mult":
            symbol = "×";
            break;
        case "divi":
            symbol = "÷";
            break;
        default:
            symbol = "noOperator";
    }
    return symbol;
}

function calculateResult(number1, number2, operator){
    let result;
    switch(operator){
        case "add":
            result = number1 + number2;
            break;
        case "sub":
            result = number1 - number2;
            break;
        case "mult":
            result = number1 * number2;
            break;
        case "divi":
            if(number2 !== 0) result = limitedDecimalPlace(number1 / number2);
            else result = "Math Error";
            break;
    }
    return result;
}

function limitedDecimalPlace(result) {
   let resultString = result.toString();
   const dec = resultString.split(".")[1];

   if(dec.length > 6) result = Number(result).toFixed(6);

   return  result;
}

const isNotEmpty = () => !(inputOperand1.value == "" || inputOperand2.value == "");

