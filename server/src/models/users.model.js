import { connection } from "./db.js";

export class UserModel{
    static async getAll({name}){
        if (name) {
            console.log(name);
            const [users] = await connection.query(
                `SELECT * FROM vistaclientesregistrados WHERE LOWER(nombre_usuario) LIKE ?`,
                [`${name.toLowerCase()}%`]
            ) 
            return users;
        }
        const [users] = await connection.query(
            `SELECT * FROM vistaclientesregistrados`
        )
        return users;
    }
}