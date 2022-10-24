const buttonCalculate = document.querySelector("#calculate");
const buttonClear = document.querySelector("#clear");
const resultElement = document.querySelector("#result");
const classificationElement = document.querySelector("#classification");
const inputWeight = document.querySelector("#weight");
const inputHeight = document.querySelector("#height");


buttonClear.addEventListener("click",function(){
    inputWeight.value = "";
    inputHeight.value = "";
    resultElement.innerHTML = "Result";
    classificationElement.innerHTML = "Classification";
    resultElement.classList.add("hide-element");
    classificationElement.classList.add("hide-element");
    

})

buttonCalculate.addEventListener("click",()=>{
   if(isNumber()){
       const imc = calculateIMC();
       showIMC(imc);
       showClassification(imc);
   }
})

function calculateIMC(){
    const weight = parseFloat(inputWeight.value);
    const height = parseFloat(inputHeight.value);
    return (weight/(height*height)).toFixed(2);
}
function showIMC(imc){
    resultElement.innerHTML = `Result IMC = ${imc}`;
    resultElement.classList.remove("hide-element");
}
function showClassification(imc){
    let classification;
    if(imc<18.5){
        classification = "Abaixo do peso";
    }
    else if(imc<25){
        classification = "Peso normal";
    }
    else if(imc<30){
        classification = "Sobrepeso";
    }
    else{
        classification = "Obesidade";
    }
    classificationElement.innerHTML = `Classification: ${classification}`;
    classificationElement.classList.remove("hide-element");
}


function isNumber(){
    if(isNaN(inputHeight.value)||isNaN(inputHeight.value)||isEmpty()){
        //console.log("Não é válido, insira novamente")
        alert("Valores inválidos, por favor, insira novamente!");
        return false;
    } 
    else{
        console.log("Temos dois números");
        return true;
    }
}

function isEmpty(){
    if(inputHeight.value==""||inputWeight.value==""){
        console.log("campos vazios");
        return true;
    }
    else{
        console.log("tudo okay");
        return false;
    }
}