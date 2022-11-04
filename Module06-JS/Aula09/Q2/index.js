const MAN_LIFE_EXPECTANCY = 73.1 * 365.25; //[days]
const WOMAN_LIFE_EXPECTANCY = 80.1 * 365.25; //[days]

let person = {
    birthDate: null,
    gender: "",
    daysToDeath: function () {
        const dateToday = new Date();
        const daysTotal =
            this.gender == "Male" ? MAN_LIFE_EXPECTANCY : WOMAN_LIFE_EXPECTANCY;
        const timeToDeath = Math.floor(
            daysTotal -
                (dateToday.getTime() - this.birthDate.getTime()) /
                    (1000 * 60 * 60 * 24)
        );
        return timeToDeath;
    },
};

const inputBirthDay = document.querySelector("#birthDay");
const inputBirthMonth = document.querySelector("#birthMonth");
const inputBirthYear = document.querySelector("#birthYear");
const optionGender = document.querySelector("#gender");
const buttonCalculate = document.querySelector("#calculate");

const outputDaysToDeath = document.querySelector("#daysLeft");
const messageError = document.querySelector("#message");
const containerData = document.querySelector("#data-colected");

buttonCalculate.addEventListener("click", () => {
    if (isDatasOkay()) {
        storeBirthDate();
        storeGender();
        // messageSuccess();
        showTimeToDeath();
    }
});

function showTimeToDeath() {
    outputDaysToDeath.value = `${person.daysToDeath()} days`;
    console.log("Time to death:", person.daysToDeath(), " days left!");
}

function storeBirthDate() {
    const date = new Date(
        inputBirthYear.value,
        inputBirthMonth.value - 1,
        inputBirthDay.value
    );
    person.birthDate = date;
}

function storeGender() {
    person.gender = optionGender.value;
}

function isDatasOkay() {
    messageError.innerHTML = "";
    containerData.innerHTML = "";
    if (isDateInvalid() || isGenderInvalid()) {
        messageError.classList.add("incorrect");
        messageError.classList.remove("correct");
        return false;
    } else return true;
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
    console.log("Stringfy:\n", JSON.stringify(person));
    console.log("Object with data:");
    console.log(person);
}

function writeObjectOnPage() {
    containerData.innerHTML = "";

    containerData.innerHTML = `
	<p><span>Birth date</span> ${formatDate(person["birthDate"])}</p>
	<p><span>Gender</span> ${person["gender"]}</p>
	<br>
	<p><span>Object as string form:</span></p>
	<p>${JSON.stringify(person)}</p>
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
