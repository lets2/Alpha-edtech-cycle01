const p = document.querySelector("#paragrafo");
const inputText = document.querySelector("#inputText");
const buttodnAdd = document.querySelector("#adiciona");
const buttonList = document.querySelector("#lista");
const buttonReset = document.querySelector("#reseta");
let values = [];
buttodnAdd.addEventListener("click", () => {
	addValue(inputText.value);
});

function addValue(text) {
	try {
		if (text === "") {
			throw "Erro: tentativa de adicionar valor vazio";
		} else {
			values.push(text);
		}
	} catch (error) {
		p.innerHTML = `${error}`;
	}
}

buttonList.addEventListener("click", () => {
	const obj = Object(values);
	p.innerHTML = JSON.stringify(obj);
});

buttonReset.addEventListener("click", () => {
	values = [];
	p.innerHTML = "";
});
