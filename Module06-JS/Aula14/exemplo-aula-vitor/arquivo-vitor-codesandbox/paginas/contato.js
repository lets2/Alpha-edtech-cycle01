import { navegarCardapio } from "./cardapio.js";
import { navegarHome } from "./home.js";

const contatoHTML = ` <h1>Contato</h1>
<a href="#home" id="navegar-home">Home</a>
<a href="#cardapio" id="navegar-cardapio">Cardápio</a>
<p>Nosso telefone é xxxx</p>`;

export function navegarContato() {
  document.getElementById("spa-container").innerHTML = contatoHTML;

  document
    .getElementById("navegar-home")
    .addEventListener("click", function () {
      navegarHome();
    });

  document
    .getElementById("navegar-cardapio")
    .addEventListener("click", function () {
      navegarCardapio();
    });
}
