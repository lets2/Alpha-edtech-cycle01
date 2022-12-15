const bombContainer = document.querySelector("#bomb-container");
const startButton = document.querySelector("#btn-start-game");

const audioExplosion = new Audio("./assets/sounds/bomb-explosion.mp3");
audioExplosion.load();

let idTime; //get id from setTimeout

startButton.addEventListener("click", () => {
	activateBomb();
	idTime = setTimeout(() => {
		explosion();
	}, 10000);
});

function activateBomb() {
	console.log("The Game began!");
	bombContainer.innerHTML = `<img src="./assets/img/bomb-07-gif-on.gif" alt="image of a bomb on" />`;
	startButton.style.visibility = "hidden";
}

function explosion() {
	console.log("Boooomm!");
	audioExplosion.play();
	bombContainer.innerHTML = `<img src="./assets/img/bomb-04-explosion.png" alt="image of a explosion" />`;
	startButton.textContent = "New game";
	startButton.style.visibility = "visible";
}

bombContainer.addEventListener("click", () => {
	clearTimeout(idTime);
	console.log("Bomba apagada!");
	bombContainer.innerHTML = `<img src="./assets/img/bomb-03-deactivated.png" alt="image of a bomb deactivated" />`;
	startButton.textContent = "New game";
	startButton.style.visibility = "visible";
});
