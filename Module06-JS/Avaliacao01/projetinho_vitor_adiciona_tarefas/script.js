function clicouEditar(numero) {
	// passo 1: pegar o número da tarefa e seu texto
	const id = "#tarefa-" + numero;
	const divDescricao = document.querySelector(id + " .descricao"); // exemplo: "#tarefa1 .descricao"
	const texto = divDescricao.textContent;

	// passo 2: pegar os inputs do formulário de edição
	const inputEditarNumero = document.getElementById("input-editar-numero");
	const inputEditarTexto = document.getElementById("input-editar-texto");

	// passo 3: preencher o formulário
	inputEditarNumero.value = numero;
	inputEditarTexto.value = texto;
}

function clicouSalvar() {
	// passo 1: pegar os valores escritos no formulário de edição
	const inputEditarNumero = document.getElementById("input-editar-numero");
	const inputEditarTexto = document.getElementById("input-editar-texto");

	const numero = inputEditarNumero.value;
	const texto = inputEditarTexto.value;

	// passo 2: encontrar o div da tarefa correta
	const id = "#tarefa-" + numero;
	const divDescricao = document.querySelector(id + " .descricao"); // exemplo: "#tarefa1 .descricao"

	// passo 3: trocar o texto dessa div, depois limpar o formulário
	divDescricao.textContent = texto;
	inputEditarNumero.value = "";
	inputEditarTexto.value = "";
}
let contador = 3; //starts with 3 tasks
const inputAdicionarTexto = document.querySelector("#input-adicionar-texto");
function clicouAdicionar() {
	try {
		if (inputAdicionarTexto.value === "") {
			throw "[ERROR] New task is empty";
		}
		if (inputAdicionarTexto.value.length < 4) {
			throw "[ERROR] New task needs at least 4 character";
		}
		adicionaTarefa();
	} catch (error) {
		console.log(error);
	}
}
const tarefasContainer = document.querySelector("#tarefas-container");
function adicionaTarefa() {
	contador = contador + 1;
	tarefasContainer.innerHTML =
		tarefasContainer.innerHTML +
		`<div class="tarefa clearfix" id="tarefa-${contador.toString()}">
			<p class="float-left padding-5">${contador}</p>
			<p class="descricao float-left">${inputAdicionarTexto.value}</p>
			<button onclick="clicouEditar(${contador.toString()})" class="float-right editar">
				Editar
			</button>
		</div>
		`;
	inputAdicionarTexto.value = "";
}
