const buttonRegister = document.querySelector("#button-register");
const buttonSaveChanges = document.querySelector("#button-save-changes");
const inputName = document.querySelector("#fullName");
const inputEmail = document.querySelector("#email");
const bodyTable = document.querySelector("#table-body");

window.addEventListener("load", () => {
    loadUploadedTable();
});

buttonRegister.addEventListener("click", () => {
    console.log("Clicou no botão, adicionar usuario");
    console.log(inputName.value);
    console.log(inputEmail.value);
    const newUser = {
        name: inputName.value,
        email: inputEmail.value,
    };

    addNewUserInDatabase(newUser);
    clearInputFields();
});

async function loadUploadedTable() {
    const response = await fetch("http://localhost:8080/usuarios");
    const userList = await response.json();
    console.log("A BUSCA DE ARQUIVO FOI SUCESSO, OLHA A LISTA:", userList);
    renderTable(userList);
}

function renderTable(userList) {
    console.log("minha lista", userList);
    bodyTable.innerHTML = ""; //clear table data
    console.log("console:", bodyTable);
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
                                <td><img src="./assets/icons8-x-30.svg" alt="delete icon" class="x"/></td>
        `;
        bodyTable.appendChild(rowElement);
    });
}

async function addNewUserInDatabase(newUser) {
    const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    const userList = await response.json();
    console.log("Adicionei!");
    loadUploadedTable();
}

function clearInputFields() {
    inputName.value = "";
    inputEmail.value = "";
}

bodyTable.addEventListener("click", (event) => {
    console.log("alvo:", event.target);

    const target = event.target;

    console.log(
        "GET ID:",
        target.parentNode.parentNode.childNodes[1].innerText
    );

    if (target.classList.contains("pencil")) {
        console.log("We need to edit data");
        const id = target.parentNode.parentNode.childNodes[1].innerText;
        editUserWithThis(id);
    } else if (target.classList.contains("x")) {
        console.log("We need to delete this row");
        const id = target.parentNode.parentNode.childNodes[1].innerText;
        deleteUserWithThis(id);
    }
});

//
async function editUserWithThis(id) {
    console.log("O ID:", id);
    const userList = await getAllUsersFromDatabase();
    if (thereIsUserWithThis(id, userList)) {
        let userFound;

        for (let i = 0; i < userList.length; i++) {
            if (userList[i].id === id) userFound = userList[i];
        }
        console.log("O usuario encontrado", userFound);
        renderUserToEdit(userFound);
    }
}

function thereIsUserWithThis(id, userList) {
    console.log("VAMO VER AQUI:", userList, id);
    let matchId = false;

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === id) matchId = true;
    }

    console.log("RESULTADO DE USERFOUND:", matchId);
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
    console.log(
        "O valor salvo no dataset foi:",
        id,
        "usuarioeditadoeh",
        userEdited
    );
    const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "PUT",
        body: JSON.stringify(userEdited),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    const dataJson = await response.json();
    console.log("DATAJSON:", dataJson);
    //create put method
    buttonRegister.classList.remove("hidden");
    buttonSaveChanges.classList.add("hidden");
    clearInputFields();
    loadUploadedTable();
}

//
async function getAllUsersFromDatabase() {
    const response = await fetch("http://localhost:8080/usuarios");
    const userList = await response.json();
    return userList;
}

//
async function deleteUserWithThis(id) {
    console.log("O ID:", id);
    const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    console.log("Response from server:", data);
    loadUploadedTable();
}
