import { config } from "dotenv";
config();
import App from "./app";

const HOSTNAME: string = process.env.HOST || "localhost";
const PORT: number = Number(process.env.PORT) || 80;

new App().server.listen(PORT, HOSTNAME, () =>
    console.log(`Server is running on https://${HOSTNAME}:${PORT}`)
);
