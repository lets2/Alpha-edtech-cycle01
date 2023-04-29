/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

interface IUser {
    firstName: string;
    lastName: string;
    birthDate: Date;
}

function formatName(user: IUser): string {
    return user.firstName + " " + user.lastName;
}
function calculateAge(birthDate: Date) {
    const now: Date = new Date(); //
    const age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && now.getDate() < birthDate.getDate())
    ) {
        return age - 1;
    }
    return age;
}
const user: IUser = {
    firstName: "Harper",
    lastName: "Silva",
    birthDate: new Date(2004, 0, 25), //mês é de 0 a 11
};

const element: JSX.Element = (
    <h1>
        Olá, meu nome é {formatName(user)}, tenho {calculateAge(user.birthDate)}{" "}
        anos e este é meu primeiro contato com JSX.
    </h1>
);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(element);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

console.log(element);
