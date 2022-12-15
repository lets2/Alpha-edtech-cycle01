import BrigadeiroPage from "./brigadeiro-page.js";
import CandyPage from "./candy-page.js";
import CupCakePage from "./cupcakes-page.js";

import Evento from "./eventoCustomizado.js";

const objPages = [
	{ label: "Brigadeiro", handle: redirectToBrigadeiro },
	{ label: "Candies", handle: redirectToCandy },
	{ label: "Cupcakes", handle: redirectToCupCake },
];

export default function MainPage() {
	const div = document.createElement("div");
	const h1 = document.createElement("h1");

	h1.textContent = "Main page";
	div.appendChild(h1);

	objPages.forEach((element) => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.textContent = element.label;
		btn.onclick = element.handle; //redirectToBrigadeiro;
		div.appendChild(btn);
	});

	return div;
}

function redirectToBrigadeiro() {
	root.innerHTML = "";
	root.appendChild(BrigadeiroPage());
	const eventoCriado = Evento("/brigadeiro");
	window.dispatchEvent(eventoCriado);
}
function redirectToCandy() {
	root.innerHTML = "";
	root.appendChild(CandyPage());
	const eventoCriado = Evento("/candy");
	window.dispatchEvent(eventoCriado);
}
function redirectToCupCake() {
	root.innerHTML = "";
	root.appendChild(CupCakePage());
	const eventoCriado = Evento("/cupcakes");
	window.dispatchEvent(eventoCriado);
}

window.addEventListener("onstatechange", (event) => {
	console.log("url do evento novo:", event.detail.url);
});
