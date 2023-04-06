class Validator {
    data:number | string | boolean | null | undefined | void ;
    constructor(data:any){
        this.data = data;
    }
}

class StringValidator extends Validator{
    constructor(data:any){
        if(typeof data === "string"){
            super(data);
        }
        else{
            throw new Error("O tipo está errado, deveria ser string");
        }
    }
}

class NumberValidator extends Validator{
    constructor(data:any){
        if(typeof data === "number"){
            super(data);
        }
        else{
            throw new Error("O tipo está errado, deveria ser number");
        }
    }
} 

class BooleanValidator extends Validator{
    constructor(data:any){
        if(typeof data === "boolean"){
            super(data);
        }
        else{
            throw new Error("O tipo está errado, deveria ser boolean");
        }
    }
}

const strObj = new StringValidator("Teste");
console.log(`No objeto da classe StringValidator, o valor é: ${strObj.data}`);

//const numObj = new NumberValidator("Teste");
const numObj = new NumberValidator(55);
console.log(`No objeto da classe NumberValidator, o valor é: ${numObj.data}`);

//const booleanObj = new BooleanValidator("Teste");
const booleanObj = new BooleanValidator(true);
console.log(`No objeto da classe BooleanValidator, o valor é: ${booleanObj.data}`);


const message = document.querySelector("#message");

if(message){
    message.innerHTML="";
    message.innerHTML = `No objeto da classe StringValidator, o atributo data tem o valor: ${strObj.data}<br>`;
    message.innerHTML += `No objeto da classe NumberValidator, o atributo data tem o valor: ${numObj.data}<br>`;
    message.innerHTML += `No objeto da classe BooleanValidator, o atributo data tem o valor: ${booleanObj.data}<br>`;
    
}