import CriaEventStateChange from "./event-url.js";

const objPages = [
	{ label: "Brigadeiros", handle: redirectToBrigadeiros },
	{ label: "Cupcakes", handle: redirectToCupcakes },
	{ label: "Doces", handle: redirectToDoces },
];

export default function Principal() {
	const div = document.createElement("div");
	const h1 = document.createElement("h1");

	h1.textContent = "Página principal";
	div.appendChild(h1);

	objPages.forEach((element) => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.textContent = element.label;
		btn.onclick = element.handle;
		div.appendChild(btn);
	});

	return div;
}

function redirectToBrigadeiros() {
	const eventStateChange = CriaEventStateChange("/public/brigadeiros");
	window.dispatchEvent(eventStateChange);
}

function redirectToCupcakes() {
	const eventStateChange = CriaEventStateChange("/public/cupcakes");
	window.dispatchEvent(eventStateChange);
}

function redirectToDoces() {
	const eventStateChange = CriaEventStateChange("/public/doces");
	window.dispatchEvent(eventStateChange);
}
