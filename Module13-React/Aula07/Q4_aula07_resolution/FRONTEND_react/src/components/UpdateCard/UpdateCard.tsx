import Form from "../Form/Form";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Modal from "../Modal/Modal";
import styled from "styled-components";

const BoxDiv = styled.div`
    border: 2px solid blue;
    padding: 10px 30px;
    margin: 10px auto;
    color: blue;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export default function UpdateCard() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [messageModal, setMessageModal] = useState("");
    const { user, setUser } = useContext(UserContext);
    const [inputs, setInputs] = useState({ email: "", password: "" });

    async function formSubmitted() {
        // console.log("Valores do inputs ao enviar:", inputs);
        try {
            const res = await fetch("http://localhost:80/accounts/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(inputs),
            });

            if (!res.ok && res.status === 403) {
                throw new Error("[Forbidden] Não está logado!");
            }
            if (!res.ok) {
                throw new Error("[erro] Houve um erro durante a requisição!");
            }

            const data = await res.json();
            console.log("DATA:", data);
            setUser(data);
            //setUser({ id: data.id, email: data.email });
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
            <BoxDiv>
                <h3>Atualizar</h3>
                <Form onSubmit={formSubmitted} change={getInputs} />
            </BoxDiv>
            {modalIsOpen && (
                <Modal onClose={closeModal} message={messageModal} />
            )}
        </>
    );
}
