export default class AscII {
	string;
	code;
	constructor(_string) {
		this.string = _string;
	}

	getCode() {
		this.code = this.getArray(this.string);
		this.code;
		let sum = 0;
		this.code.forEach((element) => {
			sum += element;
		});
		return sum;
	}
	getArray(_string) {
		let charCodeArr = [];

		for (let i = 0; i < _string.length; i++) {
			let code = _string.charCodeAt(i);
			charCodeArr.push(code);
		}
		return charCodeArr;
	}
}

/*
Um método ‘getCode’ que:
Pega o valor armazenado na variável ‘string’ e passa como parâmetro de ‘getArray’;
O resultado deve ser armazenada na variável ‘code’;
Realize a soma de todos os elementos de ‘code’;
Retorne este valor de soma de elementos.

*/
/* class Retangulo {
	altura;
	largura;
	constructor(_parametroAltura, _parametroLargura) {
		this.altura = _parametroAltura;
		this.largura = _parametroLargura;
	}
	metodoGetAltura() {
		return this.altura;
	}

	metodoGetLargura() {
		return this.largura;
	}
	calculaArea() {
		return this.largura * this.altura;
	}
}

const primeiroRetangulo = new Retangulo(20, 50);
console.log(primeiroRetangulo);
console.log(primeiroRetangulo.metodoGetAltura());
console.log(primeiroRetangulo.metodoGetLargura());
console.log(primeiroRetangulo.calculaArea());
 */
