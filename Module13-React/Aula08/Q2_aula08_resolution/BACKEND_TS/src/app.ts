import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/router";

import { Request, Response, NextFunction } from "express";

export default class App {
    server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }

    private middleware() {
        //this.server.use(cors());
        this.server.use(cors({ origin: true, credentials: true }));
        this.server.use(express.json());
        this.server.use(cookieParser());
        /*this.server.use((req: Request, res: Response, next: NextFunction) => {
            console.log("Request:", req.method, req.url);
            console.log("Cookies:", req.cookies);
            next();
        });*/
    }

    private router() {
        this.server.use(router);
    }
}
