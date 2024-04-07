import { UserModel } from "../models/users.model.js";

export class UserController {
    static async getAll(req,res){
        const {name} = req.query
        const users = await UserModel.getAll({name});

        if (users.length === 0) return res.status(404).json({message:"No se encontraron clientes registrados"});
        
        return res.json(users);
        
    }
}