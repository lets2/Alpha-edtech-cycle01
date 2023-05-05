import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import FormFull from "../FormFull/FormFull";
//import Modal from "../Modal/Modal";
import styled from "styled-components";
//import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import useModal from "../Modal/Modal";

interface ISignUpPage {
    change: () => void;
}

const LoginBox = styled.div`
    width: 400px;
    min-height: 170px;
    margin: 50px auto;
    background-color: none;
    border: none;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
`;

const MainTitle = styled.h1`
    margin: 20px 0 10px;
    color: blue;
    font-size: 40px;
`;

export default function SignUpPage() {
    const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
    const { user, setUser } = useContext(UserContext);

    const [EasyModal, openModal]: [
        () => JSX.Element,
        (errorMessage: string) => void
    ] = useModal();

    const navigate = useNavigate();

    async function formSubmitted() {
        console.log("Values in inputs when sending:", inputs);
        try {
            const res = await fetch("http://localhost:80/accounts/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(inputs),
            });

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

            navigate("/"); //change from signuppage to loginpage
        } catch (err: any) {
            console.error(err);
            openModal(err.message);
        }
    }

    function getInputs(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setInputs((prevState) => ({ ...prevState, [name]: value }));
    }

    return (
        <>
            <LoginBox /*className="container-login"*/>
                <MainTitle>Register</MainTitle>
                <FormFull onSubmit={formSubmitted} change={getInputs} />
            </LoginBox>
            <EasyModal />
        </>
    );
}
