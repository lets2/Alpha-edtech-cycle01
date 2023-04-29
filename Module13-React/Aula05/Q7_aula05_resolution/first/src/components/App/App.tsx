import { useState } from "react";
import Homepage from "../Homepage/Homepage";
import LoginPage from "../LoginPage/LoginPage";

export default function App() {
    const [showLogin, setShowLogin] = useState(true);

    function changePage() {
        setShowLogin(!showLogin);
    }

    return <>{showLogin ? <LoginPage change={changePage} /> : <Homepage />}</>;
}
