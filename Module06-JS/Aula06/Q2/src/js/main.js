const cep = document.querySelector("#cep");


/*FUNCAO QUE DEU CERTO*/
cep.addEventListener("input",(event) => {
 
    const str = event.target.value;

    if(cep.value.length <= 9) {
        cep.value = str.replace(/[^0-9\-]/g,"");
        deixaCepNoPadrao(cep.value);
    }
    else {
        cep.value = str.replace(/[^0-9\-]/g,"");
        deixaCepNoPadrao(cep.value.replace("-",""))
    }

    //preenche endereço
    if(cep.value.length===9){
        procuraLocal(cep.value);
    }
    if(cep.value.length===6){
        cep.value = str.replace("-","");
    }

})

function deixaCepNoPadrao(stringCep){

    const last = stringCep.charAt(stringCep.length-1);
    if(stringCep.indexOf("-") == -1 && stringCep.length > 5) {
        cep.value = stringCep.slice(0,5) + "-" + stringCep.slice(5,8);
    }
    else {
        if(stringCep.length > 5) {
            const stringSemHifen = stringCep.replace("-","");
            cep.value = stringSemHifen.slice(0,5) + "-" + stringSemHifen.slice(5,stringSemHifen.length);
        }
    }
}

/*FUNCAO QUE DEU CERTTO*/

function procuraLocal(cep){

 let search = cep.replace("-","");
 
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
}

const showData = (result)=>{
    for(const campo in result){
        if(document.querySelector("#"+campo)){
            console.log(campo)
            document.querySelector("#"+campo).value = result[campo]
        }    
    }
}

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