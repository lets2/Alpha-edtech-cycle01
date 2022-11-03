let personalData = {
	firstName: "",
	birthDate: null,
	weight: null,
	height: null,
	gender: "",
};

const inputName = document.querySelector("#firstName");
const inputBirthDay = document.querySelector("#birthDay");
const inputBirthMonth = document.querySelector("#birthMonth");
const inputBirthYear = document.querySelector("#birthYear");
const inputWeight = document.querySelector("#weight");
const inputHeight = document.querySelector("#height");
const optionGender = document.querySelector("#gender");
const buttonSend = document.querySelector("#send");
const messageError = document.querySelector("#message");

buttonSend.addEventListener("click", () => {
	if (isDatasOkay()) {
		storeName();
		storeBirthDate();
		storeWeight();
		storeHeight();
		storeGender();
		messageSuccess();
	}
	console.log(personalData);
});

function storeName() {
	personalData.firstName = inputName.value;
}

function storeBirthDate() {
	const date = new Date(
		inputBirthYear.value,
		inputBirthMonth.value - 1,
		inputBirthDay.value
	);
	personalData.birthDate = date;
}

function storeWeight() {
	personalData.weight = parseFloat(inputWeight.value);
}

function storeHeight() {
	personalData.height = parseInt(inputHeight.value, 10);
}

function storeGender() {
	personalData.gender = optionGender.value;
}

function isDatasOkay() {
	messageError.innerHTML = "";
	if (
		isSomeDataEmpty() ||
		isDateInvalid() ||
		isWeightInvalid() ||
		isHeightInvalid()
	) {
		messageError.classList.add("incorrect");
		messageError.classList.remove("correct");
		return false;
	} else return true;
}

function isSomeDataEmpty() {
	if (
		inputName.value == "" ||
		inputBirthDay.value == "" ||
		inputBirthMonth.value == "" ||
		inputBirthYear.value == "" ||
		inputWeight.value == "" ||
		inputHeight.value == "" ||
		optionGender.value == ""
	) {
		messageError.innerHTML += "[error] Please, fill all fields before to send!";
		return true;
	} else return false;
}

function isDateInvalid() {
	if (isDayInvalid() || isMonthInvalid() || isYearInvalid()) {
		messageError.innerHTML +=
			"[error] Date invalid, check day, month, and year before to send!";
		return true;
	} else return false;
}

function isDayInvalid() {
	const birthDay = parseInt(inputBirthDay.value);
	const birthMonth = parseInt(inputBirthMonth.value);
	const birthYear = parseInt(inputBirthYear.value);

	if (birthDay < 1 || birthDay > 31 || isNaN(birthDay)) {
		return true;
	} else if (
		birthDay == 31 &&
		(birthMonth !== 1 ||
			birthMonth !== 3 ||
			birthMonth !== 5 ||
			birthMonth !== 7 ||
			birthMonth !== 8 ||
			birthMonth !== 10 ||
			birthMonth !== 12)
	) {
		return true;
	} else if (
		(birthDay == 30 && birthMonth == 2) ||
		(birthDay == 29 && birthMonth == 2 && birthYear % 4 !== 0)
	) {
		return true;
	} else {
		return false;
	}
}

function isMonthInvalid() {
	const birthMonth = parseInt(inputBirthMonth.value);

	if (birthMonth < 1 || birthMonth > 12 || isNaN(birthMonth)) return true;
	else return false;
}

function isYearInvalid() {
	const birthDay = parseInt(inputBirthDay.value);
	const birthMonth = parseInt(inputBirthMonth.value);
	const birthYear = parseInt(inputBirthYear.value);
	const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
	const todayDate = new Date();

	if (
		birthYear < 0 ||
		birthYear > 2022 ||
		isNaN(birthYear) ||
		(birthYear == 2022 && birthMonth > 10) ||
		birthDate > todayDate
	)
		return true;
	else return false;
}

function isWeightInvalid() {
	if (isNaN(inputWeight.value)) {
		messageError.innerHTML += "[error] Weight invalid, check please!";
		return true;
	} else return false;
}
function isHeightInvalid() {
	if (isNaN(inputHeight.value)) {
		messageError.innerHTML += "[error] Height invalid, check please!";
		return true;
	} else return false;
}

function messageSuccess() {
	messageError.innerHTML = "Your form was sent successfull!";
	messageError.classList.add("correct");
	messageError.classList.remove("incorrect");
}
