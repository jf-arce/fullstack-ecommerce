import { CategoryModel } from "../models/category.model.js";

export class CategoryController{
    static async getAll(req,res){
        const categories = await CategoryModel.getAll();
        
        if (!categories) return res.status(404).json({message:"No se pudieron recuperar las categorias"});
        
        return res.json(categories);
    }
}