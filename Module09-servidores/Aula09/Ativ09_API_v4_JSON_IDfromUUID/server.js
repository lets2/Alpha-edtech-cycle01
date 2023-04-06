import express from "express";
import router from "./router/routes.js";

const app = express();

const port = "8080";

//convert request sent to our serve to json format
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});