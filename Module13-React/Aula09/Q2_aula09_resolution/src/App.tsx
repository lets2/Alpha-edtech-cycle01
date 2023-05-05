import "./App.css";
import { useRef } from "react";

function App() {
    const inputRef = useRef<HTMLInputElement>(null);
    const handlerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    return (
        <>
            <input ref={inputRef} type="text" />
            <button onClick={handlerClick}>Focar</button>
        </>
    );
}

export default App;
