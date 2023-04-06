const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accounts.js");
const authenticate = require("../middlewares/authentication.js");

////////router.post("/accounts/login", accountsController.login);
//req.body
//  {
//      email,
//      password //unencrypted password
//  }
//router.get("/accounts", authenticate, accountsController.information);
////////router.post("/logout", usersController.logout);

//CREATING ROUTES:
router.get("/accounts/", accountsController.list);
// res = [{id,name,email},{id,name,email},...]

router.post("/accounts/", accountsController.register);
//req.body = {name,email,password}
// res = {id,name,email}

router.patch("/accounts/", accountsController.update);
//req.body = {name,email,password}
// res = {id,name,email}

router.post("/accounts/login", accountsController.login);
//req.body = {email,password}
// res = {id}
// Cookie: token = sessionID

router.post("/accounts/logout", accountsController.logout);

module.exports = router;
