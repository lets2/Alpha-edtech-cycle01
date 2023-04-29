import { createContext } from "react";
import React from "react";

interface IUserLogged {
    id: string;
    email: string;
}

interface IAppState {
    user: IUserLogged | null;
    setUser: React.Dispatch<React.SetStateAction<null>>;
}
/*
export const UserContext = createContext<IAppState>({
    user: "",
    setUser: () => {},
});

*/
export const UserContext = createContext<IAppState>({
    user: { id: "", email: "" },
    setUser: () => {},
});
