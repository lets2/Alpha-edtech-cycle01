import MainPage from "./main-page.js";

import Evento from "./eventoCustomizado.js";

export default function BrigadeiroPage() {
	const div = document.createElement("div");
	const h1 = document.createElement("h1");

	h1.textContent = "Brigadeiro page";
	div.appendChild(h1);

	const p = document.createElement("p");
	p.textContent =
		"O objetivo desta página é fornecer diversos tipos de brigadeiros deliciosos.";
	div.appendChild(p);

	const btn = document.createElement("button");
	btn.type = "button";
	btn.textContent = "back to Main Page";
	btn.onclick = redirectToMainPage;
	div.appendChild(btn);

	return div;
}

function redirectToMainPage() {
	root.innerHTML = "";
	root.appendChild(MainPage());
	const eventoCriado = Evento("/home");
	window.dispatchEvent(eventoCriado);
}
