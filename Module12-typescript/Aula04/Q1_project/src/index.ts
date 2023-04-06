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
        if (!this.regex.test(data))
            throw new Error("O input inserido não é válido");
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
        return /^([a-z]{1,} )([ ]{1}[a-z]{1,} ){0,}$/gim;
    }
}

class EmailInput extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement("input");
        input.type = "text";
        input.onchange = (event) => new EmailValidator(input.value);

        shadow.appendChild(input);
    }
}

//
customElements.define("email-input", EmailInput);

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
    console.log("Catch this error: ", error.message);
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
