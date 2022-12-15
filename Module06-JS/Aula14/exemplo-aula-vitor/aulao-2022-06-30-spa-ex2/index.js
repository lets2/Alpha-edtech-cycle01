function home() {
	const container = document.createElement("div");
	const template = `
    <h1>Bem-vindo(a)!</h1>
    <p>Essa é a home do site</p>
    `;
	container.innerHTML = template;
	return container;
}

function about() {
	const container = document.createElement("div");
	const template = `
    <h1>About us!</h1>
    <p>Essa page explica about us e when we starts to playing</p>
    `;
	container.innerHTML = template;
	return container;
}

function contacts() {
	const container = document.createElement("div");
	const template = `
    <h1>Contacts!</h1>
    <p>(xx)4002-8922</p>
    <p>email@testemail.com</p>
    
    `;
	container.innerHTML = template;
	return container;
}

const divMain = document.querySelector("#root");
const navegate = () => {
	divMain.innerHTML = "";
	const newHash = window.location.hash;
	switch (newHash) {
		case "#":
			divMain.appendChild(home());
			break;
		case "#about":
			divMain.appendChild(about());
			break;
		case "#contacts":
			divMain.appendChild(contacts());
			break;
		default:
			divMain.appendChild(home());
	}
};
window.addEventListener("load", navegate);

window.addEventListener("hashchange", navegate);
