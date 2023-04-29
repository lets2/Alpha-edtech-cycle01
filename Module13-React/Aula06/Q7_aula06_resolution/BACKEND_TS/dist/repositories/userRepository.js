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
const postgres_1 = __importDefault(require("../database/postgres"));
class UserRepository {
    constructor() {
        this.db = new postgres_1.default();
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryText = `SELECT id,name,email FROM accounts;`;
                const getUsers = yield this.db.pool.query(queryText);
                const res = {
                    status: 200,
                    data: getUsers.rows,
                };
                return res;
            }
            catch (err) {
                const res = { status: 500, errors: err };
                return res;
            }
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO accounts (id,name,email,password) VALUES ($1,$2,$3,$4) RETURNING id,name,email;`;
                const values = [
                    user.id,
                    user.name,
                    user.email,
                    user.password,
                ];
                const userData = yield this.db.pool.query(query, values);
                const res = {
                    status: 201,
                    data: userData.rows,
                };
                return res;
            }
            catch (err) {
                const res = { status: 500, errors: err };
                return res;
            }
        });
    }
    getCredentials(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT id,email,password FROM accounts WHERE email = $1;`;
                const values = [loginData.email];
                const userData = yield this.db.pool.query(query, values);
                const res = {
                    status: 200,
                    data: userData.rows,
                };
                return res;
            }
            catch (err) {
                const res = { status: 500, errors: err };
                return res;
            }
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `UPDATE accounts SET name = $2, email = $3, password = $4, updated_at = NOW() WHERE id = $1 RETURNING id,name,email;`;
                const values = [
                    user.id,
                    user.name,
                    user.email,
                    user.password,
                ];
                const userData = yield this.db.pool.query(query, values);
                const res = {
                    status: 200,
                    data: userData.rows,
                };
                return res;
            }
            catch (err) {
                const res = { status: 500, errors: err };
                return res;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `DELETE FROM accounts WHERE id = $1 RETURNING id,name,email;`;
                const values = [id];
                const userData = yield this.db.pool.query(query, values);
                if (userData.rowCount === 0) {
                    throw "[not found] There is no user with the given id";
                }
                const res = {
                    status: 200,
                    data: userData.rows,
                };
                return res;
            }
            catch (err) {
                const res = { status: 500, errors: err };
                return res;
            }
        });
    }
}
exports.default = UserRepository;
