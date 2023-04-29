import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";
import styled from "styled-components";
//import "./LoginPage.css";

interface ILoginPage {
    change: () => void;
}

const LoginBox = styled.div`
    width: 400px;
    min-height: 170px;
    margin: 50px auto;
    background-color: blue;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: 2px solid black;
`;

const MainTitle = styled.h1`
    margin: 20px 0 0;
`;

export default function LoginPage(props: ILoginPage) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [messageModal, setMessageModal] = useState("");

    const [inputs, setInputs] = useState({ email: "", password: "" });
    const { user, setUser } = useContext(UserContext);

    async function formSubmitted() {
        console.log("Valores do inputs ao enviar:", inputs);
        try {
            const res = await fetch("http://localhost:80/accounts/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(inputs),
            });

            if (!res.ok && res.status === 401) {
                throw new Error(
                    "[401] Não autorizado! Verifique as credenciais!"
                );
            }
            if (!res.ok) {
                throw new Error("[erro] Houve um erro durante a requisição!");
            }

            const data = await res.json();
            console.log("DATA:", data);
            setUser(data);
            //setUser({ id: data.id, email: data.email });
            props.change(); //change from loginpage to Homepage
        } catch (err: any) {
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
            <LoginBox /*className="container-login"*/>
                <MainTitle>LOGIN</MainTitle>
                <Form onSubmit={formSubmitted} change={getInputs} />
            </LoginBox>
            {modalIsOpen && (
                <Modal onClose={closeModal} message={messageModal} />
            )}
        </>
    );
}
