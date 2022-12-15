const inputCep = document.querySelector("#cep");
const buttonConsult = document.querySelector("#check-cep");
const messageError = document.querySelector("#message-error");
const bodyTag = document.querySelector("body");
inputCep.addEventListener("input", (event) => {
	let position = event.target.selectionStart;
	const newValueCep = inputCep.value.replace(/[^0-9]/g, "");

	if (newValueCep.length <= 5) inputCep.value = newValueCep;
	else {
		inputCep.value = newValueCep.slice(0, 5) + "-" + newValueCep.slice(5, 8);
		if (newValueCep.length >= 6 && position == 6) position++;
	}

	event.target.selectionEnd = position;
});

buttonConsult.addEventListener("click", () => {
	try {
		clearResults();
		verifyCep();
		changeCursor("wait");
		consultCepApi();
	} catch (error) {
		messageError.innerHTML = error;
	}
});

function verifyCep() {
	const cepOnlyNumber = inputCep.value.replace(/-/g, "");
	if (cepOnlyNumber.length !== 8) {
		throw "[erro] Cep inválido! Por favor, verifique!";
	} else {
		messageError.innerHTML = "";
	}
}

function clearResults() {
	containerIframe.innerHTML = "";
	containerResult.innerHTML = "";
	containerResult.classList.add("hidden");
}

function consultCepApi() {
	const cepOnlyNumber = inputCep.value.replace(/-/g, "");
	console.log("ceponly=", cepOnlyNumber);
	fetch(`https://cep.awesomeapi.com.br/json/${cepOnlyNumber}`)
		.then((response) => {
			changeCursor("pointer");
			if (response.status === 200) {
				return response.json();
			}
			if (response.status === 400) {
				throw "[erro/400] Cep inválido!";
			}
			if (response.status === 404) {
				throw "[erro/404] Cep não encontrado!";
			}
			// mostrar mensagem de erro
		})
		.then((json) => {
			console.log(json);
			writeDataOnScreen(json);
		})
		.catch((error) => {
			changeCursor("pointer");
			messageError.innerHTML = error;
		});
}
const containerResult = document.querySelector("#container-result");
function writeDataOnScreen(objCep) {
	containerResult.classList.remove("hidden");
	containerResult.innerHTML = `
				<div>
					<h3>Endereço: <span>${objCep.address}</span></h3>
					<h3>Bairro: <span>${objCep.district}</span></h3>
					<h3>Cidade: <span>${objCep.city}</span></h3>
					<h3>Estado: <span>${objCep.state}</span></h3>
					<h3>Latitude: <span id="latitude">${objCep.lat}</span></h3>
					<h3>Longitude: <span id="longitude">${objCep.lng}</span></h3>
				</div>
				<button id="showMap">Exibir mapa</button>`;
	const buttonShowMap = document.querySelector("#showMap");
	buttonShowMap.addEventListener("click", showMap);
}
const containerIframe = document.querySelector("#container-iframe");
function showMap() {
	const latitude = document.querySelector("#latitude").textContent;
	const longitude = document.querySelector("#longitude").textContent;
	console.log("PRECISA MOSTRAR O MAPA!!!!");
	/* fetch(
		`https://maps.google.com/maps?q=${latitude},${longitude}&hl=pt&z=14&output=embed`
	).then((response) => {
		console.log("response!!", response);
	}); */

	containerIframe.innerHTML = `<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&hl=pt&z=14&output=embed" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
	/* containerIframe.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1974.122969165719!2d-35.9715935983885!3d-8.278303525174515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1669908858965!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`; */
}
console.log("wait", "pointer");
function changeCursor(itemToPut) {
	if (itemToPut === "wait") {
		bodyTag.classList.remove("cursor-auto");
		bodyTag.classList.add("cursor-wait");
		buttonConsult.style.pointerEvents = "none";
		buttonConsult.classList.add("cursor-wait");
		buttonConsult.classList.remove("cursor-pointer");

		setTimeout(() => {
			bodyTag.classList.add("cursor-auto");
			bodyTag.classList.remove("cursor-wait");
			buttonConsult.style.pointerEvents = "auto";
			buttonConsult.classList.add("cursor-pointer");
			buttonConsult.classList.remove("cursor-wait");
		}, 500);
	}
}
