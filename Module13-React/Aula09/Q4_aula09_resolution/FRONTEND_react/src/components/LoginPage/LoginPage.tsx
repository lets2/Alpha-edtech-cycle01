import { useState, useContext, JSXElementConstructor } from "react";
import { UserContext } from "../Context/UserContext";
import Form from "../Form/Form";
//import Modal from "../Modal/Modal";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//import "./LoginPage.css";
import useModal from "../Modal/Modal";

interface ILoginPage {
    change: () => void;
}

const RegisterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    margin: 20px auto;
    color: black;
    /*styling button within box*/
    button {
        padding: auto 150px;
        background-color: #d34917;
        color: white;
        transition: 0.2s;
    }
    button:hover {
        background-color: #d34917;
        box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
    }
`;

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
    width: 100%;
    text-align: center;
    color: blue;
    font-size: 40px;
`;

export default function LoginPage() {
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const { user, setUser } = useContext(UserContext);

    const [EasyModal, openModal]: [
        () => JSX.Element,
        (errorMessage: string) => void
    ] = useModal();
    const navigate = useNavigate();

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
            console.log("DATA LOGIN:", data);
            setUser(data);

            navigate("/home");
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
            <MainTitle>Login</MainTitle>
            <LoginBox /*className="container-login"*/>
                <Form onSubmit={formSubmitted} change={getInputs} />
            </LoginBox>
            <RegisterBox>
                <p>Don't have an account yet?</p>
                <button style={{ padding: "auto 150px" }}>
                    <Link to={"/register"} style={{ color: "white" }}>
                        Register
                    </Link>
                </button>
            </RegisterBox>
            <EasyModal />
        </>
    );
}
