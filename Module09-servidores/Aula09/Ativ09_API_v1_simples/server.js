import express from "express";

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
const app = express();

const port = "8080";

//convert request sent to our serve to json format
app.use(express.json());

//Running application on PORT was defined - ROOT OF THIS PROJECT "/"

app.get("/", (req, res) => {
    res.send(`<h1>HOme page</h1>
                <h2>Use /usuarios to access our user's list</h2>
                <h2>To add, edit/update or delete users, use POSTMAN</h2>`);
    res.status(200);
});

//HTTP METHODS (GET,POST,PUT e DELETE)

//SEE USERLIST (GET)
app.get("/usuarios", (req, res) => {
    res.send(database);
});

//ADD A NEW USER IN THE DATABASE (POST)
app.post("/usuarios", (req, res) => {
    console.log("BODY OF MY POST REQUEST", req.body);
    const newUser = {
        id: counter.toString(),
        ...req.body, //create a copy of body content request
    };
    counter++; //increase counter that is used to create unique ID's
    database.push(newUser);
    res.status(201); //STATUS CODE THAT MEAN "CREATED"
    res.send(`User <${newUser.name}> added successfully!`);
});

//EDIT DATA ABOUT A USER WITH A SPECIFIC ID
app.put("/usuarios/:id", (req, res) => {
    console.log("BODY OF MY PUT REQUEST", req.body);
    const id = req.params.id;
    let findIndex = -1;
    for (let i = 0; i < database.length && findIndex === -1; i++) {
        if (database[i].id === id) {
            findIndex = i;
        }
    }
    if (findIndex !== -1) {
        console.log(
            "There is a user with this ID, the change was successfully made!"
        );
        database[findIndex].name = req.body.name;
        database[findIndex].email = req.body.email;
        res.status(200);
        res.send(`User with ID ${req.params.id} successfully updated!`);
    } else {
        console.log("There is not a user with this ID!");
        res.send(`There is not a user with this ID!`);
    }
});

//DELETE A USER BY ID
app.delete("/usuarios/:id", (req, res) => {
    console.log("REQUEST TO DELETE A USER!");
    const id = req.params.id; //ID PASSED BY URL TO BE DELETED
    let findIndex = -1;
    for (let i = 0; i < database.length && findIndex === -1; i++) {
        if (database[i].id === id) {
            findIndex = i;
        }
    }
    if (findIndex !== -1) {
        console.log("There is a user with this ID, deleted successfully!");
        database.splice(findIndex, 1); //Go to index and remove 1 element from this
        res.status(200);
        res.send(`User with ID ${req.params.id} deleted successfully!`);
    } else {
        console.log("There is not a user with this ID");
        res.status(404); //maybe erase this line
        res.send(`There is not a user with this ID`);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
