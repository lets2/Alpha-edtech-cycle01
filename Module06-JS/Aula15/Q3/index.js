const selectMinutes = document.querySelector("#minutes");
const selectSeconds = document.querySelector("#seconds");
const btnStartStop = document.querySelector("#btn-on-off");
const textCountdown = document.querySelector("#alarm-countdown");
const messageSituation = document.querySelector("#message");

const audioAlarm = new Audio("./assets/songs/warning-alarm.mp3");
audioAlarm.load();

let alarmIsActivated = false;
let timeInitial = 0;
let timeRemain = 0;
let idTime;
const timeOptions = ["#minutes", "#seconds"];

createOptionsToSelect();

function createOptionsToSelect() {
	for (let i = 0; i < 60; i++) {
		timeOptions.forEach((element) => {
			const containerSelect = document.querySelector(element);
			const optionTag = document.createElement("option");
			optionTag.value = i;
			optionTag.textContent = i.toString().padStart(2, "0");
			containerSelect.appendChild(optionTag);
		});
	}
}

btnStartStop.addEventListener("click", (event) => {
	if (
		alarmIsActivated === false &&
		btnStartStop.textContent === "Start Alarm"
	) {
		const minutes = parseInt(selectMinutes.value);
		const seconds = parseInt(selectSeconds.value);
		timeRemain = minutes * 60 + seconds;
		timeInitial = minutes * 60 + seconds;

		textCountdown.textContent =
			selectMinutes.value.padStart(2, "0") +
			":" +
			selectSeconds.value.padStart(2, "0");
		console.log("tempo:", timeInitial);
		messageSituation.textContent = "";
		audioAlarm.pause();

		if (timeInitial !== 0) {
			alarmIsActivated = true;
			idTime = setInterval(verifyTime, 1000);
			btnStartStop.textContent = "Desarm";
			btnStartStop.classList.add("btn-desarm");
		}
	} else {
		timeRemain = 0;
		btnStartStop.textContent = "Start Alarm";
		btnStartStop.classList.remove("btn-desarm");
		messageSituation.textContent = "";
		alarmIsActivated = false;
		clearInterval(idTime);
		audioAlarm.pause();
	}
});

function verifyTime() {
	timeRemain--; //decrease time by one second;
	const minutes = Math.floor(timeRemain / 60);
	const seconds = timeRemain % 60;
	if (timeRemain === 0) {
		textCountdown.textContent = "00:00";
		messageSituation.textContent = "The time is over!";
		timeRemain = 0;
		alarmIsActivated = false;
		clearInterval(idTime);
		audioAlarm.play();
		audioAlarm.loop = true;
	} else {
		textCountdown.textContent =
			minutes.toString().padStart(2, "0") +
			":" +
			seconds.toString().padStart(2, "0");
	}
	if (timeRemain < 0.05 * timeInitial && timeRemain !== 0) {
		messageSituation.textContent = "The time is ending!";
	}
}
