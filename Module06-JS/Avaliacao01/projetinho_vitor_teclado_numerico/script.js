const displayKeyboard = document.querySelector("#teclado-display");
const containerButtons = document.querySelector("#container-buttons");
console.log("100000");
let messageDisplay = "";
let igualEstaDisponivel = true;
containerButtons.addEventListener("click", (event) => {
	const content = event.target.innerText;
	switch (content) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			messageDisplay = messageDisplay + content;
			console.log("Display Atualmente", messageDisplay, content);
			displayKeyboard.innerText = content;
			console.log("mostra keyboard:", displayKeyboard.innerText);
			igualEstaDisponivel = true;
			break;
		case "=":
			removeZeros();
			if (igualEstaDisponivel) {
				igualEstaDisponivel = false;
				displayKeyboard.innerText = messageDisplay;
				messageDisplay = "";
			}
			break;
		default:
			console.log("Não clicou no botao!");
	}
});

function removeZeros() {
	let index = 1;
	let newString = messageDisplay;
	while (newString[0] === "0" && newString.length !== 1) {
		newString = newString.slice(1);
	}
	messageDisplay = newString;
}
