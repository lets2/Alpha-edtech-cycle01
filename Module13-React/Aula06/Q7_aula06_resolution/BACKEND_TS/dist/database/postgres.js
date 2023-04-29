"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class connectDB {
    constructor() {
        this._pool = new pg_1.Pool({
            user: process.env.DBUSER,
            host: process.env.DBHOST,
            database: process.env.DBNAME,
            password: process.env.DBPASSWORD,
            port: Number(process.env.DBPORT),
            max: 20,
            idleTimeoutMillis: 100,
        });
    }
    get pool() {
        return this._pool;
    }
}
exports.default = connectDB;
