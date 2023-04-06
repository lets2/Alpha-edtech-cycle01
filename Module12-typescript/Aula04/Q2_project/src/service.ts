//
//Creating interfaces to my API services
interface IAPIResponse<T> {
    data: T;
    errors: Array<string>;
}

interface IUserData {
    id: string;
    name: string;
    email: string;
}

interface ILoginData {
    id: string;
}

//
export interface IUserInput {
    name: string;
    email: string;
    password: string;
}

//Function to register
export async function register(user: IUserInput | Partial<IUserInput>) {
    console.log("REGISTER FUNCTION FUNCIONOU:", user);
    alert("Usuario cadastrado com sucesso!");
}

export async function login(user: Partial<IUserInput>) {
    console.log("LOGIN FUNCTION FUNCIONOU:", user);
    alert("login foi um sucesso!");
}

export async function update(user: IUserInput | Partial<IUserInput>) {
    console.log("UPDATE FUNCTION FUNCIONOU:", user);
    alert("Dados do usuario atualizado com sucesso!");
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
