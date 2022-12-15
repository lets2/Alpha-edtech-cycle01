import MainPage from "./main-page.js";
import BrigadeiroPage from "./brigadeiro-page.js";
import CandyPage from "./candy-page.js";
import CupCakePage from "./cupcakes-page.js";

export default function navegateRouter() {
	const objRouter = {
		"/home": MainPage(),
		"/brigadeiro": BrigadeiroPage(),
		"/candy": CandyPage(),
		"/cupcakes": CupCakePage(),
		getPage: function (url) {
			return this[url];
		},
	};
	return objRouter;
}
