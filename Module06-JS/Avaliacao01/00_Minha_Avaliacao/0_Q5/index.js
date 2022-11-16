const p = document.querySelector("#paragrafo");
const inputText = document.querySelector("#inputText");
const inputNumber = document.querySelector("#inputNumber");
const buttonClick = document.querySelector("button");
buttonClick.addEventListener("click", () => {
	let index = 0;
	let texto = "";
	p.innerHTML = "";
	while (index < parseInt(inputNumber.value)) {
		texto += inputText.value + " ";
		index++;
	}
	p.innerHTML = `${texto.slice(0, texto.length - 1)}` + ".";
});
