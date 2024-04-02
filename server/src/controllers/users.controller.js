import { UserModel } from "../models/users.model.js";

export class UserController {
    static async getAll(req,res){
        const nomUser = req.query.name;
        const users = await UserModel.getAll();

        if (users.length === 0) return res.status(404).json({message:"No se encontraron clientes registrados"});
        
        return res.json(users);
        
    }
}