import fs from "fs";

//USE GET METHOD
export const getAllUsers = (req, res) => {
    //res.json([
    //    { name: "vitor", email: "vitor@gmail.com" },
    //    { name: "fer", email: "fer@gmail.com" },
    //]);
    fs.readFile("./database/users.json", (err, data) => {
        if (err) {
            res.status(500); //there is a error on server side
            res.json({
                status: "Não foi possivel acessar os dados do servidor",
            });
            return;
        }

        const allUsers = JSON.parse(data);

        res.status(200);
        res.send(allUsers);
    });
};

// repo
function readUsers() {
    return JSON.parse(fs.readFileSync("./database/users.json"));
}

// repo
function writeUsers(users) {
    fs.writeFileSync("./database/users.json", JSON.stringify(users));
}

// service
function createUserService(name, email) {
    const users = readUsers();

    if (users.some((user) => user.email === email)) {
        throw new Error("email ja existe");
    }

    const newId = generateId(users);
    const newUser = {
        id: newId,
        email: email,
        name: name,
    };

    users.push(newUser);

    writeUsers(users);
}

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
    const id = req.params.id; //get id from URL

    let rawData = fs.readFileSync("./database/users.json");
    let userList = JSON.parse(rawData);

    const findIndex = verifyIdInDatabase(id, userList);

    if (findIndex !== -1) {
        userList[findIndex].name = req.body.name;
        userList[findIndex].email = req.body.email;

        fs.writeFileSync("./database/users.json", JSON.stringify(userList));

        res.status(200);
        res.json({
            status: `Usuário atualizado com sucesso!`,
        });
        //res.send(`User with ID ${req.params.id} successfully updated!`);
    } else {
        res.json({ status: "Não existe um usuário associado a esse ID!" });
        //res.send(`There is not a user with this ID!`);
    }
};

//USE DELETE METHOD
export const deleteUser = (req, res) => {
    const id = req.params.id; //id passed by URL to be deleted

    let rawData = fs.readFileSync("./database/users.json");
    let userList = JSON.parse(rawData);

    const findIndex = verifyIdInDatabase(id, userList);

    if (findIndex !== -1) {
        userList.splice(findIndex, 1); //Go to index and remove 1 element from this

        fs.writeFileSync("./database/users.json", JSON.stringify(userList));

        res.status(200);
        res.json({
            status: `Usuário excluído com sucesso!`,
        });
        //res.send(`User with ID ${req.params.id} deleted successfully!`);
    } else {
        res.status(404); //Not found
        res.json({ status: "Não existe um usuário associado a esse ID!" });
        //res.send(`There is not a user with this ID`);
    }
};

function verifyIdInDatabase(id, database) {
    let findIndex = -1;
    for (let i = 0; i < database.length && findIndex === -1; i++) {
        if (database[i].id === id) {
            findIndex = i;
        }
    }
    return findIndex;
}

function generateId(database) {
    let lastIndex = database.length - 1;
    const maxId = parseInt(database[lastIndex].id);
    const newId = (maxId + 1).toString();
    return newId;
}