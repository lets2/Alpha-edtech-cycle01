const VALOR_MINIMO = 1;
const VALOR_MAXIMO = 12;
const VALOR_QUANTIDADE = 6;
const VALOR_TIME = 2000; //[ms] -> 1000ms === 1s

const botaoIniciar = document.querySelector("#iniciar");
const selecaoJogadores = document.querySelector("#jogadores");
const elementoRodada = document.querySelector("#rodada");
const imagemGlobo = document.querySelector("#gif-globo");
const containerBolaChamada = document.querySelector("#bola-chamada");
const containerCartelas = document.querySelector("#container-cartelas");
const containerResultado = document.querySelector("#resultado");

let listaDeJogadores = [];
let rodada = 0;
let numerodeVencedores = 0;
let globo;
let idInterval;

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
		if (indice === -1) console.log("O numero", _numero, "já foi sorteado");
		else console.log("Ainda não foi sorteado");
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

			if (indiceNumero !== -1) {
				renderizaNumeroMarcado(indiceCartela, indiceNumero);
			}
			if (elemento.verificaVitoria()) {
				console.log("Cartela ", indiceCartela + 1, "venceu");
				renderizaVencedor(indiceCartela);
				clearInterval(idInterval);
			}
		});
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
	containerCartelas.innerHTML = "";
	containerResultado.innerHTML = `<h2>Vencedor:</h2>`;
	containerResultado.classList.add("invisivel");
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
			containerNumerosDaTabela.innerHTML += `<button id=${
				"numero" + (indiceNumero + 1)
			} class="numero">${numero}</button>`;
		});
		containerNumerosDaTabela.id = "container-numero-" + (indiceCartela + 1);
		divCartela.appendChild(containerNumerosDaTabela);
		containerCartelas.appendChild(divCartela);
	});
}

function renderizaNumeroNoGlobo(numeroSorteado) {
	rodada++;
	elementoRodada.textContent = `${rodada
		.toString()
		.padStart(2, "0")}|${VALOR_MAXIMO}`;
	imagemGlobo.src = "./assets/globo_do_bingo_verde.PNG";
	containerBolaChamada.textContent = numeroSorteado;
	containerBolaChamada.classList.add("animation-teste");
	setTimeout(tiraAnimacao, 500);
}
function tiraAnimacao() {
	containerBolaChamada.classList.remove("animation-teste");
}

function renderizaNumeroMarcado(indiceCartela, indiceNumero) {
	const idCartela = "#container-numero-" + (indiceCartela + 1);
	const idNumero = ":scope > #numero" + (indiceNumero + 1);
	const elementoPai = document.querySelector(idCartela);
	const elementoFilho = elementoPai.querySelector(idNumero);
	elementoFilho.classList.add("numero-sorteado");
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
