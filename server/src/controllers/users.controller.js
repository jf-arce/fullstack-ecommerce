import { UserModel } from "../models/users.model.js";

export class UserController {
    static async getAll(req,res){
        const {name} = req.query
        try {
            const users = await UserModel.getAll({ name });
            
            if (users.length === 0) {
                return res.status(404).json({ message: "No se encontraron clientes registrados" });
            }

            return res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error.message);
            return res.status(500).json({ message: "Error al obtener usuarios" });
        }
    }
}