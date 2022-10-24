const buttonDisplay = document.querySelector("#display");
const buttonClear = document.querySelector("#clear");
const optionPokemon = document.querySelector("#pokemon");
const imagePokemon = document.querySelector("#img-pokemon");

buttonClear.addEventListener("click",function(){
   clearAll(); 
})

buttonDisplay.addEventListener("click",()=>{
    if(isPokemon()){
        showPokemon();
    }
    else{
        alert("Please, choose a Pokémon");
    }
})

function isPokemon(){
    if(optionPokemon.value=="Choose"){
        return false;
    }
    else{
        return true;
    }
}


function clearAll(){
    //imagePokemon.classList.add("hide-element");
   imagePokemon.setAttribute("src","./assets/center.png")

}

function showPokemon(){
    const pokemonName = optionPokemon.value;
    showImageOf(pokemonName);
}

function showImageOf(name){
   // imagePokemon.classList.remove("hide-element");
    let imageSRC;
    switch(name){
        case "item1":
            imageSRC = "./assets/img1-pikachu.png";
            break;
        case "item2":
            imageSRC = "./assets/img2-charmander.png";
            break;ka
        case "item3":
            imageSRC = "./assets/img3-squirtle.png";
            break;
        case "item4":
            imageSRC = "./assets/img4-bulbasaur.png";
            break;
        case "item5":
            imageSRC = "./assets/img5-torchic.png";
            break;
        case "item6":
            imageSRC = "./assets/img6-piplup.png";
            break;
        case "item7":
            imageSRC = "./assets/img7-turtwig.png";
            break;
    }
    imagePokemon.setAttribute("src",imageSRC);
}