import { ProductModel } from "../models/products.model.js";


export class ProductController{
    static async getAll(req,res){
        const products = await ProductModel.getAll();
        
        if (products.length === 0 ) return res.status(404).json({message:"Productos no encontrados"});

        return res.json(products);
    }
}