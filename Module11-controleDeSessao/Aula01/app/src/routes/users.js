const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");
const authenticate = require("../middlewares/authentication.js");
router.post("/login", usersController.login);
//req.body
//  {
//      email,
//      password //unencrypted password
//  }
router.get("/information", authenticate, usersController.information);

router.post("/logout", usersController.logout);

module.exports = router;
