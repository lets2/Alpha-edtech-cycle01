import createEventStateChange from "../utils/event-state-change.js"; // import default
import { redirectToInformationPage } from "./information.js";
import { redirectToHomePage } from "./home.js";

export function login() {
    const divTag = document.createElement("div");
    divTag.innerHTML = `
    <header></header>
    <main>
        <button id="initial-button">Go to initial page</button>
        <h1>Login</h1>
        <form action="" >
            <input type="email" name="email" id="email" placeholder="Email">
            <input type="password" name="password" id="password" placeholder="Senha">
            <input type="button" value="Login" id="login-button"> 
            <!-- <button id="login-button">Loginbutton</button> -->
        </form>
    </main>
    <footer></footer>`;

    return divTag;
}

export function redirectToLoginPage() {
    const eventStateChange = createEventStateChange("/login");
    window.dispatchEvent(eventStateChange);
}

//
export function addEventsToLoginPage() {
    const loginButton = document.querySelector("#login-button");
    loginButton.onclick = verifyCredentials;

    const initialButton = document.querySelector("#initial-button");
    initialButton.onclick = redirectToHomePage;
}

async function verifyCredentials() {
    const inputEmail = document.querySelector("#email").value;
    const inputPassword = document.querySelector("#password").value;
    const objCredentials = {
        email: inputEmail,
        password: inputPassword,
    };
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objCredentials),
        });

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();

            const { message, error } = resJson;

            throw `${error}`;
        }

        const resJson = await response.json();
        console.log("DATAJson:", resJson);
        redirectToInformationPage();
    } catch (error) {
        console.log("ERRO:", error);
        alert(error);
    }
}
