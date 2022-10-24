const buttonDraw = document.querySelector("#draw");
const buttonClear = document.querySelector("#clear");
const resultElement = document.querySelector("#result");
const inputMininum = document.querySelector("#min");
const inputMaximum = document.querySelector("#max");


buttonClear.addEventListener("click",function(){
   clearInputsAndResults();
    
})

buttonDraw.addEventListener("click",()=>{
   if(isInputsAllRight()){
       const number = generateNumber();
       showNumber(number);
   }
})

function clearInputsAndResults(){
    inputMininum.value = "";
    inputMaximum.value = "";
    resultElement.innerHTML = "Result";
    resultElement.classList.add("hide-element");
}

function generateNumber(){
    const min = parseFloat(inputMininum.value);
    const max = parseFloat(inputMaximum.value);
    return (Math.random()*(max-min)+min).toFixed(2);//
}


function showNumber(number){
    resultElement.innerHTML = `Result: ${number}`;
    resultElement.classList.remove("hide-element");
}

function isInputsAllRight(){
    if(isNaN(inputMininum.value)||isNaN(inputMaximum.value)||isEmpty()){
        alert("Invalid values, please retype!");
        return false;
    } 
    else if(Number(inputMininum.value)>=Number(inputMaximum.value)){
        alert("The minimum field is not at the lowest value, check the fields!");
        return false;
    }
    else{
        return true;
    }
}

function isEmpty(){
    if(inputMininum.value==""||inputMaximum.value==""){
        return true;
    }
    else{
        return false;
    }
}