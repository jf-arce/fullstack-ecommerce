import { ProductModel } from "../models/products.model.js";
import { validatePartialProduct, validateProduct } from "../schemas/product.schema.js";

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
        //Validamos el objeto recibido del body
        const prodValidated = validateProduct(req.body); //En el req.body esta el producto nuevo que se quiere agregar
        
        if (prodValidated.success){
            await ProductModel.create(prodValidated.data);
        }else{
            return res.status(500).json(prodValidated.error);
        }
    
        return res.status(201).end();
    }

    static async deleteProduct(req,res){
        const {id} = req.params;

        await ProductModel.delete({id});

        return res.status(204).end();
    }

    static async updateProduct(req,res){
        const {id} = req.params;

        //Validamos el objeto recibido del body
        const prodValidated = validatePartialProduct(req.body); 
        
        if(prodValidated.success){
            await ProductModel.update({prod:prodValidated.data, id})
            return res.status(204).end();
        }else{
            return res.status(500).json(prodValidated.error);
        }
    }
}