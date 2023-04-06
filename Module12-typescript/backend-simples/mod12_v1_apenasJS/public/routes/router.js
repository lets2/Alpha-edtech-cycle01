import { home } from "../pages/home.js";
import { login } from "../pages/login.js";
import { information } from "../pages/information.js";

export default function createObjWithRoutes() {
    const objRoutes = {
        "/": home(),
        "/login": login(),
        "/information": information(),
        getPage: function (url) {
            return this[url];
        },
    };
    return objRoutes;
}
