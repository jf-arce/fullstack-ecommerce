import { useEffect, useState } from "react";
import { getAllProducts, getProductsFilteredByName } from "@/lib/getData";

export default function useGetProducts(search = null) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const refreshProducts = async () => {
    if (!search) {
      const products = await getAllProducts();
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
    } else {
      const prod = await getProductsFilteredByName(search);
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
    }
  };

  useEffect(() => {
    refreshProducts();
  }, [search]);

  return { products: search ? filteredProducts : products, refreshProducts };
}
