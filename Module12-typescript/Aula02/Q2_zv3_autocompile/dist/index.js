"use strict";
class Validator {
    constructor(data) {
        this.data = data;
    }
}
class StringValidator extends Validator {
    constructor(data) {
        if (typeof data === "string") {
            super(data);
        } else {
            throw new Error("O tipo está errado, deveria ser string");
        }
    }
}
class NumberValidator extends Validator {
    constructor(data) {
        if (typeof data === "number") {
            super(data);
        } else {
            throw new Error("O tipo está errado, deveria ser number");
        }
    }
}
class BooleanValidator extends Validator {
    constructor(data) {
        if (typeof data === "boolean") {
            super(data);
        } else {
            throw new Error("O tipo está errado, deveria ser boolean");
        }
    }
}
let testList = ["Teste", 55, true]; // all okay
//let testList: string[] = ["Teste","Linha","Sol"] // it generates a error
try {
    const strObj = new StringValidator(testList[0]);
    console.log(
        `No objeto da classe StringValidator, o valor é: ${strObj.data}`,
    );
    const numObj = new NumberValidator(testList[1]);
    console.log(
        `No objeto da classe NumberValidator, o valor é: ${numObj.data}`,
    );
    const booleanObj = new BooleanValidator(testList[2]);
    console.log(
        `No objeto da classe BooleanValidator, o valor é: ${booleanObj.data}`,
    );
} catch (error) {
    console.log("Catch this error: ", error.message);
}
