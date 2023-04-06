class Validator {
    data: number | string | boolean | null | undefined | void;
    constructor(data: any) {
        this.data = data;
    }
}

class StringValidator extends Validator {
    constructor(data: any) {
        if (typeof data === "string") {
            super(data);
        } else {
            throw new Error("O tipo está errado, deveria ser string");
        }
    }
}

class NumberValidator extends Validator {
    constructor(data: any) {
        if (typeof data === "number") {
            super(data);
        } else {
            throw new Error("O tipo está errado, deveria ser number");
        }
    }
}

class BooleanValidator extends Validator {
    constructor(data: any) {
        if (typeof data === "boolean") {
            super(data);
        } else {
            throw new Error("O tipo está errado, deveria ser boolean");
        }
    }
}
// Update e add Classes about "typeScript - Aula 04"
abstract class RegexValidator extends StringValidator {
    //regex: RegExp = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;

    constructor(data: any) {
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
    constructor(data: any) {
        super(data);
    }

    get regex() {
        return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
    }
}

class PasswordValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
    }

    get regex() {
        return /^\w{1,}$/gim;
    }
}

class NameValidator extends RegexValidator {
    constructor(data: any) {
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
            } catch (err: any) {
                console.log(
                    "class EmailInput - catch this error:",
                    err.message
                );
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
            } catch (err: any) {
                console.log(
                    "class PasswordInput - catch this error:",
                    err.message
                );
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
            } catch (err: any) {
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

let testList: Array<number | string | boolean> = ["Teste", 55, true]; // all okay
//let testList: string[] = ["Teste", "Linha", "Sol"]; // it generates a error

console.log("TypeScript - Aula04");

try {
    const strObj = new StringValidator(testList[0]);
    console.log(
        `No objeto da classe StringValidator, o valor é: ${strObj.data}`
    );

    const numObj = new NumberValidator(testList[1]);
    console.log(
        `No objeto da classe NumberValidator, o valor é: ${numObj.data}`
    );

    const booleanObj = new BooleanValidator(testList[2]);
    console.log(
        `No objeto da classe BooleanValidator, o valor é: ${booleanObj.data}`
    );
} catch (error: any) {
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
        } catch (error: any) {
            console.log("Catch this error: ", error.message);
        }
    });
}

// typescript - Aula04 - Add events to buttons (Register, login and update)

const registerButton = document.querySelector(
    "#register-button"
) as HTMLElement | null;
const loginButton = document.querySelector(
    "#login-button"
) as HTMLElement | null;
const updateButton = document.querySelector(
    "#update-button"
) as HTMLElement | null;

//inputs
const shadowNameInput = document.querySelector("name-input")?.shadowRoot;
const nameInputElement = shadowNameInput?.querySelector(
    "#IDNameInput"
) as HTMLInputElement | null;

const shadowEmailInput = document.querySelector("email-input")?.shadowRoot;
const emailInputElement = shadowEmailInput?.querySelector(
    "#IDEmailInput"
) as HTMLInputElement | null;

const shadowPasswordInput =
    document.querySelector("password-input")?.shadowRoot;
const passwordInputElement = shadowPasswordInput?.querySelector(
    "#IDPasswordInput"
) as HTMLInputElement | null;

import { IUserInput, register, login, update } from "./service.js";

function addOnClickFunction(
    btn: HTMLElement | null,
    clickFunction: (user: IUserInput | Partial<IUserInput>) => void,
    option: string
): void {
    if (btn) {
        btn.addEventListener("click", (event: MouseEvent) => {
            try {
                const user = getInputs(option);
                clickFunction(user);
            } catch (err: any) {
                console.log("ERRO DENTRO DO GET INPUTS:", err.message);
                alert(`erro:${err.message}`);
            }
        });
    }
}

addOnClickFunction(registerButton, register, "register");
addOnClickFunction(loginButton, login, "login");
addOnClickFunction(updateButton, update, "update");

function getInputs(_option: string): IUserInput | Partial<IUserInput> {
    if (nameInputElement && emailInputElement && passwordInputElement) {
        //verificação se inputs são válidos
        new NameValidator(nameInputElement.value);
        new EmailValidator(emailInputElement.value);
        new PasswordValidator(passwordInputElement.value);

        const user: IUserInput = {
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
