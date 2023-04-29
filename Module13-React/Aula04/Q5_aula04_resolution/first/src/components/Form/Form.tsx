import "./Form.css";

interface IFormProps {
    onSubmit: () => void;
}

export default function Form(props: IFormProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit();
    };

    return (
        <form className="form-login" onSubmit={handleSubmit}>
            <input type="email" placeholder="E-mail" required />
            <input type="password" placeholder="Senha" required />
            <button type="submit">Enviar</button>
        </form>
    );
}
