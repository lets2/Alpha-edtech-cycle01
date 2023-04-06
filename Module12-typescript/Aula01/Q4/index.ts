class Validator {
    data:number | string | boolean | null | undefined | void ;
}

const validatorNumber = new Validator();

validatorNumber.data = 20;

console.log(`Olha o valor é: ${validatorNumber.data}`);

const message = document.querySelector("#message");

if(message){
    message.innerHTML = `No objeto da classe Validator, o atributo data tem o valor: ${validatorNumber.data}`;
}