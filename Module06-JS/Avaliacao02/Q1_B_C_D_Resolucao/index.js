const inputEmail = document.querySelector("#email");
const inputDate = document.querySelector("#birthDate");
const buttonSend = document.querySelector("#send");
const messageError = document.querySelector("#message-error");
const containerResult = document.querySelector("#result");

buttonSend.addEventListener("click", async () => {
	containerResult.innerHTML = "";
	messageError.innerHTML = "";
	const email = inputEmail.value;
	const birthDate = inputDate.value;
	const pessoa = new Person(email, birthDate);
	const code = pessoa.getCode();
	console.log(email);
	console.log(birthDate);
	console.log(pessoa);
	console.log(code);
	try {
		const response = await fetch(
			`http://45.77.6.136/person?email=${email}&birthdate=${birthDate}&code=${code}`
		);
		console.log(response);
		if (response.status !== 200) {
			throw new Error(
				"[erro] Verifique email ou data de nascimento e tente novamente!"
			);
		}
		const content = await response.json();
		console.log("Conteudo", content);
		containerResult.innerHTML = `<p>${content.message}</p>`;
	} catch (error) {
		messageError.innerText = error.message;
	}
});

class Person {
	email;
	birthDate;
	constructor(_email, _birthDate) {
		this.email = _email;
		this.birthDate = _birthDate;
	}
	getEmail() {
		return this.email;
	}
	getBirthDate() {
		return this.birthDate;
	}
	getCode() {
		const justString = this.birthDate.replace(/-/g, "");
		let sum = 0;
		for (let i = 0; i < justString.length; i++) {
			sum += parseInt(justString[i]);
		}
		return sum;
	}
}
