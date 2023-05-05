import { QueryResult } from "pg";
import connectDB from "../database/postgres";
import { IResponseUser, IUser } from "../interfaces/iuser";
import { User, Login } from "../models/user";

export default class UserRepository {
    private db: connectDB;

    constructor() {
        this.db = new connectDB();
    }

    public async getAllUsers() {
        try {
            const queryText: string = `SELECT id,name,email FROM accounts;`;
            const getUsers: QueryResult<Array<IUser>> =
                await this.db.pool.query(queryText);

            const res: IResponseUser<Array<IUser[]>> = {
                status: 200,
                data: getUsers.rows,
            };

            return res;
        } catch (err) {
            const res: IResponseUser<any> = { status: 500, errors: err };
            return res;
        }
    }

    public async createUser(user: User) {
        try {
            const query: string = `INSERT INTO accounts (id,name,email,password) VALUES ($1,$2,$3,$4) RETURNING id,name,email;`;

            const values: Array<string> = [
                user.id,
                user.name,
                user.email,
                user.password,
            ];

            const userData: QueryResult<Array<IUser>> =
                await this.db.pool.query(query, values);

            const res: IResponseUser<Array<IUser[]>> = {
                status: 201,
                data: userData.rows,
            };

            return res;
        } catch (err) {
            const res: IResponseUser<any> = { status: 500, errors: err };
            return res;
        }
    }

    public async getCredentials(loginData: Login) {
        try {
            const query: string = `SELECT id,name,email,password FROM accounts WHERE email = $1;`;

            const values: Array<string> = [loginData.email];

            const userData: QueryResult<Array<IUser>> =
                await this.db.pool.query(query, values);

            const res: IResponseUser<Array<IUser[]>> = {
                status: 200,
                data: userData.rows,
            };

            return res;
        } catch (err) {
            const res: IResponseUser<any> = { status: 500, errors: err };
            return res;
        }
    }

    public async updateUser(user: User) {
        try {
            const query: string = `UPDATE accounts SET name = $2, email = $3, password = $4, updated_at = NOW() WHERE id = $1 RETURNING id,name,email;`;

            const values: Array<string> = [
                user.id,
                user.name,
                user.email,
                user.password,
            ];

            const userData: QueryResult<Array<IUser>> =
                await this.db.pool.query(query, values);

            const res: IResponseUser<Array<IUser[]>> = {
                status: 200,
                data: userData.rows,
            };

            return res;
        } catch (err) {
            const res: IResponseUser<any> = { status: 500, errors: err };
            return res;
        }
    }

    public async deleteUser(id: string) {
        try {
            const query: string = `DELETE FROM accounts WHERE id = $1 RETURNING id,name,email;`;

            const values: Array<string> = [id];

            const userData: QueryResult<Array<IUser>> =
                await this.db.pool.query(query, values);

            if (userData.rowCount === 0) {
                throw "[not found] There is no user with the given id";
            }
            const res: IResponseUser<Array<IUser[]>> = {
                status: 200,
                data: userData.rows,
            };

            return res;
        } catch (err) {
            const res: IResponseUser<any> = { status: 500, errors: err };
            return res;
        }
    }
}
