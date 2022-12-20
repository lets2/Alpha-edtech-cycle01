const buttonGetData = document.querySelector("#button-get");
const messageError = document.querySelector("#message-error");
const result = document.querySelector("#result");
//const inputCep = document.querySelector("#cep");
const inputAllCep = document.querySelectorAll(".cep"); //get all elements

class FullAddress {
	#address;
	#cep;
	#city;
	#state;
	constructor(_address, _cep, _city, _state) {
		this.#address = _address;
		this.#cep = _cep;
		this.#city = _city;
		this.#state = _state;
	}
	get address() {
		return this.#address;
	}
	get cep() {
		return this.#cep;
	}
	get city() {
		return this.#city;
	}
	get state() {
		return this.#state;
	}
	set address(_newAdress) {
		this.#address = _newAdress;
	}
	showFullAddress() {
		return [this.#address, this.#cep, this.#city, this.#state]; //return a array with all data
	}
}

buttonGetData.addEventListener("click", allRequests);

let count = 0;

function allRequests() {
	const idInterval = setInterval(async () => {
		clearFields();
		try {
			console.log("cep testado", inputAllCep[count]);
			const cep = inputAllCep[count].value.replace(/[^0-9]/g, ""); //replace all things different from numbers
			if (cep.length !== 8) {
				throw "CEP IS INVALID, PLEASE RETYPE!";
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
		count++;
		if (count >= 3) {
			clearInterval(idInterval);
			count = 0;
		}
	}, 3000);
}

function clearFields() {
	messageError.innerText = "";
}

let newAddress;

function renderDataOnScreen(content) {
	console.log(content);
	result.innerHTML += `
    <hr>
        <h2>Address</h2>
        <span>${content.address}</span>
        <h2>Cep</h2>
        <span>${content.cep}</span>
        <h2>City</h2>
        <span>${content.city}</span>
        <h2>State</h2>
        <span>${content.state}</span>   
        `;
	newAddress = new FullAddress(
		content.address,
		content.cep,
		content.city,
		content.state
	);
	console.log("teste:", newAddress.address);
	console.log("teste:", newAddress.showFullAddress());
	newAddress.address = "Change|little tall city";
	console.log("teste:", newAddress.showFullAddress());
}
