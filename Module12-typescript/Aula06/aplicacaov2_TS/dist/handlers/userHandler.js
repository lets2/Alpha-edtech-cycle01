"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userValidates_1 = require("../helpers/userValidates");
const user_1 = require("../models/user");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
class UserHandler {
    constructor() {
        this.repository = new userRepository_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const validate = new userValidates_1.UserValidate(name, email, password);
            if (validate.fail) {
                return res.status(400).json({ message: validate.message });
            }
            const user = new user_1.User({ name, email, password });
            const createUser = yield this.repository.createUser(user);
            if (createUser.status !== 201) {
                return res
                    .status(createUser.status)
                    .json({ errors: createUser.errors });
            }
            //const { id, name, email }: User = user;
            /*res.cookie("userId",user.id,{
                maxAge:90000,
                httpOnly:true
            })*/
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
            });
        });
    }
    //login
    login(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const validate = new userValidates_1.LoginValidate(email, password);
            if (validate.fail) {
                return res.status(400).json({ message: validate.message });
            }
            const loginData = new user_1.Login({ email, password });
            const credentials = yield this.repository.getCredentials(loginData);
            if (credentials.status !== 200) {
                return res
                    .status(credentials.status)
                    .json({ errors: credentials.errors });
            }
            if (credentials.data &&
                ((_a = credentials.data[0]) === null || _a === void 0 ? void 0 : _a.password) !== loginData.password) {
                //
                return res
                    .status(401)
                    .json({ errors: "[Unauthorized]: Password is wrong" });
            }
            if (credentials.data) {
                res.cookie("sessionID", (_b = credentials.data[0]) === null || _b === void 0 ? void 0 : _b.id, {
                    maxAge: 300000,
                    httpOnly: true,
                });
                res.status(200).json({
                    id: (_c = credentials.data[0]) === null || _c === void 0 ? void 0 : _c.id,
                });
            }
        });
    }
    //logout
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.cookies.sessionID) {
                res.clearCookie("sessionID");
                res.status(200).json({
                    message: "[logout] Cookie removido e logout efetuado",
                });
                return; //If dont use return, the function  will continue
            }
            else {
                res.status(404).json({
                    errors: "[Not Found] Não há cookie para remover, você não está logado",
                });
                return; //If dont use return, the function  will continue
            }
        });
    }
    //faz update, usuario precisa estar logado (req.cookies.sessionID)
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const validate = new userValidates_1.UserValidate(name, email, password);
            if (validate.fail) {
                return res.status(400).json({ message: validate.message });
            }
            if (!req.cookies.sessionID) {
                return res
                    .status(403)
                    .json({ errors: "[Forbidden] Não está logado!" });
            }
            const userId = req.cookies.sessionID;
            //instancia a classe User
            const userUp = new user_1.User({ name, email, password });
            userUp.id = userId; //A classe acima gera um ID, como quero manter o id do login
            //fiz essa atribuição, na classe tem um metodo setter para id;
            const userResponse = yield this.repository.updateUser(userUp);
            if (userResponse.status !== 200) {
                return res
                    .status(userResponse.status)
                    .json({ errors: userResponse.errors });
            }
            res.status(200).json({
                id: userUp.id,
                name: userUp.name,
                email: userUp.email,
            });
        });
    }
    //Delete user
    delete(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            //const { name, email, password }: IUser = req.body;
            const id = req.params.id;
            if (!id) {
                return res
                    .status(400)
                    .json({ message: "[bad request] Não foi informado id" });
            }
            const userResponse = yield this.repository.deleteUser(id);
            if (userResponse.status !== 200) {
                return res
                    .status(userResponse.status)
                    .json({ errors: userResponse.errors });
            }
            if (userResponse.data) {
                res.status(200).json({
                    id: (_a = userResponse.data[0]) === null || _a === void 0 ? void 0 : _a.id,
                    name: (_b = userResponse.data[0]) === null || _b === void 0 ? void 0 : _b.name,
                    email: (_c = userResponse.data[0]) === null || _c === void 0 ? void 0 : _c.email,
                });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.repository.getAllUsers();
            if (users.status !== 200)
                return res.status(users.status).json({ errors: users.errors });
            res.status(200).json(users.data);
        });
    }
}
exports.default = UserHandler;
