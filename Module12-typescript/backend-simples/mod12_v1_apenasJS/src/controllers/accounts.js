const accountsService = require("../services/accounts.js");

const TAG = "accounts controllers: ";

//----------------------------------------------
//CREATING NEWS
//----------------------------------------------

/*GET INFORMATION ABOUT ACCOUNTS-*/
exports.list = async (req, res) => {
    //determine the IP of who made the request
    console.log(TAG, "list() from " + req.connection.remoteAddress);
    const now = new Date(); // create a new instance Date current
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`list()${milliseconds}`);

    //const userId = req.userId; //If authenticate, function send user id in req.userId

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };
    /*
    if (!userId) {
        //
        response.message = "Doesnt have cookie with userId";
        response.data = null;
        response.error = "[403] Forbidden! Doesnt have cookie with userId";

        res.status(403).json(response);
        console.timeEnd(`information()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }
*/
    try {
        // Call Service method
        const serviceResponse = await accountsService.list();
        //
        //means serviceResponse is a empty array, so didnt find result
        if (serviceResponse.length === 0) {
            throw new Error("No rows returned");
        }

        console.log("TTTTTTTTTTTTTTTT");
        console.log("DADOS", serviceResponse);
        console.log("TTTTTTTTTTTTTTTT");

        // Retornar com sucesso
        response.message = "Success";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`list()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);
        if (error.message === "No rows returned") {
            response.message = "Não existe usuário com esse id";
            response.data = null;
            response.error = "[403] Forbidden! Não existe usuário com esse id";

            res.status(403).json(response);
            console.timeEnd(`list()${milliseconds}`);
            return;
        }
        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`list()${milliseconds}`);
    }
};

/*POST REGISTER NEW ACCOUNT*/
exports.register = async (req, res) => {
    //determine the IP of who made the request
    console.log(TAG, "register() from " + req.connection.remoteAddress);
    const now = new Date(); // create a new instance Date current
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`register()${milliseconds}`);

    //const userId = req.userId; //If authenticate, function send user id in req.userId

    //Standardizing the response that the frontend will receive.

    /*
    if (!userId) {
        //
        response.message = "Doesnt have cookie with userId";
        response.data = null;
        response.error = "[403] Forbidden! Doesnt have cookie with userId";

        res.status(403).json(response);
        console.timeEnd(`information()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }
*/

    const { name, email, password } = req.body;

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!name || !email || !password) {
        //
        response.message = "Request need to have {name,email, password}";
        response.data = null;
        response.error = "[400] Bad request! Some fields are undefined/null";

        res.status(400).json(response);
        console.timeEnd(`register()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (name === "" || email === "" || password === "") {
        //
        response.message = "These fields cannot be empty: name,email,password";
        response.data = null;
        response.error = "[400] Bad request! Some fields are empty";

        res.status(400).json(response);
        console.timeEnd(`register()${milliseconds}`);
        return;
    }

    if (IsNotString(name) || IsNotString(email) || IsNotString(password)) {
        //
        response.message =
            "These fields should be string type: name,email, password";
        response.data = null;
        response.error = "[400] Bad request! Some fields are not string";

        res.status(400).json(response);
        console.timeEnd(`register()${milliseconds}`);
        return;
    }
    // verify if email is valid
    if (isNotValidEmail(email)) {
        //
        response.message = "Content in email should be a valid email";
        response.data = null;
        response.error = "[400] Bad request! Email is not valid";

        res.status(400).json(response);
        console.timeEnd(`register()${milliseconds}`);
        return;
    }

    try {
        // Call Service method
        const serviceResponse = await accountsService.register(
            name,
            email,
            password
        );
        //
        //means serviceResponse is a empty array, so didnt find result
        if (serviceResponse.length === 0) {
            throw new Error("No rows returned");
        }

        console.log("TTTTTTTTTTTTTTTT");
        console.log("DADOS", serviceResponse);
        console.log("TTTTTTTTTTTTTTTT");

        // Retornar com sucesso
        response.message = "Success";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`register()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);
        if (error.message === "No rows returned") {
            response.message = "Não existe usuário com esse id";
            response.data = null;
            response.error = "[403] Forbidden! Não existe usuário com esse id";

            res.status(403).json(response);
            console.timeEnd(`register()${milliseconds}`);
            return;
        }
        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`register()${milliseconds}`);
    }
};

/*PATCH UPDATE ACCOUNT*/
exports.update = async (req, res) => {
    //determine the IP of who made the request
    console.log(TAG, "update() from " + req.connection.remoteAddress);
    const now = new Date(); // create a new instance Date current
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`update()${milliseconds}`);

    //const userId = req.userId; //If authenticate, function send user id in req.userId

    //Standardizing the response that the frontend will receive.

    /*
    if (!userId) {
        //
        response.message = "Doesnt have cookie with userId";
        response.data = null;
        response.error = "[403] Forbidden! Doesnt have cookie with userId";

        res.status(403).json(response);
        console.timeEnd(`information()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }
*/

    const { name, email, password } = req.body;

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!name || !email || !password) {
        //
        response.message = "Request need to have {name,email, password}";
        response.data = null;
        response.error = "[400] Bad request! Some fields are undefined/null";

        res.status(400).json(response);
        console.timeEnd(`update()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (name === "" || email === "" || password === "") {
        //
        response.message = "These fields cannot be empty: name,email,password";
        response.data = null;
        response.error = "[400] Bad request! Some fields are empty";

        res.status(400).json(response);
        console.timeEnd(`update()${milliseconds}`);
        return;
    }

    if (IsNotString(name) || IsNotString(email) || IsNotString(password)) {
        //
        response.message =
            "These fields should be string type: name,email, password";
        response.data = null;
        response.error = "[400] Bad request! Some fields are not string";

        res.status(400).json(response);
        console.timeEnd(`update()${milliseconds}`);
        return;
    }
    // verify if email is valid
    if (isNotValidEmail(email)) {
        //
        response.message = "Content in email should be a valid email";
        response.data = null;
        response.error = "[400] Bad request! Email is not valid";

        res.status(400).json(response);
        console.timeEnd(`update()${milliseconds}`);
        return;
    }

    try {
        // Call Service method
        const serviceResponse = await accountsService.update(
            name,
            email,
            password
        );
        //
        //means serviceResponse is a empty array, so didnt find result
        if (serviceResponse.length === 0) {
            throw new Error("No rows returned");
        }

        console.log("TTTTTTTTTTTTTTTT");
        console.log("DADOS", serviceResponse);
        console.log("TTTTTTTTTTTTTTTT");

        // Retornar com sucesso
        response.message = "Success";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`update()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);
        if (error.message === "No rows returned") {
            response.message = "Não existe usuário com esse id";
            response.data = null;
            response.error = "[403] Forbidden! Não existe usuário com esse id";

            res.status(403).json(response);
            console.timeEnd(`update()${milliseconds}`);
            return;
        }
        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`update()${milliseconds}`);
    }
};

/*POST TO LOGIN*/
exports.login = async (req, res) => {
    //determine the IP of who made the request
    console.log(TAG, "login() from " + req.connection.remoteAddress);
    const now = new Date(); // create a new instance Date current
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`login()${milliseconds}`);

    const email = req.body.email;
    //const plainTextPassword = req.body.plainTextPassword;
    const plainTextPassword = req.body.password;

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!email || !plainTextPassword) {
        //
        response.message = "Request need to have {email and password})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are UNDEFINED/NULL";

        res.status(400).json(response);
        console.timeEnd(`login()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (email === "" || plainTextPassword === "") {
        //
        response.message = "These fields cannot be empty: email,password})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are EMPTY";

        res.status(400).json(response);
        console.timeEnd(`login()${milliseconds}`);
        return;
    }

    if (IsNotString(email) || IsNotString(plainTextPassword)) {
        //
        response.message =
            "These fields should be STRING TYPE: email, password)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are not STRING";

        res.status(400).json(response);
        console.timeEnd(`login()${milliseconds}`);
        return;
    }
    // verify if email is valid
    if (isNotValidEmail(email)) {
        //
        response.message = "This field should be a VALID EMAIL";
        response.data = null;
        response.error = "[400] Bad request! Email is not valid";

        res.status(400).json(response);
        console.timeEnd(`login()${milliseconds}`);
        return;
    }

    try {
        // Call Service method
        const serviceResponse = await accountsService.login(
            email,
            plainTextPassword
        );
        //
        //means serviceResponse is a empty array, so didnt find result
        if (serviceResponse.length === 0) {
            throw new Error("No rows returned");
        }
        if (
            serviceResponse[0].email !== email ||
            serviceResponse[0].password !== plainTextPassword
        ) {
            throw new Error("Invalid credentials");
        }

        //ZONA DE VERIFICACAO SE ESTA OKAY E RETORNA O COOKIE
        const dbPasswordHash = serviceResponse[0].password;
        console.log("TTTTTTTTTTTTTTTT");
        console.log("DADOS", serviceResponse);
        console.log("TTTTTTTTTTTTTTTT");

        //const result = await bcrypt.compare(plainTextPassword, dbPasswordHash); //boolean
        /*
        if (result) {
            //
            const jwt = jwtLib.sign(
                { name, userId: serviceResponse[0].id },
                process.env.JWT_SECRET
            );
            res.cookie("session", jwt);
            // res.status(200).json({ controller: "GEROU cookie" });
        } else {
            response.message = "[403] Acesso negado!";
            response.error = "[403] Acesso negado!";
            res.status(403).json(response); //forbidden
            console.timeEnd(`login()${milliseconds}`);

            return;
        }
*/
        // Retornar com sucesso
        response.message = "Success";
        response.data = [{ id: serviceResponse[0].id }];
        res.cookie("id", serviceResponse[0].id, {
            maxAge: 300000,
            httpOnly: false,
        });
        res.status(200).json(response);
        console.timeEnd(`login()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);
        if (
            error.message === "No rows returned" ||
            error.message === "Invalid credentials"
        ) {
            response.message = "Não autorizado! Credenciais inválidas";
            response.data = null;
            response.error = "[401] Não autorizado! Credenciais inválidas";

            res.status(401).json(response);
            console.timeEnd(`login()${milliseconds}`);
            return;
        }
        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`login()${milliseconds}`);
    }
};

/*POST LOGOUT - REMOVE COOKIE*/
exports.logout = async (req, res) => {
    //determine the IP of who made the request
    console.log(TAG, "logout() from " + req.connection.remoteAddress);
    const now = new Date(); // create a new instance Date current
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`logout()${milliseconds}`);

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };
    if (req.cookies.id) {
        //
        response.message = "Logout efetuado com sucesso";
        response.data = null;
        response.error = "[200] Success! Logout efetuado com sucesso";

        res.clearCookie("id");

        res.status(200).json(response);
        console.timeEnd(`logout()${milliseconds}`);
        return; //If dont use return, the function  will continue
    } else {
        response.message = "Você não está logado, não há cookie para remover";
        response.data = null;
        response.error = "[404] Not Found! Não há cookie para remover";
        res.status(404).json(response);
        console.timeEnd(`logout()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }
};

//
//
//

function isNotValidEmail(_email) {
    // Expressão regular para validar email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(_email);
}

/*check if is not string type*/
function IsNotString(_data) {
    if (typeof _data !== "string") {
        return true;
    }
    return false;
}
