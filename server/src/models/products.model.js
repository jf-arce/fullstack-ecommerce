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

    static async create({name,brand,category,price,stock,description,promotion,size}){

        const [result] = await connection.query(
            `INSERT INTO Productos (nombre, descripcion, marca, precio, idCategoria, idPromocion) 
            VALUES (?,?,?,?,?,?)`, [name,description,brand,price,category, promotion]
        );
    
        //Recuperamos el ultimo id insertado
        const idProducto = result.insertId;

        await connection.query(
            `INSERT INTO Inventario (idProducto, stock) VALUES (?,?)`, [idProducto, stock]
        )
      
        // Insertamos la asociación de producto con cada tamaño disponible
        for (const sizeId of size) {
            await connection.query(
                `INSERT INTO ProductosTalles (idTalle, idProducto) VALUES (?,?)`, [sizeId, idProducto]
            );
        }
    }

    static async delete({id}){

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

    static async update({prod,id}){
        const updateFields = [];
        const updateValues = [];
    
        if (prod.name) {
            updateFields.push('nombre = ?');
            updateValues.push(prod.name);
        }
        if (prod.brand) {
            updateFields.push('marca = ?');
            updateValues.push(prod.brand);
        }
        if (prod.category) {
            updateFields.push('idCategoria = ?');
            updateValues.push(prod.category);
        }
        if (prod.price) {
            updateFields.push('precio = ?');
            updateValues.push(prod.price);
        }
        if (prod.description) {
            updateFields.push('descripcion = ?');
            updateValues.push(prod.description);
        }
        if (prod.promotion) {
            updateFields.push('idPromocion = ?');
            updateValues.push(prod.promotion);
        }

        if (updateFields.length > 0 && updateValues.length > 0) {
            // Agregar el ID al final
            updateValues.push(id);  
            // Construir la consulta SQL de actualización
            //Con el join concatena cada elemento del array separados por una coma
            const updateQuery = `UPDATE Productos SET ${updateFields.join(', ')} WHERE idProducto = ?`;
            
            await connection.query(updateQuery, updateValues);
        }
      
        if (prod.stock){
            await connection.query(`
                UPDATE Inventario SET stock = ? WHERE idProducto = ?
            `, [prod.stock, id])
        }

        // Actualizar los tamaños en la tabla ProductosTalles
        if (prod.size) {
            // Eliminar todos los tamaños asociados al producto
            await connection.query(`
                DELETE FROM ProductosTalles WHERE idProducto = ?
            `, [id]);

            // Insertar los nuevos tamaños asociados al producto
            for (const sizeId of prod.size) {
                await connection.query(`
                    INSERT INTO ProductosTalles (idTalle, idProducto) VALUES (?, ?)
                `, [sizeId, id]);
            }
        }
    }   
}