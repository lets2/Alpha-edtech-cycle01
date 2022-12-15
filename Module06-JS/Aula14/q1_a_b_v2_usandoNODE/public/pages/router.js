import Principal from "./main-page.js";
import Brigadeiros from "./brigadeiros-page.js";
import Cupcakes from "./cupcakes-page.js";
import Doces from "./doces-page.js";

export default function GeraObjComRotas() {
	const objRotas = {
		"/public/home": Principal(),
		"/public/brigadeiros": Brigadeiros(),
		"/public/cupcakes": Cupcakes(),
		"/public/doces": Doces(),
		getPage: function (url) {
			return this[url];
		},
	};
	return objRotas;
}
