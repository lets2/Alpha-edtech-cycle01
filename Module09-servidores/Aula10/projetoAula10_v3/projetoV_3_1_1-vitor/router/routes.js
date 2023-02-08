import express from "express";
import { authenticate } from "../middlewares/authentication.js";

import {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", authenticate, createNewUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
