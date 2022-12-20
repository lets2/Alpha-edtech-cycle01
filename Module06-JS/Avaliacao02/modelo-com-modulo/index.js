const inputFullname = document.querySelector("#fullname");
const buttonSend = document.querySelector("#send");
const messageError = document.querySelector("#message-error");
const containerResult = document.querySelector("#result");

import AscII from "./AscII.js";

buttonSend.addEventListener("click", () => {
	//console.log(inputFullname.value);
	const fullname = inputFullname.value;
	const objAscII = new AscII(fullname);
	const code = objAscII.getCode();
	messageError.innerHTML = `<p>DEU RUIM!!<p>`;
	containerResult.innerHTML = inputFullname.value;
	containerResult.innerHTML += `<p>"My code is " + ${code}<p>`;
});

//EXEMPLO DE FETCH COM ASYNC AWAIT

/*
try {
			console.log("cep testado", inputCep.value);
			const cep = inputCep.value.replace(/[^0-9]/g, ""); //replace all things different from numbers
			if (cep.length !== 8) {
				throw "[error] CEP IS INVALID, PLEASE RETYPE!";
			}
			const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
			console.log(response);
			if (response.status !== 200) {
				throw "[error] Unable to pick up information, please check that cep entered is correct.";
			}
			const content = await response.json();
			renderDataOnScreen(content);
		} catch (error) {
			messageError.innerText += error;
		}

*/
