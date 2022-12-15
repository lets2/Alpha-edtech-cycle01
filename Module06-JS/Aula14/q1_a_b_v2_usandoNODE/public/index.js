import GeraObjComRotas from "./pages/router.js";

const root = document.querySelector("#root");
const objRotas = GeraObjComRotas();

//inicia
const page = objRotas.getPage("/public/home");
root.innerHTML = "";
root.appendChild(page);

//ouvir evento de "onstatechange"
window.addEventListener("onstatechange", (event) => {
	const url = event.detail.url;
	const page = objRotas.getPage(url);
	history.pushState({}, "", url);
	root.innerHTML = "";
	console.log("mostra a page", page);
	root.appendChild(page);
	console.log(window.location.pathname);
});

const urlNova = window.location.pathname;
console.log("ENTROU NO EVENTO DE LOAD!");

function onLoadPage() {
	let pageOnLoad = "";

	switch (window.location.pathname) {
		case "/public/index.html": {
			pageOnLoad = objRotas.getPage("/public/home");
			let teste = 10;
			break;
		}
		case "/public/home":
			pageOnLoad = objRotas.getPage("/public/home");
			let teste = 20;
			break;
		case "/public/brigadeiros":
			pageOnLoad = objRotas.getPage("/public/brigadeiros");
			break;
		case "/public/cupcakes":
			pageOnLoad = objRotas.getPage("/public/cupcakes");
			break;
		case "/public/doces":
			pageOnLoad = objRotas.getPage("/public/doces");
			break;
		default:
			console.log("Fazer página 404");
	}
	root.innerHTML = "";
	root.appendChild(pageOnLoad);
}

onLoadPage();
