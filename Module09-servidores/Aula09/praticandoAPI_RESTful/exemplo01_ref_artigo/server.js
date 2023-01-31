const app = require("./config/express")();
const port = app.get("port");

//EXECUTANDO NOSSA APLICAÇÃO NA PORTA DEFINIDA
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
