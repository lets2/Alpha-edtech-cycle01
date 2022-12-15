const containerInput = document.querySelector("#container-select");
const selectStateTag = document.querySelector("#uf");
const selectCityTag = document.querySelector("#city");
const containerResult = document.querySelector("#container-result");
const messageError = document.querySelector("#message-error");

const listOfStates = [
	{ ibgeCode: 12, uf: "AC", name: "Acre" },
	{ ibgeCode: 27, uf: "AL", name: "Alagoas" },
	{ ibgeCode: 16, uf: "AP", name: "Amapá" },
	{ ibgeCode: 13, uf: "AM", name: "Amazonas" },
	{ ibgeCode: 29, uf: "BA", name: "Bahia" },
	{ ibgeCode: 23, uf: "CE", name: "Ceará" },
	{ ibgeCode: 53, uf: "DF", name: "Distrito Federal" },
	{ ibgeCode: 32, uf: "ES", name: "Espírito Santo" },
	{ ibgeCode: 52, uf: "GO", name: "Goiás" },
	{ ibgeCode: 21, uf: "MA", name: "Maranhão" },
	{ ibgeCode: 51, uf: "MT", name: "Mato Grosso" },
	{ ibgeCode: 50, uf: "MS", name: "Mato Grosso do Sul" },
	{ ibgeCode: 31, uf: "MG", name: "Minas Gerais" },
	{ ibgeCode: 15, uf: "PA", name: "Pará" },
	{ ibgeCode: 25, uf: "PB", name: "Paraíba" },
	{ ibgeCode: 41, uf: "PR", name: "Paraná" },
	{ ibgeCode: 26, uf: "PE", name: "Pernambuco" },
	{ ibgeCode: 22, uf: "PI", name: "Piauí" },
	{ ibgeCode: 33, uf: "RJ", name: "Rio de Janeiro" },
	{ ibgeCode: 24, uf: "RN", name: "Rio Grande do Norte" },
	{ ibgeCode: 43, uf: "RS", name: "Rio Grande do Sul" },
	{ ibgeCode: 11, uf: "RO", name: "Rondônia" },
	{ ibgeCode: 14, uf: "RR", name: "Roraima" },
	{ ibgeCode: 42, uf: "SC", name: "Santa Catarina" },
	{ ibgeCode: 35, uf: "SP", name: "São Paulo" },
	{ ibgeCode: 28, uf: "SE", name: "Sergipe" },
	{ ibgeCode: 17, uf: "TO", name: "Tocantins" },
];
const listOfCity = [];

createOptionState();

function createOptionState() {
	listOfStates.forEach((state) => {
		const optionState = document.createElement("option");
		optionState.textContent = state.name;
		optionState.value = state.uf;
		selectStateTag.appendChild(optionState);
	});
}

selectStateTag.addEventListener("change", () => {
	const ufSelected = selectStateTag.value;
	getCities(ufSelected);
});

function getCities(uf) {
	selectCityTag.innerHTML = "";
	fetch(
		`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
	)
		.then((response) => {
			if (response.status === 200) {
				console.log("Response is okay!");
				return response.json();
			} else {
				throw "[error] Data used are invalids!";
			}
		})
		.then((data) => {
			createOptionCity(data);
			selectCityTag.classList.remove("hidden");
			selectCityTag.addEventListener("change", () => {
				const optionSelected = document.getElementById(selectCityTag.value);
				doWeatherForecast(optionSelected.textContent, optionSelected.value);
			});
		})
		.catch((error) => {
			messageError.innerHTML = error;
		});
}

function createOptionCity(data) {
	addOptionLabel(selectCityTag);
	data.forEach((element) => {
		const optionCity = document.createElement("option");
		optionCity.textContent = element.nome;
		optionCity.value = element.id; //id ex:2604106->Caruaru
		optionCity.setAttribute("id", `${element.id}`);
		selectCityTag.appendChild(optionCity);
	});
}

function addOptionLabel(select) {
	const option = document.createElement("option");
	option.textContent = "Escolha um município";
	option.value = "";
	option.setAttribute("disabled", "");
	option.setAttribute("selected", "");
	select.appendChild(option);
}

function doWeatherForecast(cityName, idCity) {
	console.log("Name city:", cityName, "My ID IS:", idCity);
	fetch(`https://apiprevmet3.inmet.gov.br/previsao/${idCity}`)
		.then((response) => {
			if (response.status === 200) {
				console.log("Response is okay!!");
				return response.json();
			} else {
				throw "[error] Weather forecast data used are invalids!";
			}
		})
		.then((data) => {
			writeWeatherForecast(data[idCity]);
		})
		.catch((error) => {
			messageError.innerHTML = error;
		});
}
let period = ["manha", "tarde", "noite"];
function writeWeatherForecast(objectData) {
	containerResult.innerHTML = ""; //clear container-result
	containerResult.classList.remove("hidden");
	let index = 0;
	for (let variable in objectData) {
		if (index <= 1) {
			containerResult.innerHTML += completeData(variable, objectData);
		} else {
			//console.log(" Presents only resume:", variable);
			containerResult.innerHTML += simpleData(variable, objectData);
		}
		index++;
	}
}

function completeData(date, objectData) {
	const weatherCity = objectData[date].manha.entidade;
	const tempMin = objectData[date].manha.temp_min;
	const tempMax = objectData[date].manha.temp_max;
	const dayOfWeek = objectData[date].manha.dia_semana;
	const morningResume = objectData[date].manha.resumo;
	const afternoonResume = objectData[date].tarde.resumo;
	const nightResume = objectData[date].noite.resumo;

	return `
    <div class="container-day-complete flex-col-start">
        <h2>${weatherCity} - ${date} - ${dayOfWeek}</h2>
        <p><span>Temp. mín:</span> ${tempMin}°C <span>Temp. máx:</span> ${tempMax}°C</p>
        <div class="card flex-row-start">
            <div id="manha" class="flex-col-start">
                <h3>MANHÃ</h3>
                <img src="./assets/${nameImg(
									morningResume,
									"day"
								)}" alt="clima de dia" />
                <p>Resumo: ${morningResume}</p>
            </div>
            <div id="tarde" class="flex-col-start">
                <h3>TARDE</h3>
                <img src="./assets/${nameImg(
									afternoonResume,
									"day"
								)}" alt="clima de tarde" />
                <p>Resumo: ${afternoonResume}</p>
            </div>
            <div id="noite" class="flex-col-start">
                <h3>NOITE</h3>
                <img src="./assets/${nameImg(
									nightResume,
									"night"
								)}" alt="clima de noite" />
                <p>Resumo: ${nightResume}</p>
            </div>
        </div>
    </div>`;
}

function nameImg(resume, type) {
	let nameFile;
	switch (resume) {
		case "Claro":
			nameFile = "icon-01-";
			break;
		case "Poucas nuvens":
			nameFile = "icon-02-";
			break;
		case "Muitas nuvens":
			nameFile = "icon-03-";
			break;
		case "Encoberto":
			nameFile = "icon-04-";
			break;
		case "Nublado":
			nameFile = "icon-04-";
			break;
		case "Nublado com chuva":
			nameFile = "icon-05-";
			break;
		case "Nublado com chuvisco":
			nameFile = "icon-05-";
			break;

		case "Encoberto com chuva isolada":
			nameFile = "icon-06-";
			break;
		case "Encoberto com chuvisco":
			nameFile = "icon-06-";
			break;

		case "Muitas nuvens com chuva":
			nameFile = "icon-07-";
			break;

		case "Muitas nuvens com pancadas de chuva":
			nameFile = "icon-08-";
			break;
		case "Muitas nuvens com chuva isolada":
			nameFile = "icon-08-";
			break;

		case "Muitas nuvens com pancadas de chuva isoladas":
			nameFile = "icon-08-";
			break;

		case "Muitas nuvens com possibilidade de chuva isolada":
			nameFile = "icon-09-";
			break;

		case "Nublado com pancadas de chuva e trovoadas isoladas":
			nameFile = "icon-10-";
			break;

		case "Muitas nuvens com pancadas de chuva e trovoadas isoladas":
			nameFile = "icon-11-";
			break;

		case "Muitas nuvens com pancadas de chuva e trovoadas":
			nameFile = "icon-11-";
			break;

		default: //clean sky
			nameFile = "icon-01-";
	}
	return nameFile + type + ".PNG";
}

function simpleData(date, objectData) {
	const weatherCity = objectData[date].entidade;
	const tempMin = objectData[date].temp_min;
	const tempMax = objectData[date].temp_max;
	const dayOfWeek = objectData[date].dia_semana;
	const resume = objectData[date].resumo;

	return `<div class="container-day-resume flex-col-start">
                <h2>${weatherCity} - ${date} - ${dayOfWeek}</h2>
                <p><span>Temp. mín:</span> ${tempMin}°C <span>Temp. máx:</span> ${tempMax}°C</p>
                <img src="./assets/${nameImg(
									resume,
									"day"
								)}" alt="clima de dia" />
                <p>Resumo: ${resume}</p>
            </div>`;
}
