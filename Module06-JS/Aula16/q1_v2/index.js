const selectCoins = document.querySelector("#coins");
const inputInitialDate = document.querySelector("#initialDate");
const inputFinalDate = document.querySelector("#finalDate");
const searchButton = document.querySelector("#searchButton");
const tableBody = document.querySelector("#tableBody");

const message = document.querySelector("#message");
let arrayDataAPI = [];
let listDates = [];
let initialDate, finalDate;
let typeOfCoin;
searchButton.addEventListener("click", () => {
	try {
		verifyInputs();
		searchButton.style.cursor = "wait";
		listDates = getDatesOnRange(dateInitial, dateFinal);
		arrayDataAPI = [];
		message.innerHTML = "";
		tableBody.innerHTML = "";
		typeOfCoin = selectCoins.value;
		requestDataFromAPI(listDates);
	} catch (error) {
		message.innerHTML = error;
	}
});

function verifyInputs() {
	if (inputInitialDate.value === "" || inputFinalDate.value === "") {
		throw "[error] Date empty! Please reptype!";
	}
	dateInitial = setDateDefault(inputInitialDate.value);
	dateFinal = setDateDefault(inputFinalDate.value);
	if (dateFinal.getTime() < dateInitial.getTime()) {
		throw "[error] Final should be bigger than initial!Please retype!";
	}
}

function setDateDefault(inputDate) {
	let date = new Date(inputDate);
	date.setDate(date.getDate() + 1);
	date.setHours(date.getHours() - 3);
	return date;
}

function getDatesOnRange(initial, final) {
	const date = new Date(initial.getTime());
	let dates = [];
	//create date
	while (date <= final) {
		dates.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	let stringDates = [];
	//change format
	for (i = 0; i < dates.length; i++) {
		stringDates.push(dates[i].toISOString().slice(0, 10).replace(/-/g, ""));
	}
	return stringDates;
}

function requestDataFromAPI(listDates) {
	for (let i = 0; i < listDates.length; i++) {
		fetch(
			`https://economia.awesomeapi.com.br/json/daily/${typeOfCoin}/?start_date=${listDates[i]}&end_date=${listDates[i]}`
		)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
				// show error message
				else {
					message.innerHTML =
						"[erro] Have a problem to get data from  Currency API!";
				}
			})
			.then((json) => {
				if (json[0] !== undefined) {
					console.log(json[0]);
					const dateAndTimeString = convertToDateTimeStandard(
						json[0].create_date
					);
					const obj = {
						dateFull: dateAndTimeString,
						buy: json[0].bid,
						sell: json[0].ask,
						max: json[0].high,
						min: json[0].low,
						timeStamp: Number(json[0].timestamp),
					};
					arrayDataAPI.push(obj);
					return obj;
				}
			})
			.then((obj) => {
				searchButton.style.cursor = "pointer";
				writeOnTable(obj);
			});
	}
}

function convertToDateTimeStandard(stringfull) {
	return (
		stringfull.slice(8, 10) +
		"/" +
		stringfull.slice(5, 7) +
		"/" +
		stringfull.slice(0, 4) +
		" " +
		stringfull.slice(10, 19)
	);
}

function writeOnTable(element) {
	const trTag = document.createElement("tr");
	trTag.innerHTML = `<td>${element.dateFull}</td>
		<td>${element.buy}</td>
		<td>${element.sell}</td>
		<td>${element.min}</td>
		<td>${element.max}</td>`;
	tableBody.appendChild(trTag);
}

//sort table
const thead = document.querySelector("thead");
thead.addEventListener("click", (event) => {
	console.log("event", event.target);
	const title = event.target.textContent;
	switch (title) {
		case "DATE":
			sortByDate();
			break;
		case "PURCHASE":
			sortByPurchase();
			break;
		case "SALE":
			sortByPurchase();
			break;
		case "MIN":
			sortByMin();
			break;
		case "MAX":
			sortByMax();
			break;

		default:
			console.log("NAO ESTA PRONTO");
	}

	tableBody.innerHTML = "";
	arrayDataAPI.forEach((element) => {
		writeOnTable(element);
	});
});

function sortByDate() {
	arrayDataAPI.sort((obj1, obj2) => {
		return obj1.timeStamp - obj2.timeStamp;
	});
}

function sortByPurchase() {
	arrayDataAPI.sort((obj1, obj2) => {
		return Number(obj1.buy) - Number(obj2.buy);
	});
}

function sortBySale() {
	arrayDataAPI.sort((obj1, obj2) => {
		return Number(obj1.sell) - Number(obj2.sell);
	});
}

function sortByMin() {
	arrayDataAPI.sort((obj1, obj2) => {
		return Number(obj1.min) - Number(obj2.min);
	});
}

function sortByMax() {
	arrayDataAPI.sort((obj1, obj2) => {
		return Number(obj2.max) - Number(obj1.max); //this way max value is the first one
	});
}
