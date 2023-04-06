var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Validator = /** @class */ (function () {
    function Validator(data) {
        this.data = data;
    }
    return Validator;
}());
var StringValidator = /** @class */ (function (_super) {
    __extends(StringValidator, _super);
    function StringValidator(data) {
        var _this = this;
        if (typeof data === "string") {
            _this = _super.call(this, data) || this;
        }
        else {
            throw new Error("O tipo está errado, deveria ser string");
        }
        return _this;
    }
    return StringValidator;
}(Validator));
var NumberValidator = /** @class */ (function (_super) {
    __extends(NumberValidator, _super);
    function NumberValidator(data) {
        var _this = this;
        if (typeof data === "number") {
            _this = _super.call(this, data) || this;
        }
        else {
            throw new Error("O tipo está errado, deveria ser number");
        }
        return _this;
    }
    return NumberValidator;
}(Validator));
var BooleanValidator = /** @class */ (function (_super) {
    __extends(BooleanValidator, _super);
    function BooleanValidator(data) {
        var _this = this;
        if (typeof data === "boolean") {
            _this = _super.call(this, data) || this;
        }
        else {
            throw new Error("O tipo está errado, deveria ser boolean");
        }
        return _this;
    }
    return BooleanValidator;
}(Validator));
var strObj = new StringValidator("Teste");
console.log("No objeto da classe StringValidator, o valor \u00E9: ".concat(strObj.data));
//const numObj = new NumberValidator("Teste");
var numObj = new NumberValidator(55);
console.log("No objeto da classe NumberValidator, o valor \u00E9: ".concat(numObj.data));
//const booleanObj = new BooleanValidator("Teste");
var booleanObj = new BooleanValidator(true);
console.log("No objeto da classe BooleanValidator, o valor \u00E9: ".concat(booleanObj.data));
var message = document.querySelector("#message");
if (message) {
    message.innerHTML = "";
    message.innerHTML = "No objeto da classe StringValidator, o atributo data tem o valor: ".concat(strObj.data, "<br>");
    message.innerHTML += "No objeto da classe NumberValidator, o atributo data tem o valor: ".concat(numObj.data, "<br>");
    message.innerHTML += "No objeto da classe BooleanValidator, o atributo data tem o valor: ".concat(booleanObj.data, "<br>");
}
