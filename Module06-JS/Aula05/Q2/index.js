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
        alert("Invalid date, please retype!");
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
            dayOfWeek = "Sunday";
            break;
        case 1:
            dayOfWeek = "Monday";
            break;
        case 2:
            dayOfWeek = "Tuesday";
            break;
        case 3:
            dayOfWeek = "Wednesday";
            break;
        case 4:
            dayOfWeek = "Thursday";
            break;
        case 5:
            dayOfWeek = "Friday";
            break;
        case 6:
            dayOfWeek = "Saturday";
            break;
    }
    inputDayOfWeek.value = `${dayOfWeek}`;
}
function showMonthName(dateComplete){
    let MonthName;
    switch(dateComplete.getUTCMonth()){
        case 0:
            MonthName = "January";
            break;
        case 1:
            MonthName = "February";
            break;
        case 2:
            MonthName = "March";
            break;
        case 3:
            MonthName= "April";
            break;
        case 4:
            MonthName = "May";
            break;
        case 5:
            MonthName = "June";
            break;
        case 6:
            MonthName = "July";
            break;
        case 7:
            MonthName= "August";
            break;
        case 8:
            MonthName = "September";
            break;
        case 9:
            MonthName = "October";
            break;
        case 10:
            MonthName = "November";
            break;
        case 11:
            MonthName = "December";
            break;       
    }
    inputMonthName.value = `${MonthName}`;
}
function showTimeInMilliseconds(dateComplete){
    const timeSince1970InMilliseconds = dateComplete.getTime();//get time in milliseconds;
    inputMilliseconds.value = `${timeSince1970InMilliseconds}`;
}

