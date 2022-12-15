const ERROR_IBGE = "[Error] An error occurred while requesting data from IBGE";
const ERROR_WEATHER = "[error] It failed to pick up the weather forecast data!";

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
	messageError.innerHTML = "";
	containerResult.innerHTML = "";
	containerResult.classList.add("hidden");
	const ufSelected = selectStateTag.value;

	requestCities(ufSelected)
		.then((dataCity) => {
			createOptionCity(dataCity);
			selectCityTag.classList.remove("hidden");
			selectCityTag.addEventListener("change", () => {
				messageError.innerHTML = "";
				containerResult.innerHTML = "";
				containerResult.classList.add("hidden");
				const optionSelected = document.getElementById(selectCityTag.value);
				getWeatherForecastData(optionSelected.textContent, optionSelected.value)
					.then((dataWeather) => {
						renderWeatherForecast(dataWeather);
					})
					.catch((error) => {
						//messageError.innerHTML = error;
						messageError.innerHTML = error.message;
					});
			});
		})
		.catch((error) => {
			console.log(error.message);
			//messageError.innerHTML = error;
			messageError.innerHTML = error.message;
		});
});

function requestCities(uf) {
	return new Promise((resolve, reject) => {
		fetch(
			`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
		)
			.then((response) => {
				if (response.status === 200) return response.json();
				else reject(new Error(ERROR_IBGE));
			})
			.then((data) => {
				const dataListCity = createObjCities(data);
				resolve(dataListCity);
			});
	});
}

function createObjCities(data) {
	let listOfCity = [];
	data.forEach((element) => {
		const objWithCities = {};
		objWithCities.nome = element.nome;
		objWithCities.id = element.id; //id ex:2604106->Caruaru
		listOfCity.push(objWithCities);
	});
	return listOfCity;
}

function createOptionCity(dataCity) {
	addOptionLabel(selectCityTag);
	dataCity.forEach((element) => {
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

function getWeatherForecastData(cityName, idCity) {
	console.log("Name city:", cityName, "My ID IS:", idCity);
	return new Promise((resolve, reject) => {
		fetch(`https://apiprevmet3.inmet.gov.br/previsao/${idCity}`)
			.then((response) => {
				if (response.status === 200) return response.json();
				else reject(new Error(ERROR_WEATHER));
			})
			.then((data) => {
				const dataListWeather = createObjDataWeather(data[idCity]);
				console.log(dataListWeather);
				resolve(dataListWeather);
			});
	});
}

function createObjDataWeather(AllDataWeather) {
	let dataListWeather = [];
	let index = 0;

	for (let dateAttribute in AllDataWeather) {
		const objDataWeather = {};
		if (index <= 1) {
			objDataWeather.date = dateAttribute;
			objDataWeather.dayOfWeek = AllDataWeather[dateAttribute].manha.dia_semana;
			objDataWeather.city = AllDataWeather[dateAttribute].manha.entidade;
			objDataWeather.tempMin = AllDataWeather[dateAttribute].manha.temp_min;
			objDataWeather.tempMax = AllDataWeather[dateAttribute].manha.temp_max;
			objDataWeather.morningResume = AllDataWeather[dateAttribute].manha.resumo;
			objDataWeather.afternoonResume =
				AllDataWeather[dateAttribute].tarde.resumo;
			objDataWeather.nightResume = AllDataWeather[dateAttribute].noite.resumo;
		} else {
			objDataWeather.date = dateAttribute;
			objDataWeather.dayOfWeek = AllDataWeather[dateAttribute].dia_semana;
			objDataWeather.city = AllDataWeather[dateAttribute].entidade;
			objDataWeather.tempMin = AllDataWeather[dateAttribute].temp_min;
			objDataWeather.tempMax = AllDataWeather[dateAttribute].temp_max;
			objDataWeather.resume = AllDataWeather[dateAttribute].resumo;
		}
		dataListWeather.push(objDataWeather);
		index++;
	}

	return dataListWeather;
}

function renderWeatherForecast(dataWeather) {
	containerResult.innerHTML = ""; //clear container-result
	containerResult.classList.remove("hidden");
	let count = 0;
	dataWeather.forEach((dataThisDay) => {
		containerResult.innerHTML +=
			count <= 1 ? completeData(dataThisDay) : simpleData(dataThisDay);
		count++;
	});
}

function completeData(dataThisDay) {
	return `
    <div class="container-day-complete flex-col-start">
        <h2>${dataThisDay.city} - ${dataThisDay.date} - ${
		dataThisDay.dayOfWeek
	}</h2>
        <p><span>Temp. mín:</span> ${
					dataThisDay.tempMin
				}°C <span>Temp. máx:</span> ${dataThisDay.tempMax}°C</p>
        <div class="card flex-row-start">
            <div id="manha" class="flex-col-start">
                <h3>MANHÃ</h3>
                <img src="./assets/${nameImg(
									dataThisDay.morningResume,
									"day"
								)}" alt="clima de dia" />
                <p>${dataThisDay.morningResume}</p>
            </div>
            <div id="tarde" class="flex-col-start">
                <h3>TARDE</h3>
                <img src="./assets/${nameImg(
									dataThisDay.afternoonResume,
									"day"
								)}" alt="clima de tarde" />
                <p>${dataThisDay.afternoonResume}</p>
            </div>
            <div id="noite" class="flex-col-start">
                <h3>NOITE</h3>
                <img src="./assets/${nameImg(
									dataThisDay.nightResume,
									"night"
								)}" alt="clima de noite" />
                <p>${dataThisDay.nightResume}</p>
            </div>
        </div>
    </div>`;
}

function simpleData(dataThisDay) {
	return `<div class="container-day-resume flex-col-start">
                <h2>${dataThisDay.city} - ${dataThisDay.date} - ${
		dataThisDay.dayOfWeek
	}</h2>
                <p><span>Temp. mín:</span> ${
									dataThisDay.tempMin
								}°C <span>Temp. máx:</span> ${dataThisDay.tempMax}°C</p>
                <img src="./assets/${nameImg(
									dataThisDay.resume,
									"day"
								)}" alt="clima de dia" />
                <p>${dataThisDay.resume}</p>
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
