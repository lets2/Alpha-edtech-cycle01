const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const cookieParser = require("cookie-parser");

const router = require("./src/router.js");

const PORT = process.env.PORT || 80;
const HOSTNAME = process.env.HOST || "localhost";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(router);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
