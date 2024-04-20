import { TableComponent } from "@/components/TableComponent/TableComponent";
import { useEffect, useState } from "react";
import { getAllProducts, getProductsFilteredByName } from "@/lib/getData";
import { productsColumns } from "@/components/TableComponent/columns/productsColumns";
import { Search } from "@/components/Search";
import ContainerComponents from "@/components/ContainerComponents";
import { useDebouncedCallback } from 'use-debounce';
import { DialogToAdd } from "@/components/DialogToAdd";
import { deleteProduct } from "@/lib/deleteData";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(()=>{
    if(searchTerm){
      getProductsFilteredByName(searchTerm)
        .then((prod)=>{
          if(prod){
            setFilteredProducts(
              prod.map((prod) => ({
                id: prod.idProducto,
                name: prod.nombre,
                price: prod.precio,
                brand: prod.marca,
                category: prod.categoria,
                stock: prod.stock,
              }))
            )
          }
        })
    }else{
      setFilteredProducts([]);
    }
  },[searchTerm])

  const handleFilter = useDebouncedCallback((search) => {
    setSearchTerm(search);
  },300) 

  const handeDelete = (e) =>{
    const tableRow = e.target.closest("tr");
    const id = Number(tableRow.children[0].textContent);
    deleteProduct(id)
  }

  const tableConfig = {
    data: filteredProducts.length > 0 ? filteredProducts : products,
    itemsPerPage: 6,
    columns: productsColumns,
    handleDelete: handeDelete
  };

 

  return (
    <main className="h-full px-10 py-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Search handleFilter={handleFilter} placeholder="Buscar por nombre" />
        <DialogToAdd/>
      </div>
      <ContainerComponents>
        <TableComponent {...tableConfig}/>
      </ContainerComponents>
    </main>
  );
}
