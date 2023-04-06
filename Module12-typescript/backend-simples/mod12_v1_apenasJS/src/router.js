const express = require("express");
const router = express.Router();
const usersRoutes = require("./routes/accounts.js");

router.use(usersRoutes);

module.exports = router;
