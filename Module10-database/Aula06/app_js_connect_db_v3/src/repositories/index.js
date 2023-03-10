//import Pool from "pg";
//import dotenv from "dotenv";
//dotenv.config();

require("dotenv/config");
const { Pool } = require("pg");
const pgPool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
});

module.exports = {
    db: pgPool,
};

/*

import { Pool } from "pg";

const pool = new Pool({
    host: "localhost",
    user: "database-user",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

async function conectando() {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release(); //é importante liberar o cliente para que ele possa ser reaproveitado
}

//para desconectar uma pool:

pool.end(() => {
    console.log("pool has ended");
});


*/
