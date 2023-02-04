import fs from "fs";

//USE GET METHOD
export const getAllUsers = (req, res) => {
    fs.readFile("./database/users.json", (err, data) => {
        if (err) {
            res.status(500); //there is a error on server side
            res.json({
                status: "Não foi possivel acessar os dados do servidor",
            });
        }
        const allUsers = JSON.parse(data);

        res.status(200);
        res.send(allUsers);
    });
};

//USE POST METHOD
export const createNewUser = (req, res) => {
    let rawData = fs.readFileSync("./database/users.json");
    let userList = JSON.parse(rawData);

    const newId = generateId(userList);
    const newUser = {
        id: newId,
        ...req.body, //create a copy of body content request
    };

    userList.push(newUser);

    fs.writeFileSync("./database/users.json", JSON.stringify(userList));

    res.status(201); //created
    res.json({ status: "Usuário adicionado com sucesso!" });
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
