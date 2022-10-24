const buttonWrite = document.querySelector("#write");
const buttonClear = document.querySelector("#clear");
const resultElement = document.querySelector("#number-spelled");
const inputNumber = document.querySelector("#number");

buttonClear.addEventListener("click",function(){
   clearInputsAndResults();
    
})

buttonWrite.addEventListener("click",()=>{
   if(isInputsAllRight()){
       const number = parseInt(inputNumber.value,10);
       writeSpelledOut(number);
   }
})

function clearInputsAndResults(){
    inputNumber.value = "";
    resultElement.value = "";
}

function writeSpelledOut(number){
    let text = "";
    switch(number){
        case 0:
            text = "Zero";
            break;
        case 1:
            text = "One";
            break;
        case 2:
            text = "Two";
            break;
        case 3:
            text = "Three";
            break;
        case 4:
            text = "Four";
            break;
        case 5:
            text = "Five";
            break;
        case 6:
            text = "Six";
            break;
        case 7:
            text = "Seven";
            break;
        case 8:
            text = "Eight";
            break;
        case 9:
            text = "Nine";
            break;
        case 10:
            text = "Ten";
            break;                      
    }
    resultElement.value = `${text}`;
   // resultElement.classList.remove("hide-element");
}

function isInputsAllRight(){
    if(isNaN(inputNumber.value)||isEmpty()){
        alert("Invalid value, please retype!");
        return false;
    } 
    else if(Number(inputNumber.value)<0||Number(inputNumber.value)>10){
        alert("The number is outside the range 0 to 10, please retype!");
        return false;
    }
    else{
        return true;
    }
}

function isEmpty(){
    if(inputNumber.value==""){
        return true;
    }
    else{
        return false;
    }
}