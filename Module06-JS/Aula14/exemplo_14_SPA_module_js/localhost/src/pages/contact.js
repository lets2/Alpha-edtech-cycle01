import {container, main,contentContact} from  "./constants.js";
import { createTagName } from "./utils.js";
export function renderContactPage(){
    container.innerHTML = "";
    console.log("Usou a função de renderContactPage");
    addElementsToContact(main);
    
}

export function  addElementsToContact(main){
    
    const section = createTagName("section");
    section.classList.add("container-contact");

    for(let i = 0; i<contentContact.length;i++){
        let div = createTagName("div"); ;
        div.classList.add("container-info");
        //div.innerHTML = "";//cleaning div
        addElementstoDIV(div,contentContact[i].content,contentContact[i].classIcon);
        section.appendChild(div);
    }

    main.appendChild(section);
}

function addElementstoDIV(div,contentP,classIcon){
    const p = createTagName("p");
    const icon = createTagName("i");
    p.innerHTML = contentP;

    icon.classList.add("icon");
    icon.classList.add(classIcon);

    div.appendChild(icon);
    div.appendChild(p);
}