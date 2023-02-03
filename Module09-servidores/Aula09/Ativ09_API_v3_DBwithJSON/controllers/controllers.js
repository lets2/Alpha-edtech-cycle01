import fs from "fs";

//GET MAIN PAGE
export const getMainPage = (req, res) => {
    res.send(`<h1>Home page</h1>
              <h2>Use /usuarios to access our user's list</h2>
              <h2>To add, edit/update or delete users, use POSTMAN</h2>`);
    res.status(200);
};

//USE GET METHOD
export const getAllUsers = (req, res) => {
    fs.readFile("./database/users.json", (err, data) => {
        if (err) {
            res.status(500); //there is a error
            res.json({
                status: "Não foi possivel acessar os dados do servidor",
            });
        }
        const allUsers = JSON.parse(data);

        res.send(allUsers);
        res.status(200);
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
    //counter++; //increase counter that is used to create unique ID's

    userList.push(newUser);

    fs.writeFileSync("./database/users.json", JSON.stringify(userList));

    res.json({ status: "User added successfully" });
    res.status(201); //created
};

//USE PUT METHOD
export const updateUser = (req, res) => {
    const id = req.params.id; //GET ID FROM URL

    let rawData = fs.readFileSync("./database/users.json");
    let userList = JSON.parse(rawData);

    const findIndex = verifyIdInDataBase(id, userList);

    if (findIndex !== -1) {
        userList[findIndex].name = req.body.name;
        userList[findIndex].email = req.body.email;

        fs.writeFileSync("./database/users.json", JSON.stringify(userList));
        res.status(200);
        res.send(`User with ID ${req.params.id} successfully updated!`);
    } else {
        res.send(`There is not a user with this ID!`);
    }
};

//USE DELETE METHOD
export const deleteUser = (req, res) => {
    const id = req.params.id; //ID PASSED BY URL TO BE DELETED

    let rawData = fs.readFileSync("./database/users.json");
    let userList = JSON.parse(rawData);

    const findIndex = verifyIdInDataBase(id, userList);

    if (findIndex !== -1) {
        userList.splice(findIndex, 1); //Go to index and remove 1 element from this

        fs.writeFileSync("./database/users.json", JSON.stringify(userList));
        res.status(200);
        res.send(`User with ID ${req.params.id} deleted successfully!`);
    } else {
        res.status(404); //maybe erase this line
        res.send(`There is not a user with this ID`);
    }
};

function verifyIdInDataBase(id, database) {
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
