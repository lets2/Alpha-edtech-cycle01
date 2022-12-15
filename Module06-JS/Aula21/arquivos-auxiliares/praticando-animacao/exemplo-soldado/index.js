let img = new Image();
img.src = "./soldado.png";
img.onload = function () {
	init();
};

let canvas = document.querySelector("canvas");
let contexto = canvas.getContext("2d"); //aceita 2d ou 3d
const escala = 2; //permite dar um zoom na imagem
const largura = 16; //largura do meu objeto
const altura = 18; //cada figurinha do png tem 16 por 18
const escalaLargura = escala * largura;
const escalaAltura = escala * altura;

function desenhaQuadro(posX, posY, canvasX, canvasY) {
	contexto.drawImage(
		img,
		posX * largura,
		posY * altura,
		largura,
		altura,
		canvasX,
		canvasY,
		escalaLargura,
		escalaAltura
	);
}
//pra dar deia de movimento
const imagensArray = [0, 1, 0, 2];
let indiceImagem = 0; //percorrer o vetor
let contaQuadro = 0; //saber qual quadro, nossa img tem 12 quadros
let direcaoAtual = 0;

function passo() {
	contaQuadro++;
	if (contaQuadro < 13) {
		window.requestAnimationFrame(passo);
		return;
	}
	contaQuadro = 0;
	contexto.clearRect(0, 0, canvas.width, canvas.height);
	desenhaQuadro(imagensArray[indiceImagem], direcaoAtual, 0, 0); //é possivel mudar esse 0,0 pra o boneoc ser desenhado em otro lugar
	indiceImagem++;
	if (indiceImagem >= imagensArray.length) {
		indiceImagem = 0;
		direcaoAtual++;
	}
	if (direcaoAtual >= 4) {
		direcaoAtual = 0;
	}
	window.requestAnimationFrame(passo);
}

function init() {
	window.requestAnimationFrame(passo);
}
