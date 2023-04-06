const pool = require("./db-pool.js");

const TAG = "accounts Repository: ";

exports.list = async () => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query("SELECT id,name,email FROM accounts;");

        const rows = query.rows || [];

        return rows; //return empty array if doesnt exists
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

exports.register = async (_name, _email, _password) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "INSERT INTO accounts (name, email, password) VALUES ($1,$2,$3) RETURNING id,name,email;",
            [_name, _email, _password]
        );

        const rows = query.rows || [];

        return rows; //return empty array if doesnt exists
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

exports.update = async (_name, _email, _password) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "UPDATE accounts SET name=$1,email=$2,password=$3,updated_at=NOW() WHERE id='b8b432ea-3c14-4cf7-bb65-2a5aa618a20b' RETURNING id,name,email;",
            [_name, _email, _password]
        );

        const rows = query.rows || [];

        return rows; //return empty array if doesnt exists
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

exports.login = async (_email, _plainTextPassword) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "SELECT id,email,password FROM accounts WHERE email = $1",
            [_email]
        );
        const rows = query.rows || [];
        return rows; //return empty array if doesnt exists
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};
