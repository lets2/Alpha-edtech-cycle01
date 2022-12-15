import CartPage from "./cart-page.js";

export default function MainPage() {
    const div = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = "Main Page";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Clicar";
    button.onclick = redirectToCart;

    div.appendChild(p);
    div.appendChild(button);

    return div;
};

function redirectToCart() {
    root.innerHTML = "";
    root.appendChild(CartPage());
};
