import express from "express";

import {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/usuarios", getAllUsers);
router.post("/usuarios", createNewUser);
router.put("/usuarios/:id", updateUser);
router.delete("/usuarios/:id", deleteUser);

export default router;
