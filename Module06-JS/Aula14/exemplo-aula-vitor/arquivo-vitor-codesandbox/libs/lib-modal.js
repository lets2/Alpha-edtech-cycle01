export function modalConfirmacao(msg) {
  const container = document.createElement("div");
  container.innerHTML = `
    <div style="display: flex; 
                align-items: center; 
                justify-content: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);"    
         id="modal-background">
      <div style="background-color: white;">
        <div style="padding: 20px;">${msg}</div>
        <hr>
        <button style="margin: 10px;" id="confirmar">Confirmar</button>
        <button style="margin: 10px;" id="cancelar">Cancelar</button>
      </div>
    </div>`;

  container.querySelector("#confirmar").addEventListener("click", () => {
    document.body.removeChild(modal);
    modal.dispatchEvent(
      new CustomEvent("modal-fechou", {
        detail: { status: "confirmado" }
      })
    );
  });

  container.querySelector("#cancelar").addEventListener("click", () => {
    document.body.removeChild(modal);
    modal.dispatchEvent(
      new CustomEvent("modal-fechou", {
        detail: { status: "cancelado" }
      })
    );
  });

  container.querySelector("#modal-background").addEventListener("click", () => {
    document.body.removeChild(modal);
    modal.dispatchEvent(
      new CustomEvent("modal-fechou", {
        detail: { status: "cancelado" }
      })
    );
  });

  const modal = container.children[0];

  document.body.appendChild(modal);

  return modal;
}
