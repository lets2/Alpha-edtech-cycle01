const taskContainer = document.querySelector("#task-container");
const inputEditNumber = document.querySelector("#input-editar-numero");
const inputEditText = document.querySelector("#input-editar-texto");
const buttonSave = document.querySelector(".salvar");
taskContainer.addEventListener("click", (event) => {
	console.log(event.target.parentNode.id);
	editTask(event.target.parentNode);
});

function editTask(task) {
	if (
		task.id === "tarefa-1" ||
		task.id === "tarefa-2" ||
		task.id === "tarefa-3"
	) {
		writeInInput(task);
	} else {
		console.log("Não clicou no botão de editar!");
	}
}

function writeInInput(taskDivContainer) {
	const contentNumber = taskDivContainer.childNodes[1].innerText;
	const contentTask = taskDivContainer.childNodes[3].innerText;
	inputEditNumber.value = contentNumber;
	inputEditText.value = contentTask;
}

buttonSave.addEventListener("click", (event) => {
	updateTask();
});

function updateTask() {
	console.log(inputEditNumber.value);
	console.log(inputEditText.value);
	const idStringTask = "#tarefa-" + inputEditNumber.value;
	const divTask = document.querySelector(idStringTask);
	console.log(divTask);
	updateNumber(divTask.childNodes[1]);
	updateText(divTask.childNodes[3]);
}
function updateNumber(element) {
	element.innerText = inputEditNumber.value;
	inputEditNumber.value = "";
}
function updateText(element) {
	element.innerText = inputEditText.value;
	inputEditText.value = "";
}
