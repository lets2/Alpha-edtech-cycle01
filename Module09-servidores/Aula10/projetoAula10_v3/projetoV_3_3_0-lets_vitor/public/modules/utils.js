const containerModal = document.querySelector(".container-modal");
const containerWarning = document.querySelector("#warning");
const inputName = document.querySelector("#fullName");
const inputEmail = document.querySelector("#email");

export function displayWarning(message) {
    containerModal.classList.remove("hidden");
    containerWarning.innerHTML = message;
}

export function clearInputFields() {
    inputName.value = "";
    inputEmail.value = "";
}

export function movePagetoTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

export function getInputdata() {
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
