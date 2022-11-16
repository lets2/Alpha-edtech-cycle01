let clients = [];
/*
let client = {
	id: "", //number
	name: "", //string
	cep: "", //string
	gender: "", //string
	bDate: "", // obj date
};
*/
let count = 0;

function addClient(_name, _cep, _gender, _bDate) {
	//salvar esses dados num objeto
	//salvar esse obj no array
	const client = {};
	count++;
	client.id = count;
	client.name = _name;
	client.cep = _cep;
	client.gender = _gender;
	client.bDate = new Date(_bDate);
	clients.push(client);
}
const tableContainer = document.querySelector("#table");
const tableBody = document.querySelector("#table-body");

function listClients() {
	tableBody.innerHTML = `
                    <tr>
                        <td>id<td>
                        <td>name<td>
                        <td>cep<td>
                        <td>gender<td>
                        <td>birthdate<td>
                        <td>Edit<td>
                        <td>Delete<td>    
                    <tr>
                    `;
	let index = 0;
	while (index < clients.length) {
		tableBody.innerHTML += `
                        <tr>
                            <td>${clients[index].id}<td>
                            <td>${clients[index].name}<td>
                            <td>${clients[index].cep}<td>
                            <td>${clients[index].gender}<td>
                            <td>${convertDateToStringFormat(
															clients[index].bDate.toISOString()
														)}<td>
                            <td><img src="./assets/edit.png" id="edit" alt="image of a pen to edit"><td>
                            <td><img src="./assets/delete.png" id="delete" alt="image of a lixo to delete"><td>    
                        <tr>
                        `;
		index++;
	}
	//add numa tabela todos os elementos além de uma imagem de editar e outra de apagar
}

const buttonCreateClient = document.querySelector("#createClient");
const buttonListClients = document.querySelector("#listClients");
const message = document.querySelector("#message");
buttonCreateClient.addEventListener("click", () => {
	const fullname = document.querySelector("#fullname").value;
	const cep = document.querySelector("#cep").value;
	const gender = document.querySelector("#gender").value;
	const bDate = document.querySelector("#bDate").value;

	try {
		verifyIfAllDataOkay(fullname, cep, gender, bDate);
		addClient(fullname, cep, gender, bDate);
		messageSucessfully();
	} catch (error) {
		message.innerHTML = error;
	}
});

function verifyIfAllDataOkay(fullname, cep, gender, bDate) {
	if (fullname == "") {
		throw "FULL NAME IS EMPTY! PLEASE RETYPE!";
	}
	if (cep == "") {
		throw "CEP IS EMPTY! PLEASE RETYPE!";
	}
	if (gender == "") {
		throw "GENDER IS EMPTY! PLEASE RETYPE!";
	}
	if (bDate == "") {
		throw "DATE IS EMPTY! PLEASE RETYPE!";
	}
	const dateToday = new Date();
	const bDateObj = new Date(bDate);
	if (bDateObj.getTime() > dateToday.getTime()) {
		throw "DATE NEED BEFORE THAN TODAY!";
	}
	//verify if there are number on fullname
	let nameWithoutNumber = fullname.replace(/[0-9]/g, "");
	if (nameWithoutNumber.length !== fullname.length) {
		throw "FIELD NAME CAN NOT HAVE NUMBERS!";
	}
	//verify if there are letters on CEP
	let cepWithoutLetter = cep.replace(/[a-zA-Z]/g, "");
	if (cepWithoutLetter.length !== cep.length) {
		throw "FIELD CEP CAN NOT HAVE LETTERS!";
	}
}
function messageSucessfully() {
	message.innerHTML = "Cliente cadastrado com sucesso!";
}

buttonListClients.addEventListener("click", () => {
	listClients();
});

function convertDateToStringFormat(bDate) {
	console.log("bDate", bDate);
	const year = bDate.slice(0, 4);
	const month = bDate.slice(5, 7);
	const day = bDate.slice(8, 10);
	return day + "/" + month + "/" + year;
}
tableBody.addEventListener("click", (event) => {
	if (event.target.id === "delete") {
		console.log("eh pra deletar");
		const idDelete = parseInt(
			event.target.parentNode.parentNode.childNodes[1].textContent
		);
		deleteClient(idDelete);
	}
	listClients();
});

function deleteClient(deleteId) {
	console.log("Entrou na funcao de deletar! deleteID=", deleteId);
	let index = 0;
	while (index < clients.length) {
		if (clients[index].id === deleteId) {
			clients.splice(index, 1);
		}
		index++;
	}
}

// USANDO REGEX PRA IMPEDIR QUE DIGITEM COISA INVALIDA NO CEP E NO NOME:
const inputNameFull = document.querySelector("#fullname");
const inputCep = document.querySelector("#cep");

// REGEX NAME
inputNameFull.addEventListener("input", (event) => {
	standardizeName(); //remove numbers!
});

function standardizeName() {
	//let position = event.target.selectionStart; //get nicial selection position
	const nameWithoutNumber = inputNameFull.value.replace(/[0-9]/g, ""); //erase all character expect 0 to 9
	inputNameFull.value = nameWithoutNumber;
	//event.target.selectionEnd = position;
}

// REGEX - CEP
inputCep.addEventListener("input", (event) => {
	standardizeCep(event);
});
function standardizeCep(event) {
	let position = event.target.selectionStart; //get nicial selection position
	let onlyCepNumbers = inputCep.value.replace(/[^0-9]/g, ""); //erase all character expect 0 to 9
	console.log(onlyCepNumbers);
	if (onlyCepNumbers.length <= 5) {
		inputCep.value = onlyCepNumbers;
	} else {
		inputCep.value =
			onlyCepNumbers.slice(0, 5) + "-" + onlyCepNumbers.slice(5, 8);
		if (onlyCepNumbers >= 6 && position == 6) {
			position++;
		}
	}
	event.target.selectionEnd = position;
}
