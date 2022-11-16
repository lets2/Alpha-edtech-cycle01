const p = document.querySelector("#paragrafo");
const inputText = document.querySelector("#inputText");
inputText.addEventListener("input", () => {
	p.innerHTML = inputText.value;
});
