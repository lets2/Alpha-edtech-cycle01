import { Request, Response } from "express";
import { UserValidate, LoginValidate } from "../helpers/userValidates";
import { IResponseUser, IUser, IUserLogin } from "../interfaces/iuser";
import { User, Login } from "../models/user";
import UserRepository from "../repositories/userRepository";

export default class UserHandler {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    public async create(req: Request, res: Response) {
        const { name, email, password }: IUser = req.body;
        const validate: UserValidate = new UserValidate(name, email, password);

        if (validate.fail) {
            return res.status(400).json({ message: validate.message });
        }

        const user: User = new User({ name, email, password });

        const createUser: IResponseUser<User[]> =
            await this.repository.createUser(user);

        if (createUser.status !== 201) {
            return res
                .status(createUser.status)
                .json({ errors: createUser.errors });
        }

        //const { id, name, email }: User = user;
        /*res.cookie("userId",user.id,{
            maxAge:90000,
            httpOnly:true
        })*/

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }

    //login

    public async login(req: Request, res: Response) {
        const { email, password }: IUserLogin = req.body;
        const validate: LoginValidate = new LoginValidate(email, password);

        if (validate.fail) {
            return res.status(400).json({ message: validate.message });
        }

        const loginData: Login = new Login({ email, password });

        const credentials: IResponseUser<User[]> =
            await this.repository.getCredentials(loginData);

        if (credentials.status !== 200) {
            return res
                .status(credentials.status)
                .json({ errors: credentials.errors });
        }

        if (
            credentials.data &&
            credentials.data[0]?.password !== loginData.password
        ) {
            //
            return res
                .status(401)
                .json({ errors: "[Unauthorized]: Password is wrong" });
        }

        if (credentials.data) {
            res.cookie("sessionID", credentials.data[0]?.id, {
                maxAge: 300000,
                httpOnly: true,
            });

            res.status(200).json({
                id: credentials.data[0]?.id,
                name: credentials.data[0]?.name,
                email: credentials.data[0]?.email,
            });
        }
    }

    //logout
    public async logout(req: Request, res: Response) {
        if (req.cookies.sessionID) {
            res.clearCookie("sessionID");
            res.status(200).json({
                message: "[logout] Cookie removido e logout efetuado",
            });
            return; //If dont use return, the function  will continue
        } else {
            res.status(404).json({
                errors: "[Not Found] Não há cookie para remover, você não está logado",
            });
            return; //If dont use return, the function  will continue
        }
    }

    //faz update, usuario precisa estar logado (req.cookies.sessionID)
    public async update(req: Request, res: Response) {
        //const { name, email, password }: IUser = req.body;
        const { name, email, password }: IUser = req.body;

        //const name = "name";
        const validate: UserValidate = new UserValidate(name, email, password);

        if (validate.fail) {
            return res.status(400).json({ message: validate.message });
        }
        //console.log("REQUISIÇÃO:", email, password);
        console.log("COOKIE", req.cookies.sessionID);

        console.log("COOKIE", req.cookies);
        if (!req.cookies.sessionID) {
            return res
                .status(403)
                .json({ errors: "[Forbidden] Não está logado!" });
        }

        const userId: string = req.cookies.sessionID;
        //instancia a classe User
        const userUp: User = new User({ name, email, password });
        userUp.id = userId; //A classe acima gera um ID, como quero manter o id do login
        //fiz essa atribuição, na classe tem um metodo setter para id;
        const userResponse: IResponseUser<User[]> =
            await this.repository.updateUser(userUp);

        if (userResponse.status !== 200) {
            return res
                .status(userResponse.status)
                .json({ errors: userResponse.errors });
        }
        console.log("SUCESSO NA MUDANÇA!");
        res.status(200).json({
            id: userUp.id,
            name: userUp.name,
            email: userUp.email,
        });
    }

    //Delete user
    public async delete(req: Request, res: Response) {
        //const { name, email, password }: IUser = req.body;
        const id: string = req.params.id;

        if (!id) {
            return res
                .status(400)
                .json({ message: "[bad request] Não foi informado id" });
        }

        const userResponse: IResponseUser<User[]> =
            await this.repository.deleteUser(id);

        if (userResponse.status !== 200) {
            return res
                .status(userResponse.status)
                .json({ errors: userResponse.errors });
        }

        if (userResponse.data) {
            res.status(200).json({
                id: userResponse.data[0]?.id,
                name: userResponse.data[0]?.name,
                email: userResponse.data[0]?.email,
            });
        }
    }

    public async get(req: Request, res: Response) {
        const users: IResponseUser<Array<User[]>> =
            await this.repository.getAllUsers();

        if (users.status !== 200)
            return res.status(users.status).json({ errors: users.errors });

        res.status(200).json(users.data);
    }
}
