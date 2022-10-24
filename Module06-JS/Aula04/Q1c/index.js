const buttonCalculate = document.querySelector("#calculate");
const buttonClear = document.querySelector("#clear");
const resultElement = document.querySelector("#result");
const inputFloat = document.querySelector("#float");

buttonClear.addEventListener("click",function(){
    clearInputsAndResult();
})

buttonCalculate.addEventListener("click",()=>{
   if(isNumber()&&isNotInteger()){
       const intLower = calculateLower();
       const intUpper = calculateUpper();   
       showResult(intLower,intUpper);
      
   }
})

function clearInputsAndResult(){
    inputFloat.value = "";
    resultElement.innerHTML = "Result";
    resultElement.classList.add("hide-element");
}

function calculateLower(){
    return Math.floor(parseFloat(inputFloat.value));
}
function calculateUpper(){
    return Math.ceil(parseFloat(inputFloat.value));
}

function showResult(intLower,intUpper){
    resultElement.innerHTML = `Your number is between ${intLower} and ${intUpper}!`;
    resultElement.classList.remove("hide-element");
}

function isNumber(){
    if(isNaN(inputFloat.value)||isEmpty()){
        alert("Invalid value, please retype!");
        return false;
    } 
    else{
        return true;
    }
}

function isEmpty(){
    if(inputFloat.value==""){
        return true;
    }
    else{
        return false;
    }
}

function isNotInteger(){
    const inputString = inputFloat.value.toString();
    //=1 implica que dont have ".", then is integer
    if(inputString.search(/[.]/)==-1){
        alert("Invalid value, please type a non-integer number!");
        return false;
    }
    else{
        return true;
    }
}