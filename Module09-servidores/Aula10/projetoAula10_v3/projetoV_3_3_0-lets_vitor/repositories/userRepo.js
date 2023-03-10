import fs from "fs";

// repo
export function readUsers() {
    return JSON.parse(fs.readFileSync("./repositories/users.json"));
}

// repo
export function writeUsers(users) {
    fs.writeFileSync("./repositories/users.json", JSON.stringify(users));
}

//repo
export function generateId(database) {
    let lastIndex = database.length - 1;
    const maxId = parseInt(database[lastIndex].id);
    const newId = (maxId + 1).toString();
    return newId;
}

//repo
export function verifyIdInDatabase(id, database) {
    let findIndex = -1;
    for (let i = 0; i < database.length && findIndex === -1; i++) {
        if (database[i].id === id) {
            findIndex = i;
        }
    }
    return findIndex;
}
