import dotenv from "dotenv";
import Express from "express";
import Router from "./router/router";

dotenv.config({ path: "./config/.env" });

const port = process.env.PORT || 8000;

const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

const router = new Router();
app.use(router.get());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
