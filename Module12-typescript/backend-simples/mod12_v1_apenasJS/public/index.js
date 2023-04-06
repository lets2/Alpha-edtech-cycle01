//------------------------------------------------------------------------
// RENDER INITIAL - HOME PAGE
//------------------------------------------------------------------------

import createObjWithRoutes from "./routes/router.js"; // import default

const root = document.querySelector("#root");
const objRoutes = createObjWithRoutes();
const page = objRoutes.getPage("/");

root.innerHTML = "";
root.appendChild(page);
addEventsRelatedTo("/");

window.addEventListener("onstatechange", (event) => {
    const url = event.detail.url;
    const page = objRoutes.getPage(url);

    history.pushState({}, "", url);
    root.innerHTML = "";
    root.appendChild(page);
    addEventsRelatedTo(url);
});

import { addEventsToHomePage } from "./pages/home.js";
import { addEventsToLoginPage } from "./pages/login.js";
import {
    getInformationAboutUser,
    insertAtTable,
    addEventsToInformationPage,
} from "./pages/information.js";

async function addEventsRelatedTo(url) {
    switch (url) {
        case "/":
            addEventsToHomePage();
            break;
        case "/login":
            addEventsToLoginPage();
            break;
        case "/information":
            const arrayData = await getInformationAboutUser();
            insertAtTable(arrayData);
            addEventsToInformationPage();
            break;
    }
}
