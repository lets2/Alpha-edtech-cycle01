export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IUserUpdate {
    name?: string;
    email?: string;
    password?: string;
}

export interface IUserLogin {
    email: string;
    password: string;
    id?: string;
}

export interface IResponseUser<T> {
    status: number;
    data?: T;
    errors?: T;
}
