"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidate = exports.UserValidate = void 0;
class Validate {
    constructor() {
        this.fail = false;
        this.message = "[validate]: validates OK";
    }
    testData(_data, _message, _regex) {
        if (!_regex.test(_data)) {
            this.message = _message;
            this.fail = true;
        }
    }
}
class UserValidate extends Validate {
    constructor(name, email, password) {
        super();
        this.validateName(name);
        this.validateEmail(email);
        this.validatePassword(password);
    }
    validateName(name) {
        const regex = /^[a-zA-Zà-úÀ-Ú ]+$/;
        if (!this.fail)
            this.testData(name, "[name]: the name is invalid", regex);
    }
    validateEmail(email) {
        const regex = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        if (!this.fail)
            this.testData(email, "[e-mail]: the e-mail is invalid", regex);
    }
    validatePassword(password) {
        const regex = /^\w{1,}$/gim;
        if (!this.fail)
            this.testData(password, "[password]: the password is invalid", regex);
    }
}
exports.UserValidate = UserValidate;
class LoginValidate extends Validate {
    constructor(email, password) {
        super();
        this.validateEmail(email);
        this.validatePassword(password);
    }
    validateEmail(email) {
        const regex = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        if (!this.fail)
            this.testData(email, "[e-mail]: the e-mail is invalid", regex);
    }
    validatePassword(password) {
        const regex = /^\w{1,}$/gim;
        if (!this.fail)
            this.testData(password, "[password]: the password is invalid", regex);
    }
}
exports.LoginValidate = LoginValidate;
