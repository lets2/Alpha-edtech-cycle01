import express from "express";

const app = express();
const port = 8000;

app.get("/", (req, res) => {
    res.send(
        "<h1>Utilize o caminho /calculadora/soma/{numero1}/{numero2}</h1>"
    );
});

app.get("/calculadora/soma/:numero1/:numero2", (req, res) => {
    const result = parseInt(req.params.numero1) + parseInt(req.params.numero2);
    res.status(200).send({
        "Primeiro número": req.params.numero1,
        "Segundo número": req.params.numero2,
        Resultado: result,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
