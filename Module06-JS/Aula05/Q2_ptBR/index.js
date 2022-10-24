const buttonDisplay = document.querySelector("#display");
const buttonClear = document.querySelector("#clear");
const inputDate = document.querySelector("#date");

const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const inputDayOfWeek = document.querySelector("#day-week");
const inputMonthName = document.querySelector("#month-name");
const inputMilliseconds = document.querySelector("#milliseconds");


buttonClear.addEventListener("click",function(){
   clearInputsAndResults(); 
})

buttonDisplay.addEventListener("click",()=>{
    let dateComplete = new Date(inputDate.value);
    if(dateComplete=="Invalid Date"){
        alert("Data inválida! Por favor, insira novamente.");
    }
    else{
        showInformationAbout(dateComplete);
    }

})

function clearInputsAndResults(){
    inputDate.value = "";
    inputDay.value ="";
    inputMonth.value = "";
    inputYear.value = "";
    inputDayOfWeek.value = "";
    inputMonthName.value = "";
    inputMilliseconds.value = "";
}

function showInformationAbout(dateComplete){
    showDay(dateComplete);
    showMonth(dateComplete);
    showYear(dateComplete);
    showDayOfWeek(dateComplete);
    showMonthName(dateComplete);
    showTimeInMilliseconds(dateComplete);
}

function showDay(dateComplete){
    inputDay.value = `${dateComplete.getUTCDate()}`;
}
function showMonth(dateComplete){
    //getUTCMonth return a number between 0 and 11
    inputMonth.value = `${dateComplete.getUTCMonth()+1}`;
}
function showYear(dateComplete){
    inputYear.value = `${dateComplete.getUTCFullYear()}`;
}
function showDayOfWeek(dateComplete){
    let dayOfWeek;
    switch(dateComplete.getUTCDay()){
        case 0:
            dayOfWeek = "Domingo";
            break;
        case 1:
            dayOfWeek = "Segunda-feira";
            break;
        case 2:
            dayOfWeek = "Terça-feira";
            break;
        case 3:
            dayOfWeek = "Quarta-feira";
            break;
        case 4:
            dayOfWeek = "Quinta-feira";
            break;
        case 5:
            dayOfWeek = "Sexta-feira";
            break;
        case 6:
            dayOfWeek = "Sábado";
            break;
    }
    inputDayOfWeek.value = `${dayOfWeek}`;
}
function showMonthName(dateComplete){
    let MonthName;
    switch(dateComplete.getUTCMonth()){
        case 0:
            MonthName = "Janeiro";
            break;
        case 1:
            MonthName = "Fevereiro";
            break;
        case 2:
            MonthName = "Março";
            break;
        case 3:
            MonthName= "Abril";
            break;
        case 4:
            MonthName = "Maio";
            break;
        case 5:
            MonthName = "Junho";
            break;
        case 6:
            MonthName = "Julho";
            break;
        case 7:
            MonthName= "Agosto";
            break;
        case 8:
            MonthName = "Setembro";
            break;
        case 9:
            MonthName = "Outubro";
            break;
        case 10:
            MonthName = "Novembro";
            break;
        case 11:
            MonthName = "Dezembro";
            break;       
    }
    inputMonthName.value = `${MonthName}`;
}
function showTimeInMilliseconds(dateComplete){
    const timeSince1970InMilliseconds = dateComplete.getTime();//get time in milliseconds;
    inputMilliseconds.value = `${timeSince1970InMilliseconds}`;
}
