import "./Form.css";

export default function Form() {
    return (
        <form className="form-login">
            <input type="email" placeholder="E-mail" required />
            <input type="password" placeholder="Senha" required />
        </form>
    );
}
