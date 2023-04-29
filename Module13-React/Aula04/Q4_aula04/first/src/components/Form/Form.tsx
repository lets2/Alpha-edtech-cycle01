import "./Form.css";

interface IFormProps {
    onSubmit: () => void;
}

export default function Form(props: IFormProps) {
    return (
        <form className="form-login">
            <input type="email" placeholder="E-mail" required />
            <input type="password" placeholder="Senha" required />
            <button onClick={props.onSubmit}>Enviar</button>
        </form>
    );
}
