//import "./Contador.css";
import { useState } from "react";

interface IProps {
    onRemove: (id: number) => void;
    id: number;
}
export default function Contador(props: IProps) {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const removeContador = () => {
        props.onRemove(props.id);
    };

    return (
        <div className="container-count">
            <p>{count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={removeContador}>remove</button>
        </div>
    );
}
