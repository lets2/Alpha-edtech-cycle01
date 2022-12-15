window.addEventListener("keydown", (event) => {
	const keyClicked = event.key;
	console.log(keyClicked);
	switch (keyClicked) {
		case "ArrowDown":
			myImg.classList.add("face-down");
			myImg.classList.remove("face-up");
			myImg.classList.remove("face-left");
			myImg.classList.remove("face-right");

			break;
		case "ArrowUp":
			myImg.classList.add("face-up");
			myImg.classList.remove("face-down");
			myImg.classList.remove("face-left");
			myImg.classList.remove("face-right");
			break;
		case "ArrowLeft":
			myImg.classList.add("face-left");
			myImg.classList.remove("face-up");
			myImg.classList.remove("face-down");
			myImg.classList.remove("face-right");
			break;
		case "ArrowRight":
			myImg.classList.add("face-right");
			myImg.classList.remove("face-up");
			myImg.classList.remove("face-left");
			myImg.classList.remove("face-down");
			break;
	}
	myImg.classList.add("animation");
	setTimeout(() => {
		myImg.classList.remove("animation");
	}, 1000);
});

const myImg = document.querySelector("#my-image");
