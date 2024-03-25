import { connection } from "./db.js";

export class ProductModel{
    static async getAll(){
        const [products] = await connection.query(
            `SELECT * FROM vistatodoslosproductos`
        )
        return products;
    }
}