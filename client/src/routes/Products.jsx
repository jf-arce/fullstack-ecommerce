import { TableComponent } from "@/components/TableComponent/TableComponent";
import { Suspense, useState } from "react";
import { productsColumns } from "@/components/TableComponent/columns/productsColumns";
import { Search } from "@/components/Search";
import ContainerComponents from "@/components/ContainerComponents";
import { useDebouncedCallback } from 'use-debounce';
import { DialogToAdd } from "@/components/DialogToAdd";
import { deleteProduct } from "@/lib/deleteData";
import useGetProducts from "@/hooks/useGetProducts";
import { ToastContainer } from "react-toastify";

export default function Products() {

  const [searchTerm, setSearchTerm] = useState("");
  const [forceRender, setForceRender] = useState(null);

  const {products, refreshProducts} = useGetProducts(searchTerm);

  const handleFilter = useDebouncedCallback((search) => {
    setSearchTerm(search);
  },300) 

  const handeDelete = (id) =>{
    deleteProduct(id).then(()=>{
      refreshProducts();
    });
  }

  return (
    <main className="h-full px-10 py-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Search handleFilter={handleFilter} placeholder="Buscar por nombre"/>
        <DialogToAdd/>
        <ToastContainer/>
      </div>
      <ContainerComponents>
        <Suspense fallback={<p>Cargando...</p>}>
          <TableComponent
            data={products}
            itemsPerPage={6}
            columns={productsColumns}
            handleDelete={handeDelete}
          />
        </Suspense>
      </ContainerComponents>
    </main>
  );
}
