const buttonShowPrime = document.querySelector("#showPrime");
const inputNumber = document.querySelector("#inputNumber");
const message = document.querySelector("#message");
const containerResult = document.querySelector("#result");
let listOfPrimes = [];

buttonShowPrime.addEventListener("click", () => {
	if (inputNumber.value == "" || isNaN(inputNumber.value)) {
		message.innerHTML = "Input need to be a number integer, please retype!";
	} else if (Number.isInteger(Number(inputNumber.value))) {
		const number = parseInt(inputNumber.value);
		findAllPrimes(number);
		showAllPrimes();
	} else {
		message.innerHTML = "Input need to be a number integer, please retype!";
	}
});

function findAllPrimes(numberMax) {
	listOfPrimes = [];
	for (let number = 2; number <= numberMax; number++) {
		if (isPrimeNumber(number)) {
			listOfPrimes.push(number);
		}
	}
}

function isPrimeNumber(number) {
	for (let i = 2; i <= Math.ceil(number / 2); i++) {
		if (number % i == 0) {
			return false; //is not prime
		}
	}
	return true; //is prime
}

function showAllPrimes() {
	containerResult.innerHTML = `<h2>List of all Prime numbers from 2 to ${inputNumber.value}</h2>`;
	listOfPrimes.forEach((element) => {
		containerResult.innerHTML += `${element} `;
	});
}
