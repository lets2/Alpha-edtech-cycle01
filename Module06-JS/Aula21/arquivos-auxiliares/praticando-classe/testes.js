const buttonShow = document.querySelector("#show");
const buttonHide = document.querySelector("#hide");
const message = document.querySelector("#info");

class Car {
	constructor(_name, _year) {
		this.name = _name;
		this.year = _year;
	}
	//
	get Age() {
		return this.calculateAge();
	}
	calculateAge() {
		return 2021 - this.year;
	}
}
const myCar = new Car("Toyota", 2014);

const leoCar = new Car("BMW", 2020);

buttonShow.addEventListener("click", () => {
	message.innerHTML = myCar.name + " " + myCar.year;
	message.innerHTML += `<br>` + leoCar.name + " " + leoCar.year;
	message.innerHTML += `<br>` + "My car is " + myCar.Age + " years old";
});

buttonHide.addEventListener("click", () => {
	message.innerHTML = "";
});

class Rectangle {
	constructor(_height, _width) {
		this.height = _height;
		this.width = _width;
	}
	//getter
	get area() {
		return this.calculateArea();
	}
	calculateArea() {
		return this.height * this.width;
	}
}
const inputHeight = document.querySelector("#input-height");
const inputWidth = document.querySelector("#input-width");
const buttonCalculate = document.querySelector("#button-calculate");
const result = document.querySelector("#result");
buttonCalculate.addEventListener("click", () => {
	const myRectangle = new Rectangle(inputHeight.value, inputWidth.value);

	result.innerHTML = "This area is " + myRectangle.area;
});
