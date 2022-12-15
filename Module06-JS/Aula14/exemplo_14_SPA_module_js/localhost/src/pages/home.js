import {container, main,contentTagH1,contentTagP,contentTagIMG} from  "./constants.js";
import { createTagName } from "./utils.js";
export function renderHomePage(){
    container.innerHTML = "";
    console.log("Usou a função de renderHomePage");
    addElementsToHome(main);
    
}

export function  addElementsToHome(main){
    const h1 = createTagName("h1");
    const p = createTagName("p");
    const figure =  createTagName("figure");
    const img = createTagName("img");
    img.setAttribute("src",contentTagIMG.src);
    img.setAttribute("alt",contentTagIMG.alt);
    figure.appendChild(img);
    figure.classList.add("poster");
    h1.innerHTML=contentTagH1;
    p.innerHTML=contentTagP;
    main.appendChild(h1);
    main.appendChild(p);
    main.appendChild(figure);
}