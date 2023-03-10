import createEventStateChange from "../utils/event-state-change.js"; // import default
import { redirectToLoginPage } from "./login.js";
import { redirectToHomePage } from "./home.js";

export function information() {
    const divTag = document.createElement("div");
    divTag.innerHTML = `
    <header></header>
    <main>
        <button id="initial-button">Go to initial page</button>
        <h1>Information</h1>
        <table id="information-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>name</th>
                    <th>email</th>
                    <th>type</th>
                    
                </tr>
            </thead>
            <tbody id="information-tbody">
                <tr>
                    <td>01</td>
                    <td>lets</td>
                    <td>lets@mail.com</td>
                    <td>adm</td>      
                </tr>
                <tr>
                    <td>02</td>
                    <td>joao</td>
                    <td>joao@mail.com</td>
                    <td>user</td>      
                </tr>
                
            </tbody>
        </table>
        <button id="logout-button">Logout</button>
    </main>
    <footer></footer>`;

    return divTag;
}

export function redirectToInformationPage() {
    const eventStateChange = createEventStateChange("/information");
    window.dispatchEvent(eventStateChange);
}

//
export function addEventsToInformationPage() {
    const logoutButton = document.querySelector("#logout-button");
    logoutButton.onclick = doLogout;

    const initialButton = document.querySelector("#initial-button");
    initialButton.onclick = redirectToHomePage;
}

async function doLogout() {
    const cookieId = document.cookie.split("=")[1];
    if (cookieId) {
        await removeCookie();
    } else {
        console.log("NAO TEM COOkie, não está logado");
    }
    redirectToLoginPage();
}

async function removeCookie() {
    try {
        const response = await fetch("/logout", { method: "POST" });

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();

            const { message, error } = resJson;

            throw `${error}`;
        }

        const resJson = await response.json();
        console.log("message:", resJson.message);
    } catch (error) {
        console.log("ERRO:", error);
    }
}

export async function getInformationAboutUser() {
    try {
        const response = await fetch("/information");

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();

            const { message, error } = resJson;

            throw `${error}`;
        }

        const resJson = await response.json();
        console.log("DATAJson:", resJson.data);
        return resJson.data;
    } catch (error) {
        console.log("ERRO:", error);
        return [];
    }
}

export function insertAtTable(arrayData) {
    const tbodyTag = document.querySelector("#information-tbody");
    console.log("DATAS:", arrayData);
    if (arrayData.length > 0) {
        tbodyTag.innerHTML = ` 
                <tr>
                    <td>${arrayData[0].id}</td>
                    <td>${arrayData[0].name}</td>
                    <td>${arrayData[0].email}</td>
                    <td>${arrayData[0].name_type}</td>      
                </tr>`;
    }
}
