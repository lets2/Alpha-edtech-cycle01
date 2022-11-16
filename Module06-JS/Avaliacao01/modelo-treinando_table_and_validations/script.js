//global variables
const inputNameProduct = document.querySelector("#nameProduct");
const inputPriceProduct = document.querySelector("#priceProduct");
const buttonCreate = document.querySelector("#create");
const buttonShowList = document.querySelector("#showList");
const buttonHiddenList = document.querySelector("#hiddenList");
const messageWarning = document.querySelector("#message");
const containerProducts = document.querySelector("#containerProducts");
let listOfProducts = [];
//each object cotains a object that represent a product {id:"", name:"",price:""}
let counter = 0;
buttonCreate.addEventListener("click", () => {
	try {
		verifyIfDataIsValid();
		addProductInList();
	} catch (error) {
		console.log("Error:", error);
		messageWarning.innerText = error;
		messageWarning.classList.add("error");
		messageWarning.classList.remove("okay");
	}
});

inputPriceProduct.addEventListener("input", () => {
	standardizePrice();
});

function standardizePrice() {
	let newStringPrice = inputPriceProduct.value;
	if (newStringPrice.indexOf(".") === -1) {
		inputPriceProduct.value = inputPriceProduct.value.replace(",", ".");
		inputPriceProduct.value = inputPriceProduct.value.replace(/[^0-9"."]/g, "");
	} else {
		const indexFirstPoint = newStringPrice.indexOf(".");
		newStringPrice = newStringPrice.replace(/\./g, ""); //erase all dot on string
		newStringPrice = newStringPrice.replace(",", "");
		newStringPrice =
			newStringPrice.slice(0, indexFirstPoint) +
			"." +
			newStringPrice.slice(indexFirstPoint, indexFirstPoint + 2);
		inputPriceProduct.value = newStringPrice;
	}
}

function verifyIfDataIsValid() {
	if (inputNameProduct.value == "" || inputPriceProduct.value == "") {
		throw "[error] Please fill all fields!";
	}
	if (inputNameProduct.value.length < 4) {
		throw "[error] Please 'Field name' needs 4 characters at least!";
	}

	if (isNaN(inputPriceProduct.value)) {
		throw "[error] 'Field Price' needs to be a number! Please retype!";
	}

	console.log("Validate!");
}
function addProductInList() {
	counter += 1;
	const objProduct = {
		id: counter,
		name: inputNameProduct.value,
		price: Number(inputPriceProduct.value).toFixed(2),
	};
	listOfProducts.push(objProduct);
	inputNameProduct.value = "";
	inputPriceProduct.value = "";
	messageWarning.innerText = "Product has just been added!";
	messageWarning.classList.add("okay");
	messageWarning.classList.remove("error");
}

buttonShowList.addEventListener("click", () => {
	showListProducts();
});

buttonHiddenList.addEventListener("click", () => {
	hiddenProducts();
});
const tHeadElement = document.querySelector("thead");

function showListProducts() {
	tHeadElement.innerHTML = `<tr>
                        <th>ID</th>
                        <th>NAME</th>  
                        <th>PRICE (R$)</th>                                       
                    </tr>
                    `;
	containerProducts.innerHTML = "";
	let index = 0;

	while (index < listOfProducts.length) {
		const newRow = containerProducts.insertRow(-1); //create new line
		const newCell_Id = newRow.insertCell(0); //create cell in index [0]
		const newId = document.createTextNode(listOfProducts[index].id); //add content
		newCell_Id.appendChild(newId); //append content to cell;
		const newCell_Name = newRow.insertCell(1);
		const newName = document.createTextNode(listOfProducts[index].name);
		newCell_Name.appendChild(newName);
		const newCell_Price = newRow.insertCell(2);
		const newPrice = document.createTextNode(listOfProducts[index].price);
		newCell_Price.appendChild(newPrice);

		//containerProducts.innerHTML += `<p>NAME: ${listOfProducts[index].name} PRICE: R${listOfProducts[index].price} ID:${listOfProducts[index].id}</p>`;
		index++;
	}
}

function hiddenProducts() {
	tHeadElement.innerHTML = "";
	containerProducts.innerHTML = "";
}

//Algorith to delete a element

const containerDeleteField = document.querySelector("#container-delete-field");
const inputIdToDelete = document.querySelector("#idToDelete");
const buttonDelete = document.querySelector("#deleteButton");

buttonDelete.addEventListener("click", () => {
	try {
		verifyIfIdFieldIsValid();
		deleteProduct();
	} catch (error) {
		messageWarning.innerHTML = error;
		messageWarning.classList.add("error");
		messageWarning.classList.remove("okay");
	}
});

function verifyIfIdFieldIsValid() {
	if (inputIdToDelete.value === "") {
		throw "[error] 'Field ID' is empty! Please insert a number!";
	}
	if (isNaN(inputIdToDelete.value)) {
		throw "[error] 'Field ID' needs to be a number! Please retype!";
	}
	if (Number.isInteger(Number(inputIdToDelete.value)) === false) {
		throw "[error] 'Field ID' needs to be a integer number! Please retype!";
	}
}

function deleteProduct() {
	let indexElement = -1;
	indexElement = findIndexToDelete();
	if (indexElement === -1) {
		messageWarning.innerHTML = "There is not a element with this ID";
		messageWarning.classList.add("error");
		messageWarning.classList.remove("okay");
	} else {
		let objDeleted = listOfProducts[indexElement];
		listOfProducts.splice(indexElement, 1);
		messageWarning.innerHTML = "Element successfully deleted!";
		messageWarning.classList.add("okay");
		messageWarning.classList.remove("error");
		showListProducts(); //show list updated
		showElementDeletedOnConsole(objDeleted);
		showElementDeletedOnHtml(objDeleted);
	}
}
function findIndexToDelete() {
	let index = 0;
	while (index < listOfProducts.length) {
		//convert to number before to compare
		if (parseInt(inputIdToDelete.value) === listOfProducts[index].id) {
			return index;
		}
		index++;
	}

	return -1;
}

function showElementDeletedOnConsole(objElem) {
	console.log("Objeto deletado foi:", objElem);
	console.log("Convertendo para string usando STRINGIFY");
	let stringNew = JSON.stringify(objElem);
	console.log("FORMATO DE STRING:", stringNew);
	console.log("Contertendo novamente para JSON:", JSON.parse(stringNew));
}

const darkBox = document.querySelector("#dark-box");
const boxElement = document.querySelector("#box-element");

function showElementDeletedOnHtml(objElem) {
	darkBox.classList.remove("hidden-element");
	darkBox.classList.add("flex-center");
	boxElement.innerHTML = `<h3>Product deleted:<h3>`;
	boxElement.innerHTML += `<p><span>Name:</span>${objElem.name}</p>`;
	boxElement.innerHTML += `<p><span>Price:</span>R$${objElem.price}</p>`;
	boxElement.innerHTML += `<p><span>ID:</span>${objElem.id}</p>`;

	//boxElement.innerHTML = `${JSON.stringify(objElem)}`;
}

darkBox.addEventListener("click", () => {
	darkBox.classList.add("hidden-element");
	//darkBox.classList.remove("flex-center");
});
