//VARIAVEIS e CONSTANTES GLOBAIS - DESCRICAO:
let listaDeProdutos = [];
// cada elemento de produto será um objeto no formato:
//{id:"",nome:"",descricao:"",valor:"","incluidoEm"}
let produtoApagado = {};
//armazena as informações do produto que será/foi apagado
let produtoEditado = {};
//armazena as informações do produto que será/foi editado
let indiceElement = -1;
let countId = 0;
//contador que corresponde ao id
//sempre incrementa de 1 em 1, garantindo a unicidade
//de cada identificador
const inputNome = document.querySelector("#inputNomeProduto");
const inputDescricao = document.querySelector("#inputDescricaoProduto");
const inputValor = document.querySelector("#inputValorProduto");
const botaoIncluirProduto = document.querySelector("#incluirBotao");
const botaoListarProdutos = document.querySelector("#listarBotao");
const botaoConfirmaEdicao = document.querySelector("#atualizarBotao"); //
const botaoCancelaEdicao = document.querySelector("#cancelarBotao");
const containerTabela = document.querySelector(".lista-produtos");
const dadosDoProdutoClicado = document.querySelector("#produto-clicado");
const mensagemErro = document.querySelector("#mensagem-erro");

//FUNCÕES

botaoIncluirProduto.addEventListener("click", () => {
	try {
		produtoEhValido();
		adicionaProdutoNoArray();
	} catch (error) {
		console.log("Mensagem de erro");
		mensagemErro.innerHTML = `Falha no cadastro do produto! ${error}`;
		mensagemErro.style.visibility = "visible";
		mensagemErro.style.color = "red";
		//mensagemErro.setAttribute("display", "visible");
	}
});
//verificar produto e emitir mensagem de falha se não for válido
function produtoEhValido() {
	mensagemErro.innerHTML = "";
	if (inputNome.value === "") {
		throw "[Erro] Nome está vazio!";
	}
	if (inputDescricao.value === "") {
		throw "[Erro] Descrição está vazia!";
	}
	if (inputValor.value === "") {
		throw "[Erro] Valor está vazio!";
	}
	if (produtoEhRepetido(inputNome.value)) {
		throw "[Erro] Produto já existe!";
	}
}
//Alterado na aula 11 - usando FOR OF em vez de while
function produtoEhRepetido(nome) {
	let i = 0;

	for (let produto of listaDeProdutos) {
		if (produto.nome === nome) {
			return true;
		}
	}
	return false;
}

function adicionaProdutoNoArray() {
	dadosDoProdutoClicado.innerHTML = ""; //
	let produto = {};
	countId = countId + 1;
	//{id:"",nome:"",descricao:"",valor:"","incluidoEm"}
	produto.id = countId;
	produto.nome = inputNome.value;
	produto.descricao = inputDescricao.value;
	produto.valor = inputValor.value;
	const currentDate = new Date();
	currentDate.setHours(currentDate.getHours() - 3);
	produto.incluidoEm = currentDate.toISOString();
	listaDeProdutos.push(produto);
	mensagemErro.innerHTML = `Produto ${produto.nome} incluído com sucesso!`;
	mensagemErro.style.visibility = "visible";
	mensagemErro.style.color = "green";
	//mensagemErro.setAttribute("visibility", "visible");
}

botaoListarProdutos.addEventListener("click", () => {
	mostraProdutos(listaDeProdutos);
});

botaoConfirmaEdicao.addEventListener("click", () => {
	editaProduto();
	escondeBotaoComId(botaoConfirmaEdicao);
	escondeBotaoComId(botaoCancelaEdicao);
	mostraBotaoComId(botaoIncluirProduto);
	mostraBotaoComId(botaoListarProdutos);
	mostraProdutos(listaDeProdutos);
});

botaoCancelaEdicao.addEventListener("click", () => {
	escondeBotaoComId(botaoConfirmaEdicao);
	escondeBotaoComId(botaoCancelaEdicao);
	mostraBotaoComId(botaoIncluirProduto);
	mostraBotaoComId(botaoListarProdutos);
	//mostraProdutos();
});

containerTabela.addEventListener("click", (event) => {
	const element = event.target.parentNode;

	if (element.classList.contains("editar-produto")) {
		//console.log(element.parentNode);
		const idElement = parseInt(element.parentNode.childNodes[1].textContent);
		indiceElement = achaIndiceDoProduto(idElement);
		produtoEditado = listaDeProdutos[indiceElement];
		mostraDadosDoProduto(produtoEditado);
		//console.log(element.parentNode.childNodes[1].textContent);
		escondeBotaoComId(botaoIncluirProduto);
		escondeBotaoComId(botaoListarProdutos);
		mostraBotaoComId(botaoConfirmaEdicao);
		mostraBotaoComId(botaoCancelaEdicao);
	} else if (element.classList.contains("apagar-produto")) {
		//console.log(element.parentNode);
		//console.log(element.parentNode.childNodes[1].textContent);
		const idElement = parseInt(element.parentNode.childNodes[1].textContent);
		apagaProduto(idElement);
		mostraProdutos(listaDeProdutos);
	} else if (element.childNodes[3].classList.contains("nome-produto")) {
		//console.log("Mostra produto!!");
		const idElement = parseInt(element.childNodes[1].textContent);
		//console.log("O ID DESSE ELEMENTO EH:", idElement);
		indiceElement = achaIndiceDoProduto(idElement);
		mostraProdutoSelecionado(indiceElement);
	} else if (event.target.textContent === "Produto") {
		console.log("Clicou no titulo Produto!");
		mostraEmOrdemAlfabetica(pesquisaChavePesquisa());
	} else if (event.target.textContent === "Valor") {
		console.log("clicou no titulo Valor");
		mostraEmOrdemPreco(pesquisaChavePesquisa());
	}
});

const tabelaDeProdutos = document.querySelector(".tabela-produtos");

function mostraProdutos(parametroListaDeProdutos) {
	dadosDoProdutoClicado.innerHTML = ""; //
	tabelaDeProdutos.innerHTML = `
	<tr class="linha-tabela table-heading">
						<td class="id-produto">ID</td>
						<td class="titulo-produto">Produto</td>
						<td class="titulo-valor">Valor</td>
						<td class="editar-produto">Editar</td>
						<td class="apagar-produto">Apagar</td>
					</tr>
					`;

	let indice = 0;
	while (indice < parametroListaDeProdutos.length) {
		const tr = document.createElement("tr");
		tr.innerHTML = `
						<td class="id-produto">${parametroListaDeProdutos[indice].id}</td>
						<td class="nome-produto">${parametroListaDeProdutos[indice].nome}</td>
						<td class="valor-produto">R$ ${padronizaValorParaReais(
							parametroListaDeProdutos[indice].valor
						)}</td>
						<td class="editar-produto">
							<img src="./assets/edit.png" alt="Ícone de editar produto" />
						</td>
						<td class="apagar-produto">
							<img src="./assets/delete.png" alt="Ícone de apagar produto" />
						</td>
		`;
		tr.classList.add("linha-tabela");
		tabelaDeProdutos.appendChild(tr);

		indice++;
	}
}
//function armazenaTargetNaVariavel(target, produto) {}

function mostraDadosDoProduto(produto) {
	inputNome.value = `${produto.nome}`;
	inputDescricao.value = `${produto.descricao}`;
	inputValor.value = `${produto.valor}`;
}
//{id:"",nome:"",descricao:"",valor:"","incluidoEm"}
function editaProduto() {
	listaDeProdutos[indiceElement].nome = inputNome.value;
	listaDeProdutos[indiceElement].descricao = inputDescricao.value;
	listaDeProdutos[indiceElement].valor = inputValor.value;
	const currentDate = new Date();
	listaDeProdutos[indiceElement].incluidoEm = currentDate.toISOString();

	mensagemErro.innerHTML = `Produto ${listaDeProdutos[indiceElement].nome} atualizado com sucesso!`;
	mensagemErro.style.visibility = "visible";
	mensagemErro.style.color = "green";
}
function escondeBotaoComId(botao) {
	botao.classList.add("display-none");
}
function mostraBotaoComId(botao) {
	botao.classList.remove("display-none");
}

function achaIndiceDoProduto(idElement) {
	for (let indice = 0; indice < listaDeProdutos.length; indice++) {
		if (idElement === listaDeProdutos[indice].id) {
			//console.log("Precisa mexer no elemento", listaDeProdutos[indice]);
			return indice; //depois que eliminar o elemento, para o laço
		}
	}
}

function apagaProduto(idElement) {
	for (let indice = 0; indice < listaDeProdutos.length; indice++) {
		//console.log("dElement = ",idElement,"id do objeto=",listaDeProdutos[indice].id);
		if (idElement === listaDeProdutos[indice].id) {
			produtoApagado = listaDeProdutos[indice];
			listaDeProdutos.splice(indice, 1);
			return; //depois que eliminar o elemento, para o laço
		}
	}
}

function mostraProdutoSelecionado(indiceElement) {
	const stringData = passaDataParaFormatoPadrao(
		listaDeProdutos[indiceElement].incluidoEm
	);
	dadosDoProdutoClicado.innerHTML = `
	<p>Id: ${listaDeProdutos[indiceElement].id}</p>
	<h3>Nome: ${listaDeProdutos[indiceElement].nome}</h3>
	<p>Descrição: ${listaDeProdutos[indiceElement].descricao}</p>
	<h4>Valor: R$ ${padronizaValorParaReais(
		listaDeProdutos[indiceElement].valor
	)}</h4>
	<p>Incluído em: ${stringData}</p>
	`;
}

function padronizaValorParaReais(valor) {
	const real = parseFloat(valor).toFixed(2);
	return real;
}

function passaDataParaFormatoPadrao(data) {
	const stringD =
		data.substr(8, 2) +
		"/" +
		data.substr(5, 2) +
		"/" +
		data.substr(0, 4) +
		" – " +
		data.substr(11, 8);
	return stringD;
}
//dd/mm/aaaa – HH:MM:SS

//ALTERAÇÕES DA AULA 11
function mostraEmOrdemAlfabetica(arrayProdutos) {
	let copiaListaDeProdutos = [...arrayProdutos]; //operador de espalhamento, spread operator/cópia superficial
	copiaListaDeProdutos.sort(comparaAtributoNomeDoisObjetos);
	mostraProdutos(copiaListaDeProdutos);
}

function mostraEmOrdemPreco(arrayProdutos) {
	let copiaListaDeProdutos = [...arrayProdutos]; //operador de espalhamento, spread operator/cópia superficial
	copiaListaDeProdutos.sort(comparaAtributoValorDoisObjetos);
	mostraProdutos(copiaListaDeProdutos);
}

function comparaAtributoNomeDoisObjetos(objeto1, objeto2) {
	if (objeto1.nome.toLowerCase() < objeto2.nome.toLowerCase()) {
		return -1;
	} else if (objeto1.nome.toLowerCase() > objeto2.nome.toLowerCase()) {
		return 1;
	} else {
		return 0;
	}
}

function comparaAtributoValorDoisObjetos(objeto1, objeto2) {
	if (Number(objeto1.valor) < Number(objeto2.valor)) {
		return -1;
	} else if (Number(objeto1.valor) > Number(objeto2.valor)) {
		return 1;
	} else {
		return 0;
	}
}

// AULA 11 LETRA C
const botaoPesquisar = document.querySelector("#botao-pesquisa");
const inputPesquisar = document.querySelector("#input-pesquisa");
const mensagemResultadoPesquisa = document.querySelector("#resultado-pesquisa");
botaoPesquisar.addEventListener("click", () => {
	const stringChavePesquisa = inputPesquisar.value;
	if (stringChavePesquisa == "") {
		mostraProdutos(listaDeProdutos); //mostre todos os produtos
		//return listaDeProdutos;
	} else {
		const listaFiltrada = pesquisaChavePesquisa();
		//console.log("Usar comando de filtro para filtrar!");
		//const arrayFiltrado = filtraArray(stringChavePesquisa);

		if (listaFiltrada.length !== 0) {
			mensagemResultadoPesquisa.innerHTML = `Foram encontrado(s) ${listaFiltrada.length}`;
			mostraProdutos(listaFiltrada);
		} else {
			mensagemResultadoPesquisa.innerHTML = `Não foram encontrados produtos conforme a chave de pesquisa`;
			dadosDoProdutoClicado.innerHTML = ""; //
			tabelaDeProdutos.innerHTML = "";
		}
	}
});

function pesquisaChavePesquisa() {
	const stringChavePesquisa = inputPesquisar.value;
	console.log("string", stringChavePesquisa);
	if (stringChavePesquisa == "") {
		//mostraProdutos(listaDeProdutos); //mostre todos os produtos
		return listaDeProdutos;
	} else {
		console.log("Usar comando de filtro para filtrar!");
		const arrayFiltrado = filtraArray(stringChavePesquisa);
		return arrayFiltrado;
	}
}

function filtraArray(chave) {
	const novoArray = listaDeProdutos.filter(
		(objeto) =>
			objeto.nome.indexOf(chave) !== -1 ||
			objeto.descricao.indexOf(chave) !== -1
	);
	console.log("Novoarray:", novoArray);
	return novoArray;
}
