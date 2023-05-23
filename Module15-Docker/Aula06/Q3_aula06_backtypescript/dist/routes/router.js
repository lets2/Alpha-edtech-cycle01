"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userHandler_1 = __importDefault(require("../handlers/userHandler"));
const router = (0, express_1.Router)();
exports.router = router;
const user = new userHandler_1.default();
//get all users
router.get("/accounts", user.get.bind(user));
//create new user
router.post("/accounts", user.create.bind(user));
//login
router.post("/accounts/login", user.login.bind(user));
//logout
router.post("/accounts/logout", user.logout.bind(user));
//update user
router.patch("/accounts", user.update.bind(user));
//delete user by id
router.delete("/accounts/:id", user.delete.bind(user));
