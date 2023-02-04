const buttonRegister = document.querySelector("#button-register");
const buttonSaveChanges = document.querySelector("#button-save-changes");
const inputName = document.querySelector("#fullName");
const inputEmail = document.querySelector("#email");
const bodyTable = document.querySelector("#table-body");

window.addEventListener("load", () => {
    loadUploadedTable();
});

buttonRegister.addEventListener("click", () => {
    try {
        const newUser = getInputdata();
        addNewUserInDatabase(newUser);
        clearInputFields();
    } catch (error) {
        displayWarning(error);
    }
});

function getInputdata() {
    if (inputName.value === "" || inputEmail.value === "") {
        throw "[erro] Pelo menos um campo está vazio! Por favor, verifique!";
    }

    if (inputName.value.length < 4) {
        throw "[erro] O campo 'Nome' precisa ter pelo menos 4 caracteres!";
    }

    if (!inputEmail.value.includes("@")) {
        throw "[erro] Por favor, insira um email válido!";
    }

    return {
        name: inputName.value,
        email: inputEmail.value,
    };
}

async function addNewUserInDatabase(newUser) {
    const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.status !== 200 && response.status !== 201)
        throw "[erro] Houve um problema durante o cadastro! Tente novamente!";

    const resJson = await response.json();
    displayWarning(resJson.status);
    loadUploadedTable();
}

const containerModal = document.querySelector(".container-modal");
const modal = document.querySelector("#modal");
const containerWarning = document.querySelector("#warning");
const buttonModal = document.querySelector("#button-modal");

function displayWarning(message) {
    containerModal.classList.remove("hidden");
    containerWarning.innerHTML = message;
}

containerModal.addEventListener("click", () => {
    containerModal.classList.add("hidden");
    containerWarning.innerHTML = "";
});

modal.addEventListener("click", (event) => {
    event.stopPropagation();
});

buttonModal.addEventListener("click", () => {
    containerModal.classList.add("hidden");
    containerWarning.innerHTML = "";
});

async function loadUploadedTable() {
    const response = await fetch("http://localhost:8080/usuarios");

    if (response.status !== 200)
        throw "[erro] Houve um problema no acesso ao banco de dados!";

    const userList = await response.json();
    renderTable(userList);
}

function renderTable(userList) {
    bodyTable.innerHTML = ""; //clear table data before insert updated data
    userList.forEach((element) => {
        const rowElement = document.createElement("tr");
        rowElement.innerHTML = `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>
                <img
                    src="./assets/pencil-5-svgrepo-com.svg"
                    alt="pencil icon"
                    class="pencil"
                />
            </td>
            <td><img src="./assets/icons8-x-30.svg" alt="delete icon" 
            class="x"/></td>
        `;
        bodyTable.appendChild(rowElement);
    });
}

function clearInputFields() {
    inputName.value = "";
    inputEmail.value = "";
}

bodyTable.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("pencil")) {
        console.log("We need to edit this row!");
        const id = target.parentNode.parentNode.childNodes[1].innerText;
        editUserWithThis(id);
    }

    if (target.classList.contains("x")) {
        console.log("We need to delete this row!");
        const id = target.parentNode.parentNode.childNodes[1].innerText;
        deleteUserWithThis(id);
    }
});

//
async function editUserWithThis(id) {
    const userList = await getAllUsersFromDatabase();

    if (thereIsUserWithThis(id, userList)) {
        let userFound;

        for (let i = 0; i < userList.length; i++) {
            if (userList[i].id === id) userFound = userList[i];
        }

        renderUserToEdit(userFound);
        movePagetoTop();
    }
}

function thereIsUserWithThis(id, userList) {
    let matchId = false;

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === id) matchId = true;
    }

    return matchId;
}

function renderUserToEdit(user) {
    inputName.value = user.name;
    inputEmail.value = user.email;
    buttonRegister.classList.add("hidden");
    buttonSaveChanges.classList.remove("hidden");
    buttonSaveChanges.onclick = saveChanges;
    buttonSaveChanges.dataset.saveid = user.id;
}

async function saveChanges() {
    const userEdited = {
        name: inputName.value,
        email: inputEmail.value,
    };
    const id = buttonSaveChanges.dataset.saveid;

    const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "PUT",
        body: JSON.stringify(userEdited),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    const dataJson = await response.json();

    buttonRegister.classList.remove("hidden");
    buttonSaveChanges.classList.add("hidden");

    clearInputFields();
    displayWarning(dataJson.status);
    loadUploadedTable();
}

//
function movePagetoTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

//
async function deleteUserWithThis(id) {
    const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "DELETE",
    });
    const dataJson = await response.json();

    displayWarning(dataJson.status);
    loadUploadedTable();
}

//
async function getAllUsersFromDatabase() {
    const response = await fetch("http://localhost:8080/usuarios");
    const userList = await response.json();
    return userList;
}
