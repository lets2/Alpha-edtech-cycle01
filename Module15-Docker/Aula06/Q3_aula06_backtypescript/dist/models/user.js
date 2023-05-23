"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _User_name, _User_email, _User_password, _User_id, _Login_email, _Login_password;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(data) {
        _User_name.set(this, void 0);
        _User_email.set(this, void 0);
        _User_password.set(this, void 0);
        _User_id.set(this, void 0);
        __classPrivateFieldSet(this, _User_name, data.name, "f");
        __classPrivateFieldSet(this, _User_email, data.email, "f");
        __classPrivateFieldSet(this, _User_password, data.password, "f");
        __classPrivateFieldSet(this, _User_id, this.createId(), "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _User_name, "f");
    }
    get email() {
        return __classPrivateFieldGet(this, _User_email, "f");
    }
    get password() {
        return __classPrivateFieldGet(this, _User_password, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _User_id, "f");
    }
    set id(_id) {
        __classPrivateFieldSet(this, _User_id, _id, "f");
    }
    createId() {
        const id = (0, uuid_1.v4)();
        return id;
    }
}
exports.User = User;
_User_name = new WeakMap(), _User_email = new WeakMap(), _User_password = new WeakMap(), _User_id = new WeakMap();
class Login {
    constructor(data) {
        _Login_email.set(this, void 0);
        _Login_password.set(this, void 0);
        __classPrivateFieldSet(this, _Login_email, data.email, "f");
        __classPrivateFieldSet(this, _Login_password, data.password, "f");
    }
    get email() {
        return __classPrivateFieldGet(this, _Login_email, "f");
    }
    get password() {
        return __classPrivateFieldGet(this, _Login_password, "f");
    }
}
exports.Login = Login;
_Login_email = new WeakMap(), _Login_password = new WeakMap();
