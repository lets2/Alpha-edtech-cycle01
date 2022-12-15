import { header, footer, contentTagA,contentCopyright } from "./constants.js";

export function  createTagName(tag){
    const tagName = document.createElement(tag);
    return tagName;
}

export function renderHeader(){
    addElementsToHeader(header);

}
export function addElementsToHeader(header){
    const nav = createTagName("nav");
    const ul = createTagName("ul");
    for(let cont = 0;cont<contentTagA.length;cont++){
        let a = createTagName("a");
        a.innerHTML = `${contentTagA[cont].label}`;

        let li = createTagName("li");
        li.appendChild(a);
        ul.appendChild(li);
        a.addEventListener("click",(event)=>{
            event.preventDefault();
            contentTagA[cont].handle();
        })
    }
    ul.id = "menu-options";
    nav.appendChild(ul);
    header.appendChild(nav);  
}

export function renderFooter(){
    addElementsToFooter(footer);
}
export function  addElementsToFooter(footer){
    const p = createTagName("p");
    p.innerHTML=contentCopyright;
    footer.appendChild(p);
}
