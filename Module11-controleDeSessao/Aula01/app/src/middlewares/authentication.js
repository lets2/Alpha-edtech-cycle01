function authenticate(req, res, next) {
    try {
        console.log("OLHA O REQ.cookies:", req.cookies);
        const userId = req.cookies.id;
        console.log("USERID", userId);
        if (userId) {
            req.userId = userId; //adiciona a requisição um campo userId
            console.log("ENTROU NO IF");
            next();
            return;
        } else {
            throw new Error("Não possui o cookie");
        }
        /*
        const decodedJwt = jwtLib.verify(
            req.cookies.session,
            process.env.JWT_SECRET
        );
        req.userId = decodedJwt.userId;
        */
        //add verify

        next();
    } catch (err) {
        console.log("[ERROR] AUTHENTICATE:", err.message);
        res.status(403).json({ message: "Acesso proibido!" });
    }
}

module.exports = authenticate;
