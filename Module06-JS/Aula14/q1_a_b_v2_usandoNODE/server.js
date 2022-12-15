const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const dir = path.join(__dirname, "/public");

app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/public/brigadeiros", (req, res) => {
	res.sendFile(path.join(dir, "index.html"));
});

app.get("/public/cupcakes", (req, res) => {
	res.sendFile(path.join(dir, "index.html"));
});

app.get("/public/doces", (req, res) => {
	res.sendFile(path.join(dir, "index.html"));
});

app.listen(8080, () => {
	console.log("Servidor está up na porta 8080!!");
});
