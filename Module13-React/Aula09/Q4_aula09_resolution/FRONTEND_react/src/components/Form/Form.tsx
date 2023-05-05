import React from "react";
//import "./Form.css";
import { Button } from "@mui/material";
import styled from "styled-components";

interface IFormProps {
    onSubmit: () => void;
    change: React.ChangeEventHandler<HTMLInputElement>;
}

const FormBox = styled.form`
    min-width: 300px;
    margin: 10px auto;
    border-radius: 10px;
    padding: 20px;
    background-color: blue;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
        background-color: #d34917;
        color: white;
        transition: 0.2s;
    }
    button:hover {
        background-color: #d34917;
        box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
    }
`;

const InputField = styled.input`
    margin: 10px 0px;
    padding: 5px 5px;
`;

export default function Form(props: IFormProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit();
    };

    return (
        <FormBox /*className="form-login"*/ onSubmit={handleSubmit}>
            <InputField
                type="email"
                placeholder="E-mail"
                name="email"
                required
                onChange={props.change}
            />
            <InputField
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={props.change}
            />
            <button
                type="submit"
                style={{
                    marginTop: "10px",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                }}
            >
                Send
            </button>
        </FormBox>
    );
}
