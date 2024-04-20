import { getAllProducts, getProductsFilteredByName } from "@/lib/getData";
import { useEffect, useState } from "react";

export default function useGetProducts() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
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
    }, [products]);

    return products;
}

