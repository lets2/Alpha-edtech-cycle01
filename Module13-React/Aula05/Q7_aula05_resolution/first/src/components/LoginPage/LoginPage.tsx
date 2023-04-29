import { useState } from "react";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";
import "./LoginPage.css";

interface ILoginPage {
    change: () => void;
}

export default function LoginPage(props: ILoginPage) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [messageModal, setMessageModal] = useState("");

    const [inputs, setInputs] = useState({ email: "", password: "" });

    async function formSubmitted() {
        console.log("Valores do inputs ao enviar:", inputs);
        try {
            const res = await fetch("http://localhost:80/accounts/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            if (!res.ok && res.status === 401) {
                throw new Error(
                    "[401] Não autorizado! Verifique as credenciais!"
                );
                //return console.error("Erro na requisição!");
            }
            if (!res.ok) {
                throw new Error("[error] Houve um erro durante a requisição!");
                //return console.error("Erro na requisição!");
            }

            const data = await res.json();
            console.log("DATA:", data);
            props.change(); //change from loginpage to Homepage
        } catch (err: any) {
            console.log("ENTROU AQUI!");
            console.error(err);
            setMessageModal(err.message);
            setModalIsOpen(!modalIsOpen);
        }
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function getInputs(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setInputs((prevState) => ({ ...prevState, [name]: value }));
    }

    return (
        <>
            <div className="container-login">
                <h1>LOGIN</h1>
                <Form onSubmit={formSubmitted} change={getInputs} />
            </div>
            {modalIsOpen && (
                <Modal onClose={closeModal} message={messageModal} />
            )}
        </>
    );
}
