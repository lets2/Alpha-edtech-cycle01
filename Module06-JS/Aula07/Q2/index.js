let obj = {
	"Um atributo com espaços": 1,
};
console.log(obj);
console.log("Q2a - com colchetes:\n", obj["Um atributo com espaços"]);
//deu erro o segundo letra b
console.log("Q2b - sem colchetes usando methodo values:\n", Object.values(obj));
