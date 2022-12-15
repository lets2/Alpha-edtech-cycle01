// /* window.addEventListener("load", () => {
// 	console.log("página carregou");
// });
//  */
// //isso consome evento
// window.addEventListener("pipocou", function () {
// 	console.log("pipoca aconteceu!");
// });

// //isso tambem consome evento
// window.addEventListener("pipocou", function () {
// 	console.log("consumi a pipoca também!");
// });

// const meuEvento = new CustomEvent("pipocou");
// //isso dispara evento, podem ser dois codigos separados, um codigo de consumidor e outro qweu dispara
// window.dispatchEvent(meuEvento);
import home from "./pages/home.js";
import about from "./pages/about.js";
import contacts from "./pages/contacts.js";

const main = document.querySelector("#root");

const init = () => {
	window.addEventListener("hashchange", () => {
		console.log(window.location.hash);
		main.innerHTML = "";
		switch (window.location.hash) {
			case "":
				main.appendChild(home());
				break;
			case "#about":
				main.appendChild(about());
				break;
			case "#contacts":
				main.appendChild(contacts());
				break;
			default:
				main.appendChild(home());
		}
	});
};

window.addEventListener("load", () => {
	main.appendChild(home());
	init(); //é chamada sempre que inicializa a página
});
