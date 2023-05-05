import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
//import Modal from "../Modal/Modal";
import styled from "styled-components";
import { useNavigate, Navigate } from "react-router-dom";
import FormFull from "../FormFull/FormFull";
import useModal from "../Modal/Modal";

const BoxDiv = styled.div`
    background-color: none;
    border: none;
    border-radius: 20px;
    padding: 10px 30px;
    margin: 60px auto 10px;
    color: white;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h2 {
        width: 100%;
        text-align: center;
        font-size: 30px;
    }
    span {
        font-weight: bold;
        font-size: 25px;
    }
    p {
        font-size: 25px;
    }
`;

export default function UpdatePage() {
    const { user, setUser } = useContext(UserContext);
    const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

    const [EasyModal, openModal]: [
        () => JSX.Element,
        (errorMessage: string) => void
    ] = useModal();

    const navigate = useNavigate();

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
                throw new Error("[Forbidden] You are not logged in!");
            }

            if (!res.ok && res.status === 401) {
                throw new Error("[401] Unauthorized! Check credentials!");
            }

            if (!res.ok && res.status === 400) {
                const data = await res.json();
                const { message } = data;
                throw new Error(message);
            }

            if (!res.ok) {
                throw new Error(
                    "[error] There was an error during the request!"
                );
            }

            const data = await res.json();
            console.log("DATA:", data);
            setUser(data);
            navigate("/home"); //change to homepage with data updated
        } catch (err: any) {
            console.error(err);
            openModal(err.message);
        }
    }

    function getInputs(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setInputs((prevState) => ({ ...prevState, [name]: value }));
    }

    if (user && user.name.length) {
        return (
            <>
                <BoxDiv>
                    <h2 style={{ color: "blue", fontSize: "40px" }}>
                        Update information
                    </h2>
                    <FormFull onSubmit={formSubmitted} change={getInputs} />
                </BoxDiv>
                <EasyModal />
            </>
        );
    } else {
        return <Navigate to="/" />;
    }
}
