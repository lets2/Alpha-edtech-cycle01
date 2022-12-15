import { createTagName } from "./utils.js";
import { container,main,content1AboutMovie,content2AboutMovie,contentTagH1,contentTagH2,
contentTagIMG } from "./constants.js";


/*CREATE THE CODE THAT RENDER THE MOVIE PAGE*/
export function renderMoviePage(){
    container.innerHTML = "";
    console.log("Usou a função de renderMoviePage");
    addElementsToMainMovie(main);
}
export function addElementsToMainMovie(main){
    const h1 = createTagName("h1");
    const h2 = createTagName("h2");
    let p1 = createTagName("p");
    let p2 = createTagName("p");
    
    const figure =  createTagName("figure");
    const img = createTagName("img");
    img.setAttribute("src",contentTagIMG.src);
    img.setAttribute("alt",contentTagIMG.alt);
    figure.appendChild(img);
    figure.classList.add("poster");
    h1.innerHTML=contentTagH1;
    h2.innerHTML=contentTagH2;
    main.appendChild(h1);
    main.appendChild(figure);
    main.appendChild(h2);
    p1.innerHTML=content1AboutMovie;
    main.appendChild(p1);
    p2.innerHTML=content2AboutMovie;
    main.appendChild(p2);
}