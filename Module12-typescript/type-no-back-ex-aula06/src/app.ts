import express from "express";
import cors from "cors";

export default class App {
    server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
    }
    private middleware() {
        this.server.use(cors());
    }
}
