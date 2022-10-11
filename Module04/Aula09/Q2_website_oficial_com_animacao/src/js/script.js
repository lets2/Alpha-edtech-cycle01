
const target = document.querySelectorAll("[data-animation]");
const animationClass = "animate";
const getTitle = document.getElementById("title");

function animeScroll(){
    //console.log("Scrollou o mouse");
    let windowsTop = window.pageYOffset+(window.innerHeight * 3/4);
    //console.log(windowsTop);
    target.forEach(function(element){
        if(windowsTop>element.offsetTop){
            element.classList.add(animationClass);
        }
        else{
            element.classList.remove(animationClass);
        }
        //console.log(element.offsetTop);
    })
}

function animeTitle(){
    getTitle.classList.add(animationClass);
}
//this listener is actived when the page is loaded
window.addEventListener("load",function(){
    animeTitle();
})

animeScroll();//isso garante que minha função é ativada antes mesmo de scrolarem o site
/*sometimes a site dont have animations, so, if it happens, target wont have elements
and, therefore, the script dont need execute this function about listener*/
if(target.length){
    window.addEventListener("scroll",function(){
        animeScroll();
    });
}
