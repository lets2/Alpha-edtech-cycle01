const bombContainer = document.querySelector("#bomb-container");
const startButton = document.querySelector("#btn-start-game");
const timeCountdown = document.querySelector("#time-countdown");

const audioExplosion = new Audio("./assets/sounds/bomb-explosion.mp3");
const audioTick = new Audio("./assets/sounds/ticking-clock-one-sec.mp3");
audioExplosion.load();
audioTick.load();

let idTime; //get id from setInterval
let bombIsActivated = false;
let counter = 60;

startButton.addEventListener("click", () => {
	if (bombIsActivated === false) {
		activateBomb();
		startCountdown();
		idTime = setInterval(verifyTime, 1000);
	}
});

function activateBomb() {
	bombIsActivated = true;
	hideButton();
	changeImageBomb("bomb-07-gif-on.gif", "image of a bomb on");
}

function startCountdown() {
	timeCountdown.textContent = "60";
	counter = 60;
}

function verifyTime() {
	counter--;
	timeCountdown.textContent = `${counter.toString().padStart(2, "0")}`;
	if (counter === 0) {
		clearInterval(idTime);
		audioExplosion.play();
		changeImageBomb("bomb-04-explosion.png", "image of a explosion");
		showButton();
		bombIsActivated = false;
		counter = 60;
	} else {
		audioTick.play();
	}
}

bombContainer.addEventListener("click", () => {
	clearInterval(idTime);
	bombIsActivated = false;
	console.log("Bomba parada!");
	changeImageBomb("bomb-03-deactivated.png", "image of a bomb deactivated");
	showButton();
});

function hideButton() {
	startButton.style.visibility = "hidden";
}
function showButton() {
	startButton.textContent = "New game";
	startButton.style.visibility = "visible";
}

function changeImageBomb(file, alt) {
	bombContainer.innerHTML = `<img src="./assets/img/${file}" alt=${alt} />`;
}
