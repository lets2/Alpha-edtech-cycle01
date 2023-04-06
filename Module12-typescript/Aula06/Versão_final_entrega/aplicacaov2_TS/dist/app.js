"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = require("./routes/router");
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.middleware();
        this.router();
    }
    middleware() {
        this.server.use((0, cors_1.default)());
        this.server.use(express_1.default.json());
        this.server.use((0, cookie_parser_1.default)());
    }
    router() {
        this.server.use(router_1.router);
    }
}
exports.default = App;
