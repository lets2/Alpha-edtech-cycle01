import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./components/LoginPage/LoginPage";

//const loginElement: JSX.Element = LoginPage();
//const modalElement: JSX.Element = Modal();

const page: JSX.Element = (
    <>
        <LoginPage />
        {/* <Modal />*/}
    </>
);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(page);

//test

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ORIGINAL INDEX.TSX CONTENT
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