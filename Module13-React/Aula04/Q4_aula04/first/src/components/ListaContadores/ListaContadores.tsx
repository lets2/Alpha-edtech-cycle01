import { useState } from "react";
import Contador from "../Contador/Contador";

export default function ListaContadores() {
    const [list, setList] = useState([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ]);

    const removeItem = (id: number) => {
        setList(list.filter((item) => item.id !== id));
    };

    return (
        <>
            <ul>
                {list.map((item) => (
                    <li key={item.id}>
                        cont n.{item.id}
                        <Contador onRemove={removeItem} id={item.id} />
                    </li>
                ))}
            </ul>
        </>
    );
}
