import express from "express";
import router from "./router/routes.js";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = "8080";

app.use(cors()); //enable CORS for all request

//convert request sent to our server to json format
app.use(express.json());

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use("/", router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
