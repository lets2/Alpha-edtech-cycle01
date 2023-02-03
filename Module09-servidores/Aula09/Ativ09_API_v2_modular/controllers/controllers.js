//Global variable used like a database
let database = [
    {
        id: "11",
        name: "lets",
        email: "lets@mail.com",
    },
    {
        id: "12",
        name: "felipe",
        email: "felipe@mail.com",
    },
    {
        id: "13",
        name: "arthur",
        email: "arthur@mail.com",
    },
];
// counter to generate unique id's
let counter = 14; //

export const getMainPage = (req, res) => {
    res.send(`<h1>Home page</h1>
                <h2>Use /usuarios to access our user's list</h2>
                <h2>To add, edit/update or delete users, use POSTMAN</h2>`);
    res.status(200);
};

export const getAllUsers = (req, res) => {
    res.send(database);
};

export const createNewUser = (req, res) => {
    const newUser = {
        id: counter.toString(),
        ...req.body, //create a copy of body content request
    };
    counter++; //increase counter that is used to create unique ID's
    database.push(newUser);
    res.status(201); //STATUS CODE THAT MEAN "CREATED"
    res.send(`User <${newUser.name}> added successfully!`);
};

export const updateUser = (req, res) => {
    const id = req.params.id;
    const findIndex = verifyIdInDataBase(id);

    if (findIndex !== -1) {
        database[findIndex].name = req.body.name;
        database[findIndex].email = req.body.email;
        res.status(200);
        res.send(`User with ID ${req.params.id} successfully updated!`);
    } else {
        res.send(`There is not a user with this ID!`);
    }
};

export const deleteUser = (req, res) => {
    const id = req.params.id; //ID PASSED BY URL TO BE DELETED
    const findIndex = verifyIdInDataBase(id);

    if (findIndex !== -1) {
        database.splice(findIndex, 1); //Go to index and remove 1 element from this
        res.status(200);
        res.send(`User with ID ${req.params.id} deleted successfully!`);
    } else {
        res.status(404); //maybe erase this line
        res.send(`There is not a user with this ID`);
    }
};

function verifyIdInDataBase(id) {
    let findIndex = -1;
    for (let i = 0; i < database.length && findIndex === -1; i++) {
        if (database[i].id === id) {
            findIndex = i;
        }
    }
    return findIndex;
}
