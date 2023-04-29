import { useState } from "react";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";
import "./LoginPage.css";

export default function LoginPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function formSubmitted() {
        setModalIsOpen(!modalIsOpen);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <>
            <div className="container-login">
                <h1>LOGIN</h1>
                <Form onSubmit={formSubmitted} />
            </div>
            {modalIsOpen && <Modal onClose={closeModal} />}
        </>
    );
}
