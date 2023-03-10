//USING CLIENT AND URL ACCESS

/* var pg = require("pg");
//or native libpq bindings
//var pg = require('pg').native

var conString =
    "postgres://ledlgubw:pGF4Zmy1gMMan86NcyXPhViSepLgJSsm@babar.db.elephantsql.com/ledlgubw"; //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function (err) {
    if (err) {
        return console.error("could not connect to postgres", err);
    }
    client.query('SELECT NOW() AS "theTime"', function (err, result) {
        if (err) {
            return console.error("error running query", err);
        }
        console.log(result.rows[0].theTime);
        // >> output: 2018-08-23T14:02:57.117Z
        client.end();
    });
});

*/

//USING POOL AND URL ACCESS

/*
const { Pool } = require("pg");
//using url model
const pool = new Pool({
    connectionString:
        "postgresql://ledlgubw:pGF4Zmy1gMMan86NcyXPhViSepLgJSsm@babar.db.elephantsql.com/ledlgubw",
    ssl: {
        rejectUnauthorized: false,
    },
});
*/

//postgres://ledlgubw:pGF4Zmy1gMMan86NcyXPhViSepLgJSsm@babar.db.elephantsql.com/ledlgubw
//connectionString: 'postgresql://<username>:<password>@<host>/<database>',
/*
pool.query("SELECT * from gods", (error, result) => {
    if (error) {
        console.error("Erro na consulta:", error);
    } else {
        console.log("Resultado:", result.rows);
    }
});
*/

//*******************************/
//using  HOST WAY Funcionou também!!
//****************************** */
const { Pool } = require("pg");

const pool = new Pool({
    user: "ledlgubw",
    host: "babar.db.elephantsql.com",
    database: "ledlgubw",
    password: "pGF4Zmy1gMMan86NcyXPhViSepLgJSsm",
    port: "5432",
});

pool.query("SELECT * from gods", (error, result) => {
    if (error) {
        console.error("Erro na consulta:", error);
    } else {
        console.log("Resultado:", result.rows);
    }
});
