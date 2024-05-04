import { connection } from "./db.js";

export class ProductModel{
    static async getAll({name}){
        if (name){
            const [products] = await connection.query(
                'SELECT * FROM vistatodoslosproductos WHERE LOWER(nombre) LIKE ?',
                [`%${name.toLowerCase()}%`]
            )

            return products;
        }
        const [products] = await connection.query(
            `SELECT * FROM vistatodoslosproductos`
        )
        return products;
    }

    static async addProduct({name,brand,category,price,stock,description,sale}){

        const promotion = sale ?? 1

        const [result] = await connection.query(
            `INSERT INTO Productos (nombre, descripcion, marca, precio, idCategoria, idPromocion) 
            VALUES (?,?,?,?,?,?)`, [name,description,brand,price,category, promotion]
        );
    
        //Recuperamos el ultimo id insertado
        const idProducto = result.insertId;

        await connection.query(
            `INSERT INTO Inventario (idProducto, stock) VALUES (?,?)`, [idProducto, stock]
        )

        //Falta pasarle el id del talle desde el cliente
        await connection.query(
            `INSERT INTO ProductosTalles(idTalle, idProducto) VALUES (1,?)`, [idProducto]
        )
        
    }

    static async deleteProduct({id}){

        console.log(id);
        await connection.query(`
            DELETE FROM inventario WHERE idProducto = ?
        `,[id])

        await connection.query(`
            DELETE FROM productostalles WHERE idProducto = ?
        `,[id])

        await connection.query(`
            DELETE FROM productosfavoritos WHERE idProducto = ?
        `,[id])
        
        await connection.query(`
            DELETE FROM productos WHERE idProducto = ?
        `,[id])

        /*Hay un error cuando se elimina un producto que esta en un pedido, ya 
        que un producto esta relacionado con la tabla detalle pedido*/
    }
}