//Object with data car
const cars = [
    {
        src:"./src/assets/brand.PNG"
    },
    {
        name:"SF90 STRADALE",
        maker:"Ferrari",
        maxSpeed:"340km/h",
        acceleration:"2.5 sec",
        power:"780 CV",
        src:"./src/assets/car01-ferrari-sf90.PNG"
    },
    {
        name:"S8 SPIDER",
        maker:"Ferrari",
        maxSpeed:"340km/h",
        acceleration:"2.9 sec",
        power:"720 CV",
        src:"./src/assets/car02-ferrari-s8-spider.PNG"
    },
    {
        name:"718 BOXSTER",
        maker:"Porsche",
        maxSpeed:"275km/h",
        acceleration:"5.1 sec",
        power:"300 CV",
        src:"./src/assets/car03-porsche-718-boxster.PNG"
    },
    {
        name:"AVENTADOR LP 780-4 ULTIMAE",
        maker:"Lamborguini",
        maxSpeed:"355km/h",
        acceleration:"2.8 sec",
        power:"780 CV",
        src:"./src/assets/car04-lamborguini-aventador-lp-780-4-ultimae.PNG"
    }  
]

const carSelected = document.querySelector("#product");
const imageCar = document.querySelector(".img-car");

const nameCar = document.querySelector("#name");
const maker = document.querySelector("#maker");
const maxSpeed = document.querySelector("#maxSpeed");
const acceleration = document.querySelector("#acceleration");
const power = document.querySelector("#power");

const brand = document.querySelector("#brand");

carSelected.addEventListener("change",(event) => {
    showCar(event.target);
})

function showCar(element){
    //console.log(element);
    console.log(element.value);
    const id = findIdCar(element.value);

    brand.classList.add("hide");
    showCarInformation(id);
   // imageCar.setAttribute("src","./src/assets/car01.PNG");
    
}

function findIdCar(option){
    let id;
    switch (option){
        case "car01":
            id = 1;
            break;
        case "car02":
            id = 2;
            break;
        case "car03":
            id = 3;
            break;
        case "car04":
            id = 4;
            break;
        default:
            sourceImg = 0;  
    }
    return id;
}
function showCarInformation(id){
    if(id!==0){
        imageCar.setAttribute("src",cars[id].src);
        nameCar.innerHTML = `Name: <span>${cars[id].name}</span>`;
        maker.innerHTML = `Maker: <span>${cars[id].maker}</span>`;
        maxSpeed.innerHTML = `Max. Speed: <span>${cars[id].maxSpeed}</span>`;
        acceleration.innerHTML = `0-100km/h: <span>${cars[id].acceleration}</span>`;
        power.innerHTML = `Power: <span>${cars[id].power}</span>`;
    }
    else{
        imageCar.setAttribute("src",cars[id].src);
    }
}
