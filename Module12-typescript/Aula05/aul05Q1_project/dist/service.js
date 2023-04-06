var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Function to register
export function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("REGISTER FUNCTION FUNCIONOU:", user);
        alert("Usuario cadastrado com sucesso!");
    });
}
export function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("LOGIN FUNCTION FUNCIONOU:", user);
        alert("login foi um sucesso!");
    });
}
export function update(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("UPDATE FUNCTION FUNCIONOU:", user);
        alert("Dados do usuario atualizado com sucesso!");
    });
}
/*

export async function register(user: IUserInput) {
    const body: IUserInput = {
        name: user.name,
        email: user.email,
        password: user.password,
    };

    const options: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };

    try {
        const response: IAPIResponse<IUserData> = await fetch(
            "/accounts/",
            options
        ).then((data) => {
            return data.json();
        });
    } catch (err) {
        console.log(err);
    }
}

export async function login(user: Partial<IUserInput>) {
    const body: Partial<IUserInput> = {
        email: user.email,
        password: user.password,
    };

    const options: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };

    try {
        const response: IAPIResponse<ILoginData> = await fetch(
            "/accounts/login",
            options
        ).then((data) => {
            return data.json();
        });
    } catch (err) {
        console.log(err);
    }
}

export async function update(user: IUserInput) {
    const body: IUserInput = {
        name: user.name,
        email: user.email,
        password: user.password,
    };

    const options: RequestInit = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };

    try {
        const response: IAPIResponse<IUserData> = await fetch(
            "/accounts/",
            options
        ).then((data) => {
            return data.json();
        });
    } catch (err) {
        console.log(err);
    }
}

*/
