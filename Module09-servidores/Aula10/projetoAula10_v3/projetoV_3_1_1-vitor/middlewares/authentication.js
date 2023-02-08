export function authenticate(req, res, next) {
    if (req.body.password !== 123) {
        res.status(403).json({ status: "senha incorreta" }); // forbidden
        return;
    }

    next();
}
