import { connection } from "./db.js";

export class PromotionModel{

    static async getAll(){
        const [promotions] = await connection.query(`
            SELECT * FROM promociones 
        `);
        
        return promotions;
    }
}