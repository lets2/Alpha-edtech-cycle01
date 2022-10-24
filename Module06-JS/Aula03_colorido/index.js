const input1 = document.querySelector("#element1");
const input2 = document.querySelector("#element2");
const select = document.querySelector("#operator");
const btn = document.querySelector("#btn");
const reset = document.querySelector("#reset");
const resultMessage = document.querySelector(".result");

let resultNumber;

reset.addEventListener("click",(event)=>{
    event.preventDefault();
    input1.value = "";
    input2.value = "";
    resultMessage.innerHTML = "";
    resultMessage.classList.add("hide-result");
})
btn.addEventListener("click",function(event){
    event.preventDefault();//avoids the default behavior of reloading the page
    let operatorSymbol;
    const number1 = Number(input1.value);
    const number2 = Number(input2.value);
    operatorSymbol = discoverSymbol(select.value);
    resultNumber = calculateResult(number1,number2,select.value);
    showResultOnConsole(number1,number2,operatorSymbol,resultNumber);
    showResultOnHTML(number1,number2,operatorSymbol,resultNumber);
})

function showResultOnConsole(number1,number2,operatorSymbol,resultNumber){
    console.log("Result:");
    console.log(number1,operatorSymbol,number2,"=",resultNumber);
}

function showResultOnHTML(number1,number2,operatorSymbol,resultNumber){
    resultMessage.innerHTML = `${number1} ${operatorSymbol} ${number2} = ${resultNumber}`;
    resultMessage.classList.remove("hide-result");
}

function discoverSymbol(operator){
    let symbol;
    switch(operator){
        case "add":
            symbol="+";
            break;
        case "sub":
            symbol="-";
            break;
        case "mult":
            symbol="×";
            break;
        case "divi":
            symbol="÷";
            break;
        }
        return symbol;
}
function calculateResult(number1,number2,operator){
    let result;
    switch(operator){
        case "add":
            result = number1+number2;
            break;
        case "sub":
            result = number1-number2;
            break;
        case "mult":
            result = number1*number2;
            break;
        case "divi":
            if(number2!==0){
                result = number1/number2;
            }
            else{
                alert("Divisão por zero!");
                result = "Math Error";
            }
            break;
    }

    return result;
}