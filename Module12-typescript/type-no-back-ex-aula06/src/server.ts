import App from "./app";
import { Request, Response } from "express";
const app = new App();

app.server.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello, Hopper!");
});

app.server.listen("8000", () => console.log("Server run on localhost:8000"));
