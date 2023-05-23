const express = require("express");
const { config } = require("dotenv");
config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
