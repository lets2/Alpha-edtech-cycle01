import "./Modal.css";

export default function Modal() {
    function closeModal() {
        alert("Na próxima aula, clicar aqui vai fechar o modal!");
    }

    function stopPropagation(event: React.MouseEvent) {
        event.stopPropagation();
    }

    return (
        <div className="modal-background" onClick={() => closeModal()}>
            <div
                className="modal-content"
                onClick={(event) => stopPropagation(event)}
            >
                <p>Form enviado com sucesso!</p>
            </div>
        </div>
    );
}
