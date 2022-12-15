import MainPage from "./main-page.js";

export default function CartPage() {
    const div = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = "Cart Page";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Clicar";
    button.onclick = redirectToMain;

    div.appendChild(p);
    div.appendChild(button);

    return div;
};

function redirectToMain() {
    root.innerHTML = "";
    root.appendChild(MainPage());
};
