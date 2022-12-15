import { navegarCardapio } from "./cardapio.js";
import { navegarContato } from "./contato.js";

const homeHTML = `<h1>Home</h1>
<a href="#contato" id="navegar-contato">Contato</a>
<a href="#cardapio" id="navegar-cardapio">Cardápio</a>
<p>Seja bem vindo ao nosso restaurante</p>`;

export function navegarHome() {
  document.getElementById("spa-container").innerHTML = homeHTML;

  document
    .getElementById("navegar-contato")
    .addEventListener("click", function () {
      navegarContato();
    });

  document
    .getElementById("navegar-cardapio")
    .addEventListener("click", function () {
      navegarCardapio();
    });
}
