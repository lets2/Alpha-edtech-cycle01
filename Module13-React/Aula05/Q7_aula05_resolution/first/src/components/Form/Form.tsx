import React from "react";
import "./Form.css";

interface IFormProps {
    onSubmit: () => void;
    change: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Form(props: IFormProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit();
    };

    return (
        <form className="form-login" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="E-mail"
                name="email"
                required
                onChange={props.change}
            />
            <input
                type="password"
                placeholder="Senha"
                name="password"
                required
                onChange={props.change}
            />
            <button type="submit">Enviar</button>
        </form>
    );
}
