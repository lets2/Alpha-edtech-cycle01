// import { navegarHome } from "./paginas/home.js";
// console.log(1);

// navegarHome();

import { modalConfirmacao } from "./libs/lib-modal.js";

document.getElementById("excluir").addEventListener("click", function () {
  const modal = modalConfirmacao("Quer mesmo excluir ?");
  console.log(modal);

  modal.addEventListener("modal-fechou", function (event) {
    // event.detail.status; // "confirmado" "cancelado"

    if (event.detail.status === "confirmado") {
      alert("excluido com sucesso");
    }
  });
});
