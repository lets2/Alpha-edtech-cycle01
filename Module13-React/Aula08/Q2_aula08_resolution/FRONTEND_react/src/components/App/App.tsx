import { useState } from "react";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import { UserContext } from "../Context/UserContext";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpPage from "../SignUpPage/SignUpPage";
import UpdatePage from "../UpdatePage/UpdatePage";

export default function App() {
    const router = createBrowserRouter([
        { path: "/", element: <LoginPage change={changePage} /> },
        { path: "/home", element: <HomePage /> },
        { path: "/register", element: <SignUpPage change={changePage} /> },
        { path: "/update", element: <UpdatePage /> },
    ]);

    const [showLogin, setShowLogin] = useState(true);
    const [user, setUser] = useState(null);
    function changePage() {
        setShowLogin(!showLogin);
    }

    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                <RouterProvider router={router} />
            </UserContext.Provider>
        </>
    );
}
