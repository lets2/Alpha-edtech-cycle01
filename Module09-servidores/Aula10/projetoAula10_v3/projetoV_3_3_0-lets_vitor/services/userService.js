import {
    readUsers,
    writeUsers,
    generateId,
    verifyIdInDatabase,
} from "../repositories/userRepo.js";

export function getAllUsersService() {
    return readUsers();
}

// service
export function createUserService(name, email) {
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

export function updateUserService(name, email, id) {
    const users = readUsers();
    const findIndex = verifyIdInDatabase(id, users);

    if (findIndex !== -1) {
        users[findIndex].name = name;
        users[findIndex].email = email;

        writeUsers(users);
    } else {
        throw new Error("Não existe um usuário associado a esse ID!");
    }
}

export function deleteUserService(id) {
    const users = readUsers();
    const findIndex = verifyIdInDatabase(id, users);

    if (findIndex !== -1) {
        users.splice(findIndex, 1); //Go to index and remove 1 element from this

        writeUsers(users);
    } else {
        throw new Error("Não existe um usuário associado a esse ID!");
    }
}
