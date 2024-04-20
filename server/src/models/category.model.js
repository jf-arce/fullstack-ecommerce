import { connection } from "./db.js";

export class CategoryModel{
    static async getAll(){
        const [categories] = await connection.query(`
            SELECT * FROM Categorias
        `);

        return categories;
    }
}