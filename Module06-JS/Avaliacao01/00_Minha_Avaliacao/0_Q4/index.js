const buttonSend = document.querySelector("#buttonSend");
const p = document.querySelector("#paragrafo");
const form = document.querySelector("#formData");
const inputName = document.querySelector("#inputName");
const inputAge = document.querySelector("#inputAge");
const inputGenger = document.querySelector("#gender");

buttonSend.addEventListener("click", (event) => {
	event.preventDefault();
	const messageWelcome = `Seja bem-vindo(a) ${inputName.value}, você tem ${inputAge.value} anos de idade`;
	const person = {
		name: inputName.value,
		age: parseInt(inputAge.value),
		gender: inputGenger.value,
		welcome: messageWelcome,
	};
	JSON.stringify(person);
	event.preventDefault();
	console.log("ENVIOU!");
	p.innerHTML = ` ${JSON.stringify(person)}`;
});

// const num = inputNumber.value;

// 	if (num === "" || isNaN(num)) {
// 		p.innerHTML = `O valor ${num} não é um número`;
// 	} else {
// 		if (Number(num) < 10) {
// 			p.innerHTML = `O valor ${num} é um número MENOR que 10`;
// 		} else if (Number(num) === 10) {
// 			p.innerHTML = `O valor ${num} é um número IGUAL a 10`;
// 		} else {
// 			p.innerHTML = `O valor ${num} é um número MAIOR que 10`;
// 		}
// 	}
