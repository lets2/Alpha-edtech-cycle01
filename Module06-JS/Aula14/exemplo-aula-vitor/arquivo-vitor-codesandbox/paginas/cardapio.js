import { navegarContato } from "./contato.js";
import { navegarHome } from "./home.js";

const cardapioHTML = `<h1>Cardápio</h1>
<a href="#home" id="navegar-home">Home</a>
<a href="#contato" id="navegar-contato">Contato</a>
<p>Sardinha</p>`;

export function navegarCardapio() {
  document.getElementById("spa-container").innerHTML = cardapioHTML;

  document
    .getElementById("navegar-home")
    .addEventListener("click", function () {
      navegarHome();
    });

  document
    .getElementById("navegar-contato")
    .addEventListener("click", function () {
      navegarContato();
    });
}
