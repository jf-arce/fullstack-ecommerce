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
        const [product] = await connection.query(
            `INSERT INTO Productos (nombre, descripcion, marca, precio, idCategoria, idPromocion)
            VALUES (?,?,?,?,?)`, [name,description,brand,price,category, sale]
        );
    
        const idProducto = product.insertId;

        console.log(idProducto);

        const [inventario] = await connection.query(
            `INSERT INTO Inventario (idProducto, stock)
            VALUES (?,?)`, [idProducto, stock]
        )


        
        //Insertamos el stock dentro de la tabla inventario con el ultimo idProducto creado
        // const [idProducto] = await connection.query(
        //     `SELECT MAX(idProducto) as idProducto FROM Productos`
        // )
        
        /*Otra forma de recuperar el ultimo producto creado en express
        es con el metodo insertId de la respuesta de la query, osea,
        const [idProducto] = await connection.query(
            `INSERT INTO Productos (nombre, descripcion, marca, precio, idCategoria, idPromocion)
            VALUES (?,?,?,?,?)`, [name,description,brand,price,category, stock]
        )
        const idProducto = idProducto.insertId;

        */
    }
}