const buttonGetCards = document.querySelector("#get-cards");
const messageError = document.querySelector("#message-error");
const containerResult = document.querySelector("#container-result");
const bodyTag = document.querySelector("body");
const ERROR_SHUFFLE = "[error] Unable to obtain deck from API";
const ERROR_DRAW = "[error] Unable to draw cards";

buttonGetCards.addEventListener("click", async () => {
	try {
		clearRenderedContent();
		const deckId = await shuffleDeck();
		const isOkay = await drawCards(deckId);
		console.log(isOkay);
	} catch (error) {
		messageError.innerHTML = error.message;
	}
});

function clearRenderedContent() {
	containerResult.innerHTML = "";
	messageError.innerHTML = "";
}

async function shuffleDeck() {
	const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
	const jsonData = await getDataFromApi(url, ERROR_SHUFFLE);

	return jsonData.deck_id; //async function return a promise resolved
}

async function drawCards(deckId) {
	const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;

	for (let i = 0; i < 5; i++) {
		const jsonData = await getDataFromApi(url, ERROR_DRAW);
		const objCard = jsonData.cards[0];
		renderCard(objCard.image);
	}
	return true;
}

async function getDataFromApi(url, error) {
	disableCursor(true);
	const response = await fetch(url);
	if (response.status !== 200) {
		disableCursor(false);
		return Promise.reject(new Error(error)); // throw "[erro] reason"//
	}
	const jsonData = await response.json();
	disableCursor(false);
	return jsonData;
}

function renderCard(src) {
	containerResult.innerHTML += `<img src="${src}">`;
}

function disableCursor(option) {
	if (option) {
		buttonGetCards.disabled = true;
		bodyTag.style.cursor = "wait";
		buttonGetCards.classList.add("buttonDisabled");
	} else {
		buttonGetCards.disabled = false;
		bodyTag.style.cursor = "auto";
		buttonGetCards.classList.remove("buttonDisabled");
	}
}
