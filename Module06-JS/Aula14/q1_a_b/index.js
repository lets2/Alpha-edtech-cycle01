import MainPage from "./modules/main-page.js";

import navegateRouter from "./modules/router.js";

const root = document.querySelector("#root");

//root.appendChild(MainPage());
const objRouternovo = navegateRouter(); //retorna um objeto com as rotas
const page = objRouternovo.getPage("/home");
console.log("INICIA PAGINA COM ISSO", page);
root.innerHTML = "";
root.appendChild(page);
history.pushState({}, "", "/home");
console.log(history);

window.addEventListener("onstatechange", (event) => {
	console.log("url do evento novo:", event.detail.url);
	const urlInteresse = event.detail.url;
	const objRouternovo = navegateRouter(); //retorna um objeto com as rotas
	const page = objRouternovo.getPage(urlInteresse);
	console.log(page);
	root.innerHTML = "";
	root.appendChild(page);
	history.pushState({}, "", urlInteresse);
	console.log(history);
});
