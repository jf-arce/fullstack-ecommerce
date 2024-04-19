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
        console.log(name,brand,category,price,stock, description, sale);
        //El category es un id y el stock tiene que ir en la otra tabla llamada inventario
        const [result] = await connection.query(
            `INSERT INTO Productos (nombre, descripcion, marca, precio, idCategoria, idPromocion) 
            VALUES (?,?,?,?,?,?)`, [name,description,brand,price,category, sale]
        );
    
        //Recuperamos el ultimo id insertado
        const idProducto = result.insertId;

        console.log(idProducto);

        await connection.query(
            `INSERT INTO Inventario (idProducto, stock) VALUES (?,?)`, [idProducto, stock]
        )

        //Falta pasarle el id del talle desde el cliente
        await connection.query(
            `INSERT INTO ProductosTalles(idTalle, idProducto) VALUES (1,?)`, [idProducto]
        )
        
    }
}