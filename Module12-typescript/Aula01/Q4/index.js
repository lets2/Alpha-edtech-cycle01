var Validator = /** @class */ (function () {
    function Validator() {
    }
    return Validator;
}());
var validatorNumber = new Validator();
validatorNumber.data = 20;
console.log("Olha o valor \u00E9: ".concat(validatorNumber.data));
var message = document.querySelector("#message");
if (message) {
    message.innerHTML = "No objeto da classe Validator, o atributo data tem o valor: ".concat(validatorNumber.data);
}
