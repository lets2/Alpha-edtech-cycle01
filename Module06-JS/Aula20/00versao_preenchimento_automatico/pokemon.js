/* function contador() {
	let count = 0;
	function incrementar() {
		count++;
		console.log("count now is ", count);
	}
	return incrementar;
}

const conta = contador();
console.log(conta);
conta();
conta();
conta();
 */

function Pokemon(_name, _attack) {
	let name = _name;
	let power = _attack;
	function speak() {
		return name + "!!!";
	}
	function attack() {
		return power + "!!!";
	}
	return {
		speak: speak,
		attack: attack,
	};
}
const p = Pokemon;
console.log(Pokemon);

const pikachu = new Pokemon("pikachu", "choque do trovão");
const bulbasaur = new Pokemon("bulbasaur", "folha navalha");
const totodile = new Pokemon("totodile", "Hidro bomba");

console.log(pikachu);
console.log(bulbasaur);
console.log(totodile);

console.log(pikachu.speak());
console.log(pikachu.attack());
console.log(bulbasaur.speak());
console.log(bulbasaur.attack());
console.log(totodile.speak());
console.log(totodile.attack());
