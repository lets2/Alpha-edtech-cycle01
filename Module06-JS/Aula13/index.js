const buttonNewGame = document.querySelector("#newGame");
const message = document.querySelector("#message");

const piecesOfgameBoard = document.querySelectorAll(".element");

console.log(piecesOfgameBoard);
console.log(piecesOfgameBoard[2]);

let counter = 0;
let thereIsWinner = false;
let isGameBoardFull = false;
let gameBoarderRegister = [
	["-", "-", "-"],
	["-", "-", "-"],
	["-", "-", "-"],
];

buttonNewGame.addEventListener("click", () => {
	startGameBoard();
});

startGameBoard();

function startGameBoard() {
	counter = 0;
	thereIsWinner = false;
	isGameBoardFull = false;
	gameBoarderRegister = [
		["-", "-", "-"],
		["-", "-", "-"],
		["-", "-", "-"],
	];
	resetContentInGameBoard();
	message.innerHTML = "O 'x' começa!";
	piecesOfgameBoard.forEach((element) => {
		element.classList.add("element-empty");
		element.classList.remove("background-win");
	});
}

function resetContentInGameBoard() {
	let index = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			piecesOfgameBoard[index].dataset.row = i;
			piecesOfgameBoard[index].dataset.col = j;
			piecesOfgameBoard[index].dataset.value = "-";
			piecesOfgameBoard[index].innerHTML = "";
			index++;
		}
	}
}

piecesOfgameBoard.forEach((element) => {
	element.addEventListener("click", (event) => {
		if (
			event.target.dataset.value === "-" &&
			thereIsWinner === false &&
			isGameBoardFull === false
		) {
			counter += 1;
			if (counter === 9) isGameBoardFull = true;
			fillElement(event.target);
			fillGameBoard(event.target.dataset.row, event.target.dataset.col);
			verifyIfThereIsWinner();
		}
	});
});

function fillElement(piece) {
	piece.innerHTML = counter % 2 === 1 ? drawA("x") : drawA("circle");
	piece.dataset.value = counter % 2 === 1 ? "x" : "o";
	piece.classList.remove("element-empty");
}
function fillGameBoard(row, col) {
	gameBoarderRegister[row][col] = counter % 2 === 1 ? "x" : "o";
}

function drawA(name) {
	return `<img class="symbol" src="./assets/${name}-black.svg">`;
}

function verifyIfThereIsWinner() {
	verifyRows();
	verifyColumns();
	verifyDiagonals();
	if (thereIsWinner === true) {
		message.innerHTML =
			counter % 2 === 1 ? `O jogador 'x' ganhou!` : `O jogador 'o' ganhou!`;
		desativeGameBoard();
	} else if (isGameBoardFull === false) {
		message.innerHTML =
			counter % 2 === 1 ? `É a vez do 'o' jogar!` : `É a vez do 'x' jogar!`;
	} else {
		message.innerHTML = "Empatou! Deu velha!";
	}
}

function verifyRows() {
	for (let i = 0; i < 3; i++) {
		if (
			gameBoarderRegister[i][0] === gameBoarderRegister[i][1] &&
			gameBoarderRegister[i][0] === gameBoarderRegister[i][2] &&
			gameBoarderRegister[i][0] !== "-"
		) {
			thereIsWinner = true;
			paintElements(i, 0, i, 1, i, 2);
		}
	}
}

function verifyColumns() {
	for (let j = 0; j < 3; j++) {
		if (
			gameBoarderRegister[0][j] === gameBoarderRegister[1][j] &&
			gameBoarderRegister[0][j] === gameBoarderRegister[2][j] &&
			gameBoarderRegister[0][j] !== "-"
		) {
			thereIsWinner = true;
			paintElements(0, j, 1, j, 2, j);
		}
	}
}

function verifyDiagonals() {
	if (
		gameBoarderRegister[0][0] === gameBoarderRegister[1][1] &&
		gameBoarderRegister[1][1] === gameBoarderRegister[2][2] &&
		gameBoarderRegister[0][0] !== "-"
	) {
		thereIsWinner = true;
		paintElements(0, 0, 1, 1, 2, 2);
	} else if (
		gameBoarderRegister[0][2] === gameBoarderRegister[1][1] &&
		gameBoarderRegister[1][1] === gameBoarderRegister[2][0] &&
		gameBoarderRegister[0][2] !== "-"
	) {
		thereIsWinner = true;
		paintElements(0, 2, 1, 1, 2, 0);
	}
}
function desativeGameBoard() {
	piecesOfgameBoard.forEach((element) => {
		element.classList.remove("element-empty");
	});
}

function paintElements(
	ele1_row,
	ele1_col,
	ele2_row,
	ele2_col,
	ele3_row,
	ele3_col
) {
	piecesOfgameBoard.forEach((element) => {
		if (element.dataset.row == ele1_row && element.dataset.col == ele1_col) {
			const name =
				gameBoarderRegister[ele1_row][ele1_col] == "x" ? "x" : "circle";
			element.innerHTML = `<img class="symbol" src="./assets/${name}-white.svg">`;
			element.classList.add("background-win");
		}
		if (element.dataset.row == ele2_row && element.dataset.col == ele2_col) {
			const name =
				gameBoarderRegister[ele2_row][ele2_col] == "x" ? "x" : "circle";
			element.innerHTML = `<img class="symbol" src="./assets/${name}-white.svg">`;
			element.classList.add("background-win");
		}
		if (element.dataset.row == ele3_row && element.dataset.col == ele3_col) {
			const name =
				gameBoarderRegister[ele3_row][ele3_col] == "x" ? "x" : "circle";
			element.innerHTML = `<img class="symbol" src="./assets/${name}-white.svg">`;
			element.classList.add("background-win");
		}
	});
}

const containerGameBoard = document.querySelector("#gameBoard");

containerGameBoard.addEventListener("click", (event) => {
	console.log("elemento clickado", event.target);
});
