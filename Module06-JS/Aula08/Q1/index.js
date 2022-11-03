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
const containerData = document.querySelector("#data-colected");
buttonSend.addEventListener("click", () => {
    if (isDatasOkay()) {
        storeName();
        storeBirthDate();
        storeWeight();
        storeHeight();
        storeGender();
        messageSuccess();
    }
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
    containerData.innerHTML = "";
    if (
        isNameInvalid() ||
        isDateInvalid() ||
        isWeightInvalid() ||
        isHeightInvalid() ||
        isGenderInvalid()
    ) {
        messageError.classList.add("incorrect");
        messageError.classList.remove("correct");
        return false;
    } else return true;
}

/*
function isSomeDataEmpty() {
    if (
        isNameInvalid() ||
        inputBirthDay.value == "" ||
        inputBirthMonth.value == "" ||
        inputBirthYear.value == "" ||
        inputWeight.value == "" ||
        inputHeight.value == "" ||
        optionGender.value == ""
    ) {
        // messageError.innerHTML +=
        //    "[error] Please, fill all fields before to send!";
        return true;
    } else return false;
}


*/

function isNameInvalid() {
    try {
        if (inputName.value.length < 5)
            throw "Field “name” is invalid! The name cannot be shorter than 5 characters";
        else return false;
    } catch (error) {
        console.log(error);
        messageError.innerHTML += `${error}`;
        return true;
    }
}

function isDateInvalid() {
    try {
        if (
            inputBirthDay.value == "" ||
            inputBirthMonth.value == "" ||
            inputBirthYear.value == "" ||
            isDayInvalid() ||
            isMonthInvalid() ||
            isYearInvalid()
        ) {
            throw "[error] Field “birthDate” is invalid! Please check!";
        } else return false;
    } catch (error) {
        console.log(error);
        messageError.innerHTML += `${error}`;
        return true;
    }

    /*
    if (isDayInvalid() || isMonthInvalid() || isYearInvalid()) {
        messageError.innerHTML +=
            "[error] Field “birthDate” is invalid! Please check!";
        return true;
    } else return false;*/
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
    try {
        if (isNaN(inputWeight.value) || inputWeight.value == "")
            throw "[error] Field “weight” is invalid! Please insert a number!";
        else return false;
    } catch (error) {
        console.log(error);
        messageError.innerHTML += `${error}`;
        return true;
    }
}
function isHeightInvalid() {
    try {
        if (isNaN(inputHeight.value) || inputHeight.value == "")
            throw "[error] Field “height” is invalid! Please insert a number!";
        else return false;
    } catch (error) {
        console.log(error);
        messageError.innerHTML += `${error}`;
        return true;
    }
}

function isGenderInvalid() {
    try {
        if (optionGender.value == "Select gender")
            throw "[error] Field “gender” is invalid! Please choose a option!";
        else return false;
    } catch (error) {
        console.log(error);
        messageError.innerHTML += `${error}`;
        return true;
    }
}

function messageSuccess() {
    messageError.innerHTML = "Your form was sent successfull!";
    messageError.classList.add("correct");
    messageError.classList.remove("incorrect");

    writeObjectOnPage();
    console.log("Stringfy:\n", JSON.stringify(personalData));
    console.log("Object with data:");
    console.log(personalData);
}

function writeObjectOnPage() {
    containerData.innerHTML = "";

    containerData.innerHTML = `
	<p><span>Name</span> ${personalData["firstName"]}</p>
	<p><span>Birth date</span> ${formatDate(personalData["birthDate"])}</p>
	<p><span>Weight (kg)</span> ${personalData["weight"]}</p>
	<p><span>Height (cm)</span> ${personalData["height"]}</p>
	<p><span>Gender</span> ${personalData["gender"]}</p>
	<br>
	<p><span>Object as string form:</span></p>
	<p>${JSON.stringify(personalData)}</p>
	`;
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join("/");
}

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}
