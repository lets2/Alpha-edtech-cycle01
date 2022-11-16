const buttonAp = document.querySelector("button");
const p = document.querySelector("#paragrafo");
const inputNumber = document.querySelector("#inputNumber");
buttonAp.addEventListener("click", () => {
	const num = inputNumber.value;

	if (num === "" || isNaN(num)) {
		p.innerHTML = `O valor ${num} não é um número`;
	} else {
		if (Number(num) < 10) {
			p.innerHTML = `O valor ${num} é um número MENOR que 10`;
		} else if (Number(num) === 10) {
			p.innerHTML = `O valor ${num} é um número IGUAL a 10`;
		} else {
			p.innerHTML = `O valor ${num} é um número MAIOR que 10`;
		}
	}
});
