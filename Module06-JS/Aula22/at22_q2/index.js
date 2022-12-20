class Avatar {
	name;
	x;
	y;
	coinBag;
	lifePoints;
	attackDamage;
	constructor(_name, _x, _y, _coinBag) {
		if (_name.length < 4) {
			throw "[error]: Name need to have more than 3 character!";
		}
		if (_x < 0 || _y < 0) {
			throw "[error]: Negative coordinates cannot be used!";
		}
		if (_coinBag < 0) {
			throw "[error]: A negative quantity of coins cannot be used!";
		}
		this.name = _name;
		this.x = _x;
		this.y = _y;
		this.coinBag = _coinBag;
		this.lifePoints = 10;
		this.attackDamage = 1;
	}
	get name() {
		return this.name;
	}
	get x() {
		return this.x;
	}
	get y() {
		return this.y;
	}
	get coinBag() {
		return this.coinBag;
	}
	get lifePoints() {
		return this.lifePoints;
	}
	get attackDamage() {
		return this.attackDamage;
	}
	forward() {
		if (this.lifePoints > 0) {
			this.y += 1;
		}
	}
	back() {
		if (this.y >= 1 && this.lifePoints > 0) {
			this.y -= 1;
		}
	}
	right() {
		if (this.lifePoints) {
			this.x += 1;
		}
	}
	left() {
		if (this.x >= 1 && this.lifePoints > 0) {
			this.x -= 1;
		}
	}
	addCoin() {
		if (this.lifePoints > 0) {
			this.coinBag += 1;
		}
	}
	attack() {
		if (this.lifePoints > 0) {
			return this.attackDamage;
		} else {
			return 0; //
		}
	}
	damageReceived(_damage) {
		if (_damage <= this.lifePoints) {
			this.lifePoints -= _damage;
		} else {
			this.lifePoints = 0;
		}
	}
}

class Cowboy extends Avatar {
	ammunition;
	constructor(_name, _x, _y, _coinBag) {
		super(_name, _x, _y, _coinBag);
		this.ammunition = 10;
		this.attackDamage = 2;
	}
	attack() {
		if (this.lifePoints > 0 && this.ammunition > 0) {
			this.ammunition -= 1;
			return this.attackDamage;
		} else {
			return 0; //
		}
	}
	addAmmunition() {
		this.ammunition += 1; //found ammunition
	}
}

class Wizard extends Avatar {
	spells;
	constructor(_name, _x, _y, _coinBag) {
		super(_name, _x, _y, _coinBag);
		this.spells = 10;
		this.attackDamage = 3;
	}
	attack() {
		if (this.lifePoints > 0 && this.spells > 1) {
			this.spells -= 1;
			return this.attackDamage;
		} else if (this.spells === 1) {
			setTimeout(() => {
				this.spells = 10;
			}, 10000);
			this.spells -= 1;
			return this.attackDamage;
		} else {
			return 0; //
		}
	}
}

const inputName = document.querySelector("#avatar-name");
const inputCoordX = document.querySelector("#avatar-x");
const inputCoordY = document.querySelector("#avatar-y");
const inputBag = document.querySelector("#avatar-bag");
const buttonCreate = document.querySelector("#create");
const containerControl = document.querySelector("#container-control");
const messageError = document.querySelector("#message-error");
const messageResult = document.querySelector("#message-result");
const selectAvatar = document.querySelector("#your-avatar");

let listOfAvatar = [];

buttonCreate.addEventListener("click", () => {
	console.log("entrou");
	messageError.innerHTML = "";
	messageResult.innerHTML = "";
	try {
		const name = inputName.value;
		const coordX = parseInt(inputCoordX.value);
		const coordY = parseInt(inputCoordY.value);
		const initialBagCoin = parseInt(inputBag.value);
		console.log(name, coordX, coordY, initialBagCoin);
		let newAvatar = new Avatar(name, coordX, coordY, initialBagCoin);
		listOfAvatar.push(newAvatar);
		updateAvatares(newAvatar);
	} catch (error) {
		messageError.innerHTML = `<p>${error}</p>`;
	}
});

function updateAvatares(newAvatar) {
	const option = document.createElement("option");
	console.log("novo", newAvatar.name);
	option.value = newAvatar.name;
	option.innerHTML = newAvatar.name;

	selectAvatar.appendChild(option);
}

selectAvatar.addEventListener("change", () => {
	console.log("evento de mudanca", selectAvatar.value);
	const avatarSelected = selectAvatar.value;
	const index = listOfAvatar.findIndex(
		(element) => element.name === avatarSelected
	);
	if (index !== -1) {
		renderControl();
		showInformationsAbout(listOfAvatar[index]);
	}
});

function renderControl() {
	containerControl.innerHTML =
		"Use the arrow keys to change the position of the Avatar";
}

function showInformationsAbout(avatarObject) {
	messageResult.innerHTML = `
            <h3>Name: <span>${avatarObject.name}</span></h3>
            <h3>Current Position: <span>(${avatarObject.x},${avatarObject.y})</span></h3>
            <h3>Coins in bag: <span>${avatarObject.coinBag}</span></h3>
    `;
}

document.addEventListener("keydown", (event) => {
	const key = event.key;
	if (
		key === "ArrowUp" ||
		key === "ArrowDown" ||
		key === "ArrowRight" ||
		key === "ArrowLeft"
	) {
		const avatarSelected = selectAvatar.value;
		if (avatarSelected !== "") {
			const index = listOfAvatar.findIndex(
				(element) => element.name === avatarSelected
			);
			moveAvatar(listOfAvatar[index], key);
			searchACoin(listOfAvatar[index]);
			showInformationsAbout(listOfAvatar[index]);
		}
	}
});

function moveAvatar(avatar, key) {
	switch (key) {
		case "ArrowUp":
			avatar.forward();
			break;
		case "ArrowDown":
			avatar.back();
			break;
		case "ArrowRight":
			avatar.right();
			break;
		case "ArrowLeft":
			avatar.left();
			break;
	}
}

function searchACoin(avatar) {
	const haveFoundACoin = Math.random() > 0.93 ? true : false;
	if (haveFoundACoin) {
		avatar.addCoin();
		alert(avatar.name + " has found a coin!");
	}
}
