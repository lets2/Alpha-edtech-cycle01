import { IUser, IUserLogin } from "../interfaces/iuser";
import { v4 } from "uuid";

export class User {
    #name;
    #email;
    #password;
    #id;

    constructor(data: IUser) {
        this.#name = data.name;
        this.#email = data.email;
        this.#password = data.password;
        this.#id = this.createId();
    }

    get name() {
        return this.#name;
    }
    get email() {
        return this.#email;
    }
    get password() {
        return this.#password;
    }
    get id() {
        return this.#id;
    }

    set id(_id) {
        this.#id = _id;
    }
    private createId() {
        const id = v4();
        return id;
    }
}

export class Login {
    #email;
    #password;

    constructor(data: IUserLogin) {
        this.#email = data.email;
        this.#password = data.password;
    }

    get email() {
        return this.#email;
    }
    get password() {
        return this.#password;
    }
}
