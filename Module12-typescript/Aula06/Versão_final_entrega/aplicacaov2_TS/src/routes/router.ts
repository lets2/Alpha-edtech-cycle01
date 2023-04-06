import { Router } from "express";
import UserHandler from "../handlers/userHandler";

const router = Router();
const user = new UserHandler();

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
export { router };
