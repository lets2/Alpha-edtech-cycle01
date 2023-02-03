const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const consign = require("consign");

module.exports = () => {
    const app = express();

    //DEFININDO VARIAVEIS DA APLICAÇÃO
    app.set("port", process.env.PORT || config.get("server.port"));

    //MIDDLEWARES
    app.use(bodyParser.json());

    //ENDPOINTS
    consign({ cwd: "api" })
        .then("data")
        .then("controllers")
        .then("routes")
        .into(app);
    //    require("../api/routes/customerWallets")(app);
    return app;
};
