import Form from "../Form/Form";
import Modal from "../Modal/Modal";
import "./LoginPage.css";

export default function LoginPage() {
    const modalIsOpen: boolean = true;

    function formSubmitted() {
        alert("Na próxima aula, clicar aqui vai abrir o modal!");
    }

    return (
        <>
            <div className="container-login">
                <h1>LOGIN</h1>
                <Form onSubmit={formSubmitted} />
            </div>
            {modalIsOpen && <Modal />}
        </>
    );
}
