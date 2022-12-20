const messageError = document.querySelector("#message-error");
const containerResult = document.querySelector("#result");

window.addEventListener("load", () => {
	const idInterval = setInterval(async () => {
		const response = await fetch(`https://api.adviceslip.com/advice`);
		console.log(response);
		if (response.status !== 200) {
			throw "[error] There is a Problem with your request.";
		}
		const content = await response.json();
		console.log(content);
		containerResult.innerHTML = `<p>${content.slip.advice}</p>`;
	}, 5000);
});
