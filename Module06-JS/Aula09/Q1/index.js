const buttonAddition = document.querySelector("#button-addition");
const buttonSubtraction = document.querySelector("#button-subtraction");
const buttonMultiplication = document.querySelector("#button-multiplication");
const buttonDivision = document.querySelector("#button-division");
const buttonPotentiation = document.querySelector("#button-potentiation");

const inputNumber1 = document.querySelector("#number1");
const inputNumber2 = document.querySelector("#number2");
const outputResult = document.querySelector("#result");
const messageError = document.querySelector("#message");

buttonAddition.addEventListener("click", () => {
    let result;
    try {
        if (AreNumbers()) {
            const number1 = parseFloat(inputNumber1.value);
            const number2 = parseFloat(inputNumber2.value);

            result = calculateAddition(number1, number2);
            outputResult.value = `${result}`;
        } else {
            throw "[Error] Both input should be numbers! Please retype!";
        }
    } catch (error) {
        messageError.innerHTML = `${error}`;
    }
});

buttonSubtraction.addEventListener("click", () => {
    let result;
    try {
        if (AreNumbers()) {
            const number1 = parseFloat(inputNumber1.value);
            const number2 = parseFloat(inputNumber2.value);

            result = calculateSubtraction(number1, number2);
            outputResult.value = `${result}`;
        } else {
            throw "[Error] Both input should be numbers! Please retype!";
        }
    } catch (error) {
        messageError.innerHTML = `${error}`;
    }
});

buttonMultiplication.addEventListener("click", () => {
    let result;
    try {
        if (AreNumbers()) {
            const number1 = parseFloat(inputNumber1.value);
            const number2 = parseFloat(inputNumber2.value);

            result = calculateMultiplication(number1, number2);
            outputResult.value = `${result}`;
        } else {
            throw "[Error] Both input should be numbers! Please retype!";
        }
    } catch (error) {
        messageError.innerHTML = `${error}`;
    }
});

buttonDivision.addEventListener("click", () => {
    let result;
    try {
        if (AreNumbers() && inputNumber2.value != 0) {
            const number1 = parseFloat(inputNumber1.value);
            const number2 = parseFloat(inputNumber2.value);

            result = calculateDivision(number1, number2);
            outputResult.value = `${result}`;
        } else {
            throw "[Error] Both input should be numbers and 2nd number need to be different of zero! Please retype!";
        }
    } catch (error) {
        messageError.innerHTML = `${error}`;
    }
});

buttonPotentiation.addEventListener("click", () => {
    let result;
    try {
        if (AreNumbers()) {
            const number1 = parseFloat(inputNumber1.value);
            const number2 = parseFloat(inputNumber2.value);

            result = calculatePotentiation(number1, number2);
            outputResult.value = `${result}`;
        } else {
            throw "[Error] Both input should be numbers! Please retype!";
        }
    } catch (error) {
        messageError.innerHTML = `${error}`;
    }
});

function AreNumbers() {
    messageError.innerHTML = "";
    if (
        isNaN(inputNumber1.value) ||
        isNaN(inputNumber2.value) ||
        inputNumber1.value == "" ||
        inputNumber2.value == ""
    )
        return false;
    else return true;
}

function calculateAddition(number1, number2) {
    console.log("Result", number1, "+", number2, "=", number1 + number2);
    return number1 + number2;
}

function calculateSubtraction(number1, number2) {
    console.log("Result", number1, "-", number2, "=", number1 - number2);
    return number1 - number2;
}

function calculateMultiplication(number1, number2) {
    console.log("Result", number1, "*", number2, "=", number1 * number2);
    return number1 * number2;
}

function calculateDivision(number1, number2) {
    console.log("Result", number1, "/", number2, "=", number1 / number2);
    return number1 / number2;
}

function calculatePotentiation(number1, number2) {
    console.log("Result", number1, "^", number2, "=", number1 ** number2);
    return number1 ** number2;
}
