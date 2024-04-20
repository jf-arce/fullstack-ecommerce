import { ProductModel } from "../models/products.model.js";


export class ProductController{
    static async getAll(req,res){
        try {
            const {name} = req.query;
        
            const products = await ProductModel.getAll({name});
            
            if (products.length === 0 ) return res.status(404).json({message:"Productos no encontrados"});
        
            return res.json(products);
        }catch(e){
            console.error('Error al obtener prodcutos:', error.message);
            return res.status(500).json({ message: "Error al obtener productos" });
        }
    }

    static async addProduct(req,res){
        const{
            name,
            brand,
            category,
            price,
            stock,
            description,
            sale
        } = req.body;

        await ProductModel.addProduct({name,brand,category,price,stock,description,sale});

        return res.status(201)
    }

    static async deleteProduct(req,res){
        const {id} = req.params;

        
        await ProductModel.deleteProduct({id});

        // if (!product) return res.status(404).json({message:"No se encuentra el producto"});

        return res.status(204)
    }
}