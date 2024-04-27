import { getAllProducts, getProductsFilteredByName } from "@/lib/getData";
import { useEffect, useState } from "react";

export default function useGetProducts(search = null, forceRender = null) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!search) {
      getAllProducts().then((products) =>
        setProducts(
          products.map((prod) => ({
            id: prod.idProducto,
            name: prod.nombre,
            price: prod.precio,
            brand: prod.marca,
            category: prod.categoria,
            stock: prod.stock,
          }))
        )
      );
    } else {
      getProductsFilteredByName(search).then((prod) => {
        if (prod) {
          setFilteredProducts(
            prod.map((prod) => ({
              id: prod.idProducto,
              name: prod.nombre,
              price: prod.precio,
              brand: prod.marca,
              category: prod.categoria,
              stock: prod.stock,
            }))
          );
        }
      });
    }
  }, [search,forceRender]);

  return search ? filteredProducts : products;
}
