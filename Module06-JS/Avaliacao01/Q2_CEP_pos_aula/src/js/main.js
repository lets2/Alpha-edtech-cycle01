const inputCep = document.querySelector("#cep");

/*FUNCAO QUE DEU CERTO*/
inputCep.addEventListener("input", (event) => {
	let position = event.target.selectionStart;
	const newValueCep = inputCep.value.replace(/[^0-9]/g, "");

	if (newValueCep.length <= 5) inputCep.value = newValueCep;
	else {
		inputCep.value = newValueCep.slice(0, 5) + "-" + newValueCep.slice(5, 8);
		if (newValueCep.length >= 6 && position == 6) position++;
	}

	event.target.selectionEnd = position;

	//Fill field with API datas about Address
	if (inputCep.value.length === 9) {
		procuraLocal(inputCep.value);
	}
});

/*FETCH API TO GET DATAS*/

function procuraLocal(cep) {
	let search = cep.replace("-", "");

	const options = {
		method: "GET",
		mode: "cors",
		cache: "default",
	};
	fetch(`https://viacep.com.br/ws/${search}/json/`, options)
		.then((response) => {
			response.json().then((data) => showData(data));
		})
		.catch((error) => console.log("Deu erro: " + error, message));
}

const showData = (result) => {
	for (const campo in result) {
		if (document.querySelector("#" + campo)) {
			console.log(campo);
			document.querySelector("#" + campo).value = result[campo];
		}
	}
};

// para cada campo em result
//armazena o nome dele nessa variável cmapo
//result[campo], mesmo sendo um objeto
//posso usar essa notação de array
//para pegar a informação que preciso

//event blur-> after user take the focus i want to know
//whats was typed on input
//method replace seaching for something, then
//change by another one, in this case, change by
//nothing, this way, keeping only numbers
/*
cep.addEventListener("blur",(e)=>{

    let search = cep.value.replace("-","");
 
    const options = {
        method: "GET",
        mode:"cors",
        cache: "default"
    }
    fetch(`https://viacep.com.br/ws/${search}/json/`,options)
    .then((response)=>{ response.json()
        .then((data)=>showData(data))
    })
    .catch(e=>console.log("Deu erro: "+e,message))

    ////console.log(cep.value);
})
*/

//how "fetch" works?
//access this url, then
//need some paramet
//GET->default
//cors->its like excuse-me, i will go in
//fetch(url,option), access this url with theses options
//if okay, use ".then()"
//else its bad, use ".catch()"
//  Trata a reposta o formato JSON: response.json()})
// a conversão em formato JSON também retorna uma promessa
//por isos preciso colocar um .then no json também
//com o objetivo de saber de deu certo
//another way to write a arrow function is: e=>console, dont need
//() nem {}
