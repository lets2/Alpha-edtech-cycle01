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
`;

const InputField = styled.input`
    margin: 10px 0px;
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
                placeholder="Senha"
                name="password"
                required
                onChange={props.change}
            />
            <Button variant="contained" color="secondary" type="submit">
                Enviar
            </Button>
        </FormBox>
    );
}
