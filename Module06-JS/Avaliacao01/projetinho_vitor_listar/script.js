function escreve() {
	// passo 1: pegar os objetos input e select, e div
	const divObj = document.getElementById("container");
	const inputObj = document.getElementById("input-texto");
	const selectObj = document.getElementById("seletor");

	// passo 2: ler o valor do input e decidir entre h1/h2/p (baseado no select)
	const texto = inputObj.value; // banana
	const tipo = selectObj.value; // "header1" "header2" "paragrafo"

	let conteudoCompleto = "";
	if (tipo === "header1") {
		conteudoCompleto = "<h1>" + texto + "</h1>"; // <h1>banana</h1>
	} else if (tipo === "header2") {
		conteudoCompleto = "<h2>" + texto + "</h2>"; // <h2>banana</h2>
	} else {
		conteudoCompleto = "<p>" + texto + "</p>"; // <p>banana</p>
	}

	// passo 3: escrever no div
	divObj.innerHTML += conteudoCompleto;
}

//variaveis globais
const containerConteudo = document.querySelector("#container");
const inputRepeticao = document.querySelector("#input-repeticao");
const inputTexto = document.querySelector("#input-texto");

function listar() {
	let numeroDeRepeticoes = parseInt(inputRepeticao.value);
	let contador = 1;
	const ulTag = document.createElement("ul");
	//armazena os elementos da lista no elemento UL
	while (contador <= numeroDeRepeticoes) {
		ulTag.innerHTML = ulTag.innerHTML + `<li>${inputTexto.value}</li>`;
		contador = contador + 1;
	}
	// poe o elemento UL dentro do container
	containerConteudo.appendChild(ulTag);
}
