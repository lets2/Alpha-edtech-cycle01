const pool = require("./db-pool.js");

const TAG = "users Repository: ";

exports.login = async (_email, _plainTextPassword) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "SELECT users.id,users.name,users.email,users.password,user_types.name as name_type FROM users JOIN user_types ON users.type_id = user_types.id WHERE users.email = $1",
            [_email]
        );
        const rows = query.rows || [];
        return rows; //return empty array if doesnt exists
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

exports.information = async (_userId) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "SELECT users.id,users.name,users.email,users.password,user_types.name as name_type FROM users JOIN user_types ON users.type_id = user_types.id WHERE users.id = $1",
            [_userId]
        );
        const rows = query.rows || [];
        return rows; //return empty array if doesnt exists
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};
