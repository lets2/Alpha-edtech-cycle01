"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app_1 = __importDefault(require("./app"));
const HOSTNAME = process.env.HOST || "localhost";
const PORT = Number(process.env.PORT) || 80;
new app_1.default().server.listen(PORT, HOSTNAME, () => console.log(`Server is running on https://${HOSTNAME}:${PORT}`));
