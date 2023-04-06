"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app = new app_1.default();
app.server.get("/", (req, res) => {
    res.status(200).send("Hello, Hopper!");
});
app.server.listen("8000", () => console.log("Server run on localhost:8000"));
