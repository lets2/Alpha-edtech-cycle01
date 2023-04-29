import React from "react";

interface IProduct {
    id: number;
    name: string;
    price: number;
}

function App() {
    const cart: Array<IProduct> = [
        { id: 12345, name: "sorvete", price: 2 },
        { id: 54321, name: "colher", price: 1 },
        { id: 20113, name: "sabonete", price: 3 },
        { id: 1214, name: "creme dental", price: 10 },
        { id: 55543, name: "espelho", price: 15 },
        { id: 112, name: "torneira", price: 5 },
    ];
    const balance: number = 30;
    //seu código daqui para baixo

    const totalPrice: number = cart.reduce((accumulator, item) => {
        return accumulator + item.price;
    }, 0);

    function removeProduct(itemId: number) {
        alert(`O produto com id ${itemId} foi removido!`);
    }

    return (
        <>
            <h1>Meu carrinho</h1>
            {totalPrice > balance ? <p>Saldo insuficiente!</p> : <p></p>}
            <ul>
                {cart.map((item) => (
                    <li>
                        {item.name}
                        <button onClick={() => removeProduct(item.id)}>
                            remover
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );

    //seu código daqui para cima
}

export default App;

/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
