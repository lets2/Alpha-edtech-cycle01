//Java script to atualize count by himself

const count = document.getElementById("percent");
const container = document.querySelector(".container-bar");
const bar = document.querySelector(".bar-left");
let flag_off = 1;

const icon_song = document.querySelector(".icon");

icon_song.addEventListener("click",()=>{
  if(flag_off==1){
    flag_off=0;
    icon_song.classList.add("on");
    icon_song.classList.remove("off");
    icon_song.src = "./assets/svg/sound-on.svg";
    console.log("Entrou no IF-MUSICA TEM QUE TOCAR");
    song.muted=false;
    song.play();  
    song.loop = true;
    song.volume = 0.05;
    
  }
  else{
    flag_off = 1;
    icon_song.classList.add("off");
    icon_song.classList.remove("on");
    icon_song.src = "./assets/svg/sound-off.svg";
    console.log("Entrou no ELSE-MUSICA TEM QUE MUTAR");
    song.muted=true;
    song.loop = true;

  }
})



let song = new Audio("./assets/songs/pacman.mp3");

//console.log("SOM:",song);
//console.log("SOM:",song.src);


/*
const load_page = document.body.addEventListener("click",()=>{
    console.log("Entrou no listener");
    song.play();
    song.loop = true;
    song.volume = 0.05;
});



*/

let percent_new;
/*
console.log(count);
console.log(count.textContent);
console.log(container.offsetWidth);
console.log(bar.offsetWidth);
console.log("porcentagem:",Math.floor(bar.offsetWidth*100/container.offsetWidth));
*/
function atualize_cont(){
  
   // console.log("ENTROU!");
   // console.log(count);
  //  console.log(count.textContent);
  //  console.log(container.offsetWidth);
   // console.log(bar.offsetWidth);
    percent_new = Math.floor(bar.offsetWidth*100/container.offsetWidth)
  //  console.log("porcentagem:",percent_new);
    count.innerHTML=` ${percent_new}%`;
}
//atualize cont each other second
setInterval(atualize_cont,200);
//setTimeout(executar,1000);
//executar();

