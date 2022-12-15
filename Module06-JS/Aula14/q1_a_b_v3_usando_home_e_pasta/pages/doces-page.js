import CriaEventStateChange from "./event-url.js";

export default function CandyPage() {
	const div = document.createElement("div");

	const h1 = document.createElement("h1");
	h1.textContent = "Página de doces";
	div.appendChild(h1);

	const p = document.createElement("p");
	p.textContent =
		"O objetivo desta página é apresentar doces variados, aproveite bem!";
	div.appendChild(p);

	const btn = document.createElement("button");
	btn.type = "button";
	btn.textContent = "Voltar para a página Principal";
	btn.onclick = redirectToPrincipal;
	div.appendChild(btn);

	return div;
}

function redirectToPrincipal() {
	const eventStateChange = CriaEventStateChange("/home");
	window.dispatchEvent(eventStateChange);
}
