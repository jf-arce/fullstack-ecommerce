import { connection } from "./db.js";

export class UserModel{
    static async getAll(){
        const [users] = await connection.query(
            `SELECT * FROM vistaclientesregistrados`
        )
        return users;
    }
}