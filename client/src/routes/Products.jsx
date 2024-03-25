import { ButtonCustom } from "@/components/ButtonCustom/ButtonCustom";
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/getData";
import { productsColumns } from "@/components/TableComponent/columns/productsColumns";
import { Search } from "@/components/Search";
import { useFiltered } from "@/hooks/useFiltered";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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
    )
  }, []);

  const handleFilter = (search) =>{
    const productFiltered = useFiltered(products, search, 'name')
    setFilteredProducts(productFiltered);
  }

  const tableConfig = {
    data: filteredProducts.length > 0 ? filteredProducts : products,
    itemsPerPage: 6,
    columns: productsColumns,
  };

  return (
    <main className="bg-neutral-800 h-full px-10 py-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Search handleFilter={handleFilter} placeholder="Buscar por nombre"/>
        <ButtonCustom />
      </div>
      <TableComponent {...tableConfig} />
    </main>
  );
}
