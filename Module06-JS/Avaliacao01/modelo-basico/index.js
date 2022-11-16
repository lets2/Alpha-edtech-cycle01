//Lembrete variavelString.substring(2,5) retorna uma substring com os elementos de indice 2 até o indice 5

//
//Lembrete variavelString.slice(2,5) retorna uma substring comecando no indice 2 até o indice 5-1=4
//Lembrete variavelArray.splice(2,3) remove 3 elementos a partir do indice 2
//

const inputName = document.querySelector("#inputName");
const inputNumber1 = document.querySelector("#inputNumber1");
const inputNumber2 = document.querySelector("#inputNumber2");
const inputDay = document.querySelector("#inputDay");
const inputMonth = document.querySelector("#inputMonth");
const inputYear = document.querySelector("#inputYear");
const inputCep = document.querySelector("#inputCep");

const select = document.querySelector("#box");
const inputComment = document.querySelector("#comment");

const buttonSend = document.querySelector("#buttonSend");
const buttonValidate = document.querySelector("#buttonValidate");
const buttonClear = document.querySelector("#buttonClear");

const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");

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

//REGEX - NAME
inputName.addEventListener("input", (event) => {
	standardizeName(event);
});

function standardizeName(event) {
	const position = event.target.selectionStart;
	const onlyAlphabet = inputName.value.replace(/[^a-zA-Z]/g, "");

	inputName.value = onlyAlphabet;
	event.target.selectionEnd = position;
}

// Validate data
buttonValidate.addEventListener("click", () => {
	validateData();
});
function validateData() {
	try {
		//validate Number
		if (isNaN(inputNumber1.value) || isNaN(inputNumber2.value)) {
			throw "[error] Input number invalid! Please type a number!";
		}
		if (inputNumber1.value === "" || inputNumber2.value === "") {
			throw "[error] Some input number is empty! Please retype!";
		}

		//Validate Name length >=4 characters
		if (inputName.value.length < 4) {
			throw "[error] Input name need to have 4 or more characters! Please retype!";
		}

		message1.innerHTML = "Inputs are okay!";
		message1.classList.add("message-okay");
		message1.classList.remove("message-error");
	} catch (error) {
		message1.innerHTML = `${error}`;
		message1.classList.add("message-error");
		message1.classList.remove("message-okay");
	}
}

//catch date type and save on object
const inputDate = document.querySelector("#inputDate");

inputDate.addEventListener("input", (event) => {
	console.log(
		"Valor do input date = ",
		event.target.valueAsDate,
		"tipo = ",
		typeof event.target.valueAsDate
	);
	const stringDate = event.target.value;
	console.log(
		"Valor do input date = ",
		stringDate,
		"tipo = ",
		typeof stringDate
	);

	//const thisDay = stringDate.slice(8, 10);
	//const thisMonth = stringDate.slice(5, 7);
	//const thisYear = stringDate.slice(0, 4);
	const thisDay = stringDate.substring(8, 10);
	const thisMonth = stringDate.substring(5, 7);
	const thisYear = stringDate.substring(0, 4);
	console.log("dia mes e ano=", thisDay, thisMonth, thisYear);
	const newDate = new Date(thisYear, thisMonth, thisDay);
	console.log("Estamos aqui nova data:", newDate);
	console.log("RFC 3339:", newDate.toISOString());
	console.log("Usando get:");
	console.log("Get dia usamos getDate:", newDate.getDate());
	console.log("Get dia usamos getMonth:", newDate.getMonth());
	console.log("Get dia usamos getFullYear:", newDate.getFullYear());
	console.log("Get dia usamos getDay:", newDate.getDay());
	console.log("Get dia usamos getTime:", newDate.getTime());
});

// program to check if a number is a float or integer value

function checkNumber(x) {
	// check if the passed value is a number
	if (typeof x == "number" && !isNaN(x)) {
		// check if it is integer
		if (Number.isInteger(x)) {
			console.log(`${x} is integer.`);
		} else {
			console.log(`${x} is a float value.`);
		}
	} else {
		console.log(`${x} is not a number`);
	}
}

checkNumber("hello");
checkNumber(44);
checkNumber(3.4);
checkNumber(-3.4);
checkNumber(NaN);

// dark mode change

const iconMode = document.querySelector("#icon-mode");
const htmlElement = document.querySelector("html");
iconMode.addEventListener("click", () => {
	if (iconMode.classList.contains("darkModeOn")) {
		iconMode.classList.remove("darkModeOn");
		iconMode.setAttribute("src", "./dark-mode-off.svg");
		htmlElement.classList.remove("dark-mode");
	} else {
		iconMode.classList.add("darkModeOn");
		iconMode.setAttribute("src", "./dark-mode-on.svg");
		htmlElement.classList.add("dark-mode");
	}
});

// keyboard note, do, re, mi, fa, sol,la,si
const keyboardContainer = document.querySelector(".keyboard");

keyboardContainer.addEventListener("click", (event) => {
	console.log("eventTarget=", event.target.id);
	touchNote(event.target.id);
});

const notes = [
	new Audio("./sounds/pixabay01_do.mp3"),
	new Audio("./sounds/pixabay02_re.mp3"),
	new Audio("./sounds/pixabay03_mi.mp3"),
	new Audio("./sounds/pixabay04_fa.mp3"),
	new Audio("./sounds/pixabay05_sol.mp3"),
	new Audio("./sounds/pixabay06_la.mp3"),
	new Audio("./sounds/pixabay07_si.mp3"),
];
notes.map((noteFile) => {
	noteFile.load();
});
function touchNote(note) {
	switch (note) {
		case "do":
			console.log("sings DO!");
			notes[0].play();
			break;
		case "re":
			console.log("sings RE!");
			notes[1].play();
			break;
		case "mi":
			console.log("sings MI!");
			notes[2].play();
			break;
		case "fa":
			console.log("sings FA!");
			notes[3].play();
			break;
		case "sol":
			console.log("sings SOL!");
			notes[4].play();
			break;
		case "la":
			console.log("sings LA!");
			notes[5].play();
			break;
		case "si":
			console.log("sings SI!");
			notes[6].play();
			break;
	}
}
