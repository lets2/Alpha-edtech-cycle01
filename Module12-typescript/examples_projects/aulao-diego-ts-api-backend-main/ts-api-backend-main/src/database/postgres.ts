import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: "./config/.env" });

export default class Postgres {
    static #pool: pg.Pool;
    private static async connect(): Promise<pg.Pool> {
        const poolConfig = { max: Number(process.env.PG_MAX_CONNECTIONS) || 3 };
        const pool = new pg.Pool(poolConfig);
        const res = await pool.query("SELECT VERSION()");
        console.table(res.rows);
        return pool;
    }

    static async pool(): Promise<pg.Pool> {
        if (!Postgres.#pool) {
            Postgres.#pool = await Postgres.connect();
        }
        return Postgres.#pool;
    }
}
