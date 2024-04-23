import { PromotionModel } from "../models/promotions.model.js";

export class PromotionController{
    
    static async getAll(req, res){
        const promotions = await PromotionModel.getAll();
        
        if (promotions.lenght === 0) return res.status(404).json({message: "No se pudieron recuperar las promociones"})
        
        return res.json(promotions);
    }
}