const buttonSend = document.getElementById("button-send");
const InputContent = document.querySelector("#content");
const message = document.querySelector("#message");
buttonSend.addEventListener("click", () => {
    convertToObject();
});

function convertToObject() {
    const contentString = InputContent.value;

    try {
        const obj = JSON.parse(contentString);
        console.log("Parsable JSON string!");
        console.log("Object:");
        console.log(obj);
        message.innerHTML = "Parsable JSON string!";
        message.classList.add("okay");
        message.classList.remove("have-error");
    } catch (error) {
        console.log("[error]", error);
        message.innerHTML = `[error] ${error}`;
        message.classList.add("have-error");
        message.classList.remove("okay");
    }
}
