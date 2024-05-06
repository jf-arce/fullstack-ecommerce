import { useEffect, useState } from "react";
import { getAllProducts, getProductsFilteredByName } from "@/services/getData";

export default function useGetProducts(search = null) {
  const [products, setProducts] = useState([]); //Estado para guardar los productos
  const [filteredProducts, setFilteredProducts] = useState([]); //Estado para guardar los productos filtrados

  const refreshProducts = async () => {
    if (!search) {
      //Si no hay una busqueda se obtienen todos los productos
      const products = await getAllProducts(); //Devuelve array de productos
      if(products.length > 0){
        setProducts(
          products.map((prod) => ({
            id: prod.idProducto,
            name: prod.nombre,
            price: prod.precio,
            brand: prod.marca,
            category: prod.categoria,
            stock: prod.stock,
          }))
        );
      }else{
        setProducts([]);
      }
    } else { 
      //Si hay una busqueda se obtienen los productos filtrados por esta misma
      const filteredProductsData = await getProductsFilteredByName(search); //Devuelve array de productos
      if (filteredProductsData.length > 0){
        setFilteredProducts(
          filteredProductsData.map((prod) => ({
            id: prod.idProducto,
            name: prod.nombre,
            price: prod.precio,
            brand: prod.marca,
            category: prod.categoria,
            stock: prod.stock,
          }))
        );
      }else{
        setFilteredProducts([]);
      }
    }
  };
  /*Usamos un useEffect para que se renderize los productos ni bien se cargue la pagina
  y cuando se haga una busqueda en el input de busqueda*/
  useEffect(() => {
    refreshProducts();
  }, [search]);

  //Retornamos un array con los productos y la funcion para renderizar de nuevo la tabla
  return [search ? filteredProducts : products, refreshProducts];
}
