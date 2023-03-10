import {
    getAllUsersService,
    createUserService,
    updateUserService,
    deleteUserService,
} from "../services/userService.js";

//USE GET METHOD
export const getAllUsers = (req, res) => {
    //res.json([
    //    { name: "vitor", email: "vitor@gmail.com" },
    //    { name: "fer", email: "fer@gmail.com" },
    //]);

    try {
        const users = getAllUsersService();

        res.status(200); //okay
        res.json(users);
    } catch (err) {
        res.status(500);
        res.json({ status: "erro do servidor" });
    }
};

//USE POST METHOD
export const createNewUser = (req, res) => {
    if (typeof req.body.name !== "string" || req.body.name === "") {
        res.status(400).json({ status: "nome é obrigatório" }); // bad request
        return;
    }

    if (
        typeof req.body.email !== "string" ||
        req.body.email === "" ||
        !req.body.email.includes("@")
    ) {
        res.status(400).json({ status: "email é obrigatório" }); // bad request
        return;
    }

    try {
        createUserService(req.body.name, req.body.email);

        res.status(201); //created
        res.json({ status: "Usuário adicionado com sucesso!" });
    } catch (err) {
        res.status(500);
        res.json({ status: "erro do servidor" });
    }
};

//USE PUT METHOD
export const updateUser = (req, res) => {
    if (typeof req.body.name !== "string" || req.body.name === "") {
        res.status(400).json({ status: "nome é obrigatório" }); // bad request
        return;
    }

    if (
        typeof req.body.email !== "string" ||
        req.body.email === "" ||
        !req.body.email.includes("@")
    ) {
        res.status(400).json({ status: "email é obrigatório" }); // bad request
        return;
    }

    const id = req.params.id; //get id from URL

    try {
        updateUserService(req.body.name, req.body.email, id);

        res.status(200); //user updated
        res.json({ status: "Usuário atualizado com sucesso!" });
    } catch (err) {
        console.log("Erro emitido", err);
        res.status(500);
        res.json({ status: "erro do servidor" });
    }
};

//USE DELETE METHOD
export const deleteUser = (req, res) => {
    const id = req.params.id; //get id from URL

    try {
        deleteUserService(id);

        res.status(200); //user deleted
        res.json({ status: "Usuário deleteado com sucesso!" });
    } catch (err) {
        console.log("Erro emitido", err);
        res.status(500);
        res.json({ status: "erro do servidor" });
    }
};
