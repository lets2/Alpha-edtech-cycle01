import pg from "pg";
import IProduct from "../interfaces/iproduct";
import IResult from "../interfaces/iresult";
import { v4 as uuidv4 } from "uuid";

export default class Product {
    async insert(pool: pg.Pool, product: IProduct): Promise<IResult<IProduct>> {
        const iresult: IResult<IProduct> = { errors: [], status: 200 };
        try {
            const query = `INSERT INTO store.product (id, name, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [uuidv4(), product.name, product.price, product.category];
            const queryResult = await pool.query(query, values);
            if (queryResult.rowCount > 0) {
                iresult.data = {
                    id: queryResult.rows[0].id,
                    name: queryResult.rows[0].name,
                    price: queryResult.rows[0].price,
                    category: queryResult.rows[0].category_id,
                    createdAt: queryResult.rows[0].created_at,
                    updatedAt: queryResult.rows[0].updated_at
                };
            }
        } catch (error: any) {
            iresult.errors?.push(error.message);
            iresult.status = 500;
        }
        return iresult;
    }

    async list(pool: pg.Pool): Promise<IResult<IProduct[]>> {
        const iresult: IResult<IProduct[]> = { errors: [], status: 200 };
        try {
            const query = `SELECT product.id, product.name, product.category_id, category.name as category_name,
                                  price, product.created_at, product.updated_at
                             FROM store.product,
                                  store.category 
                            WHERE 
                                category.id = product.category_id
                            AND product.deleted_at IS NULL`;
            const queryResult = await pool.query(query);
            //console.log("QueryResult", queryResult.rows);
            //iresult.data = queryResult.rows;
            iresult.data = [];
            for (let i = 0; i < queryResult.rows.length; i++) {
                const product: IProduct = {
                    id: queryResult.rows[i].id,
                    name: queryResult.rows[i].name,
                    price: queryResult.rows[i].price,
                    category: { id: queryResult.rows[i].category_id, name: queryResult.rows[i].category_name },
                    createdAt: queryResult.rows[i].created_at,
                    updatedAt: queryResult.rows[i].updated_at,
                };
                iresult.data.push(product);
            }
        } catch (error: any) {
            iresult.errors?.push(error.message);
            iresult.status = 500;
        }

        return iresult;
    }
}
