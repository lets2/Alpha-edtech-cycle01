import Postgres from "../database/postgres";
import IProduct from "../interfaces/iproduct";
import IResult from "../interfaces/iresult";
import Product from "../repositories/product";

export default class ProductService {
    repository = new Product();

    async insert(product: IProduct): Promise<IResult<IProduct>> {
        const pool = await Postgres.pool();
        let result: IResult<IProduct> = { errors: [], status: 200 };
        try {
            result = await this.repository.insert(pool, product);
        } catch (error: any) {
            result.errors?.push(error.message);
            result.status = 500;
        }

        return result;
    }

    async list(): Promise<IResult<IProduct[]>> {
        const pool = await Postgres.pool();
        let result: IResult<IProduct[]> = { errors: [], status: 200 };
        try {
            result = await this.repository.list(pool);
        } catch (error: any) {
            result.errors?.push(error.message);
            result.status = 500;
        }

        return result;
    }
}
