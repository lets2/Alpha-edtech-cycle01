const VALOR_MINIMO = 1;
const VALOR_MAXIMO = 75;
const VALOR_QUANTIDADE = 10;
const VALOR_TIME = 5000; //[ms] -> 1000ms === 1s

const botaoIniciar = document.querySelector("#iniciar");
const selecaoJogadores = document.querySelector("#jogadores");
const elementoRodada = document.querySelector("#rodada");
const imagemGlobo = document.querySelector("#gif-globo");
const containerBolaChamada = document.querySelector("#bola-chamada");
const containerCartelas = document.querySelector("#container-cartelas");
const containerResultado = document.querySelector("#resultado");
const bolasAnteriores = document.querySelectorAll(".bola-anterior");
let listaDeJogadores = [];
let rodada = 0;
let numerodeVencedores = 0;
let globo;
let idInterval;
let listaBolasAnteriores = ["", "", ""]; //guarda as tres ultimas bolas

function Cartela() {
	const minimo = VALOR_MINIMO;
	const maximo = VALOR_MAXIMO;
	const quant = VALOR_QUANTIDADE;
	let listaDeNumerosDaCartela = [];

	function init() {
		let todosOsNumeros = Array.from(
			{ length: maximo - minimo + 1 },
			(_, i) => minimo + i
		);
		todosOsNumeros.sort(() => {
			return Math.random() - 0.5;
		});
		for (let i = 0; i < quant; i++) {
			const obj = {
				numero: todosOsNumeros[i],
				foiMarcado: false,
			};
			listaDeNumerosDaCartela.push(obj);
			listaDeNumerosDaCartela.sort((objeto1, objeto2) => {
				return objeto1.numero - objeto2.numero;
			});
		}

		console.log("cartela:");
		listaDeNumerosDaCartela.forEach((element) => {
			console.log(element.numero);
		});
	}

	init();

	function listar() {
		return listaDeNumerosDaCartela.map((objeto) => objeto.numero);
	}

	function marcar(_numero) {
		const numeroSorteado = _numero;
		let indice = -1;
		listaDeNumerosDaCartela.forEach((element, indiceNumero) => {
			if (element.numero === numeroSorteado) {
				element.foiMarcado = true;
				indice = indiceNumero;
			}
		});
		return indice; //se indice = -1, numero nao está presente na cartela
	}

	function verificaVitoria() {
		const venceu = listaDeNumerosDaCartela.every((elemento) => {
			return elemento.foiMarcado === true;
		});
		return venceu;
	}

	return {
		listar: listar,
		marcar: marcar,
		verificaVitoria: verificaVitoria,
	};
}

function Sorteador(_min, _max) {
	const minimo = _min;
	const maximo = _max;
	//duvida:isso deveria ser dentro das closures e apenas declarar fora??
	let ordemDeSorteio = Array.from(
		{ length: maximo - minimo + 1 },
		(_, i) => minimo + i
	);

	ordemDeSorteio.sort(() => {
		return Math.random() - 0.5;
	});

	function sortearNumero() {
		const numeroSorteado = ordemDeSorteio[0];
		ordemDeSorteio.splice(0, 1);
		console.log("O número sorteado foi:", numeroSorteado);
		return numeroSorteado;
	}

	function verificaSeFoiSorteado(_numero) {
		const indice = ordemDeSorteio.indexOf(_numero);
		if (indice === -1) return true; //já foi sorteado
		else return false; //Ainda não foi sorteado");
	}

	return {
		sortearNumero: sortearNumero,
		verificaSeFoiSorteado: verificaSeFoiSorteado,
	};
}

botaoIniciar.addEventListener("click", () => {
	iniciar();

	idInterval = setInterval(() => {
		const numeroSorteado = globo.sortearNumero();
		renderizaNumeroNoGlobo(numeroSorteado);
		listaDeJogadores.forEach((elemento, indiceCartela) => {
			const indiceNumero = elemento.marcar(numeroSorteado);
		});
		if (rodada === VALOR_MAXIMO) {
			clearInterval(idInterval);
		}
	}, VALOR_TIME);
});

function iniciar() {
	rodada = 0;
	numerodeVencedores = 0;

	resetarConteudo();

	const numeroDeJogadores = parseInt(selecaoJogadores.value);
	instanciarCartelas(numeroDeJogadores);
	renderizarCartelas();
	globo = new Sorteador(VALOR_MINIMO, VALOR_MAXIMO);
}

function resetarConteudo() {
	elementoRodada.textContent = `00|${VALOR_MAXIMO}`;
	containerBolaChamada.textContent = "00";
	listaBolasAnteriores = ["", "", ""];
	bolasAnteriores.forEach((bola) => {
		bola.innerText = "";
	});
	containerCartelas.innerHTML = "";
	containerResultado.innerHTML = `<h2>Vencedor:</h2>`;
	containerResultado.classList.add("invisivel");
	disableCursor(false);
}

function instanciarCartelas(numeroDeJogadores) {
	listaDeJogadores = [];
	for (let i = 0; i < numeroDeJogadores; i++) {
		listaDeJogadores.push(new Cartela());
	}
}

function renderizarCartelas() {
	listaDeJogadores.forEach((cartela, indiceCartela) => {
		const divCartela = document.createElement("div");
		const containerNumerosDaTabela = document.createElement("div");
		divCartela.innerHTML = `<h2>Cartela ${indiceCartela + 1}</h2>`;
		divCartela.classList.add("cartela");
		divCartela.classList.add("flex-col-start");
		divCartela.id = "cartela" + `${indiceCartela + 1}`;

		const listaDeNumerosDaCartela = cartela.listar();

		listaDeNumerosDaCartela.forEach((numero, indiceNumero) => {
			const tagDeBotao = document.createElement("button");
			tagDeBotao.id = `${"numero" + (indiceNumero + 1)}`;
			tagDeBotao.classList.add("numero");
			tagDeBotao.textContent = numero;
			tagDeBotao.onclick = marcaNumeroNaCartela;
			containerNumerosDaTabela.appendChild(tagDeBotao);
		});
		containerNumerosDaTabela.id = "container-numero-" + (indiceCartela + 1);
		divCartela.appendChild(containerNumerosDaTabela);
		containerCartelas.appendChild(divCartela);
	});
}

//------------

function marcaNumeroNaCartela(event) {
	let stringCartelaId =
		parseInt(event.target.parentNode.id.replace("container-numero-", "")) - 1;
	let stringIndiceNumeroId =
		parseInt(event.target.id.replace("numero", "")) - 1;

	let numeroClicado = parseInt(event.target.textContent);
	const foiSorteado = globo.verificaSeFoiSorteado(numeroClicado);
	if (foiSorteado) {
		event.target.classList.add("numero-sorteado");
		console.log(listaDeJogadores[stringCartelaId].marcar(numeroClicado));
	}
	const venceu = listaDeJogadores[stringCartelaId].verificaVitoria();
	if (venceu && MarcouTodosOsNumeros(event.target.parentNode)) {
		console.log("Cartela ", stringCartelaId + 1, "venceu");
		renderizaVencedor(stringCartelaId);
		clearInterval(idInterval);
		disableCursor(true);
	}
}

function MarcouTodosOsNumeros(elementoPai) {
	for (let i = 0; i < elementoPai.childNodes.length; i++) {
		if (
			elementoPai.childNodes[i].classList.contains("numero-sorteado") == false
		) {
			console.log(
				"o elemento",
				elementoPai.childNodes[i],
				"nao tem a classe verde logo nao marcou tudo"
			);
			return false; //não marcou todos
		}
	}
	return true; //marcou todos;
}

function disableCursor(option) {
	if (option) {
		containerCartelas.style.pointerEvents = "none";
	} else {
		containerCartelas.style.pointerEvents = "auto";
	}
}

//--------------

function renderizaNumeroNoGlobo(numeroSorteado) {
	rodada++;
	elementoRodada.textContent = `${rodada
		.toString()
		.padStart(2, "0")}|${VALOR_MAXIMO}`;
	imagemGlobo.src = "./assets/globo_do_bingo_verde.PNG";
	containerBolaChamada.textContent = numeroSorteado;
	containerBolaChamada.classList.add("animation-teste");
	setTimeout(tiraAnimacao, 500);
	if (rodada > 1) {
		listaBolasAnteriores.splice(2, 1); //exclui o ultimo
		listaBolasAnteriores.unshift(numeroSorteado.toString()); //adiciona um novo no começo
	} else {
		listaBolasAnteriores[0] = numeroSorteado.toString();
	}
	bolasAnteriores.forEach((bola, indice) => {
		bola.innerText = listaBolasAnteriores[indice];
	});
}
function tiraAnimacao() {
	containerBolaChamada.classList.remove("animation-teste");
}

function renderizaVencedor(indiceCartela) {
	numerodeVencedores++;
	containerResultado.innerHTML += `<p>Cartela ${indiceCartela + 1}</p>`;
	containerResultado.classList.remove("invisivel");
	if (numerodeVencedores > 1) {
		containerResultado.innerHTML = containerResultado.innerHTML.replace(
			"Vencedor",
			"Vencedores"
		);
	}
}
