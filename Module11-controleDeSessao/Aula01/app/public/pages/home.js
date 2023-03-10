import createEventStateChange from "../utils/event-state-change.js"; // import default
import { redirectToInformationPage } from "./information.js";
import { redirectToLoginPage } from "./login.js";

export function home() {
    const divTag = document.createElement("div");
    divTag.innerHTML = `
    <header></header>
    <main>
        <h1>Home</h1>
        <button id="go-login-page">Go to Login Page</button>
    </main>
    <footer></footer>`;

    return divTag;
}

export function redirectToHomePage() {
    const eventStateChange = createEventStateChange("/");
    window.dispatchEvent(eventStateChange);
}

//
export function addEventsToHomePage() {
    const loginButton = document.querySelector("#go-login-page");
    loginButton.onclick = verifyIfIsLogin;
}
function verifyIfIsLogin() {
    const cookieId = document.cookie.split("=")[1];

    if (cookieId) {
        redirectToInformationPage();
    } else {
        redirectToLoginPage();
    }
}
