let countClick1 = 0;
let countClick2 = 0;
//get the button1
const button1 = document.getElementById("button1");

button1.addEventListener("click",mensageConsole);

function mensageConsole(event){
    countClick1 = countClick1+1;
    console.log("Hello, Console!!");
    console.log("Click on button 1 ",countClick1,"times");
   
}

//Actives when click on button 2
function functionOnClick(id){
    countClick2 = countClick2+1;
    console.log("Hello, Console!!");
    console.log("Click on",id,countClick2,"times");
}

//Actives when click on button 3
function clearConsole(){
    console.clear();
    countClick1 = 0;
    countClick2 = 0;
    
}

