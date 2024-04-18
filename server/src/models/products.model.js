import { connection } from "./db.js";

export class ProductModel{
    static async getAll({name}){
        if (name){
            const [products] = await connection.query(
                'SELECT * FROM vistatodoslosproductos WHERE LOWER(nombre) LIKE ?',
                [`%${name.toLowerCase()}%`]
            )

            return products;
        }
        const [products] = await connection.query(
            `SELECT * FROM vistatodoslosproductos`
        )
        return products;
    }
}