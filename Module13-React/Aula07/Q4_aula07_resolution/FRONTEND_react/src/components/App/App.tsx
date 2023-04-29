import { useState } from "react";
import Homepage from "../Homepage/Homepage";
import LoginPage from "../LoginPage/LoginPage";
import { UserContext } from "../Context/UserContext";

export default function App() {
    const [showLogin, setShowLogin] = useState(true);
    const [user, setUser] = useState(null);
    function changePage() {
        setShowLogin(!showLogin);
    }

    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                {showLogin ? <LoginPage change={changePage} /> : <Homepage />}
            </UserContext.Provider>
        </>
    );
}
