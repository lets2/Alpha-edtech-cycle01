var _a, _b, _c;
class Validator {
    constructor(data) {
        this.data = data;
    }
}
class StringValidator extends Validator {
    constructor(data) {
        if (typeof data === "string") {
            super(data);
        }
        else {
            throw new Error("O tipo está errado, deveria ser string");
        }
    }
}
class NumberValidator extends Validator {
    constructor(data) {
        if (typeof data === "number") {
            super(data);
        }
        else {
            throw new Error("O tipo está errado, deveria ser number");
        }
    }
}
class BooleanValidator extends Validator {
    constructor(data) {
        if (typeof data === "boolean") {
            super(data);
        }
        else {
            throw new Error("O tipo está errado, deveria ser boolean");
        }
    }
}
// Update e add Classes about "typeScript - Aula 04"
class RegexValidator extends StringValidator {
    //regex: RegExp = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
    constructor(data) {
        super(data);
        if (!this.regex.test(data)) {
            console.log("OLHA O REGEX:", this.regex);
            throw new Error("O input inserido não é válido");
        }
    }
    get regex() {
        return new RegExp("");
    }
}
class EmailValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
    }
}
class PasswordValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^\w{1,}$/gim;
    }
}
class NameValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^([a-z]+ ?)+$/gim; // /^([a-z]{1,} )([ ]{1}[a-z]{1,} ){0,}$/gim;
    }
}
class EmailInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement("input");
        input.type = "text";
        input.onchange = (event) => {
            try {
                new EmailValidator(input.value);
            }
            catch (err) {
                console.log("class EmailInput - catch this error:", err.message);
                input.value = "";
            }
        };
        input.setAttribute("id", "IDEmailInput");
        shadow.appendChild(input);
    }
}
customElements.define("email-input", EmailInput);
//
class PasswordInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement("input");
        input.type = "text"; //change this to = "password"
        input.onchange = (event) => {
            try {
                new PasswordValidator(input.value);
            }
            catch (err) {
                console.log("class PasswordInput - catch this error:", err.message);
                input.value = "";
            }
        };
        input.setAttribute("id", "IDPasswordInput");
        shadow.appendChild(input);
    }
}
customElements.define("password-input", PasswordInput);
//
class NameInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement("input");
        input.type = "text"; //
        input.onchange = (event) => {
            try {
                new NameValidator(input.value);
            }
            catch (err) {
                console.log("class NameInput - catch this error:", err.message);
                input.value = "";
            }
        };
        input.setAttribute("id", "IDNameInput");
        shadow.appendChild(input);
    }
}
customElements.define("name-input", NameInput);
//
let testList = ["Teste", 55, true]; // all okay
//let testList: string[] = ["Teste", "Linha", "Sol"]; // it generates a error
console.log("TypeScript - Aula04");
try {
    const strObj = new StringValidator(testList[0]);
    console.log(`No objeto da classe StringValidator, o valor é: ${strObj.data}`);
    const numObj = new NumberValidator(testList[1]);
    console.log(`No objeto da classe NumberValidator, o valor é: ${numObj.data}`);
    const booleanObj = new BooleanValidator(testList[2]);
    console.log(`No objeto da classe BooleanValidator, o valor é: ${booleanObj.data}`);
}
catch (error) {
    console.log("Catch this error at: ", error.message);
}
const validatorButton = document.querySelector("#email-validator-button");
const emailInput = document.querySelector("email-input");
if (validatorButton && emailInput) {
    validatorButton.addEventListener("click", (event) => {
        try {
            const shadow = emailInput.shadowRoot;
            if (shadow) {
                const input = shadow.querySelector("input");
                if (input) {
                    const value = input.value;
                    console.log(value);
                    const validator = new EmailValidator(value);
                    console.log("O email inserido é válido");
                }
            }
        }
        catch (error) {
            console.log("Catch this error: ", error.message);
        }
    });
}
// typescript - Aula04 - Add events to buttons (Register, login and update)
const registerButton = document.querySelector("#register-button");
const loginButton = document.querySelector("#login-button");
const updateButton = document.querySelector("#update-button");
//inputs
const shadowNameInput = (_a = document.querySelector("name-input")) === null || _a === void 0 ? void 0 : _a.shadowRoot;
const nameInputElement = shadowNameInput === null || shadowNameInput === void 0 ? void 0 : shadowNameInput.querySelector("#IDNameInput");
const shadowEmailInput = (_b = document.querySelector("email-input")) === null || _b === void 0 ? void 0 : _b.shadowRoot;
const emailInputElement = shadowEmailInput === null || shadowEmailInput === void 0 ? void 0 : shadowEmailInput.querySelector("#IDEmailInput");
const shadowPasswordInput = (_c = document.querySelector("password-input")) === null || _c === void 0 ? void 0 : _c.shadowRoot;
const passwordInputElement = shadowPasswordInput === null || shadowPasswordInput === void 0 ? void 0 : shadowPasswordInput.querySelector("#IDPasswordInput");
import { register, login, update } from "./service.js";
function addOnClickFunction(btn, clickFunction, option) {
    if (btn) {
        btn.addEventListener("click", (event) => {
            try {
                const user = getInputs(option);
                clickFunction(user);
            }
            catch (err) {
                console.log("ERRO DENTRO DO GET INPUTS:", err.message);
                alert(`erro:${err.message}`);
            }
        });
    }
}
addOnClickFunction(registerButton, register, "register");
addOnClickFunction(loginButton, login, "login");
addOnClickFunction(updateButton, update, "update");
function getInputs(_option) {
    if (nameInputElement && emailInputElement && passwordInputElement) {
        //verificação se inputs são válidos
        new NameValidator(nameInputElement.value);
        new EmailValidator(emailInputElement.value);
        new PasswordValidator(passwordInputElement.value);
        const user = {
            name: nameInputElement.value,
            email: emailInputElement.value,
            password: passwordInputElement.value,
        };
        switch (_option) {
            case "register":
                return user;
            case "login":
                return {
                    email: emailInputElement.value,
                    password: passwordInputElement.value,
                };
            case "update":
                return user;
        }
    }
    throw new Error("Algum campo está nulo!");
}
