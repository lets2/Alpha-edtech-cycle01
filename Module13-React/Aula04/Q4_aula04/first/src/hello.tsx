import React from "react";
import ReactDOM from "react-dom/client";

interface IUser {
    firstName: string;
}

function formatName(user: IUser): string {
    return user.firstName;
}

const user: IUser = {
    firstName: "Harper",
};

const element: JSX.Element = <h1>Olá, {formatName(user)}!</h1>;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(element);
