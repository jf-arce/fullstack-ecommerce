import { TableComponent } from "@/components/TableComponent/TableComponent";
import { Suspense, useState } from "react";
import { productsColumns } from "@/components/TableComponent/columns/productsColumns";
import { Search } from "@/components/Search";
import ContainerComponents from "@/components/ContainerComponents";
import { useDebouncedCallback } from 'use-debounce';
import { DialogToAdd } from "@/components/DialogToAdd";
import { deleteProduct } from "@/lib/deleteData";
import useGetProducts from "@/hooks/useGetProducts";
import { ToastContainer, Bounce, toast } from "react-toastify";


export default function Products() {

  const [searchTerm, setSearchTerm] = useState(""); //Estado para guardar el valor del input de busqueda

  //El primer valor es el array de productos y el segundo es la funcion que renderiza de nuevo la tabla
  const [products, refreshTable] = useGetProducts(searchTerm); 

  //Se usa un debounced para evitar que se hagan muchas peticiones al servidor al escribir en el input
  const handleFilter = useDebouncedCallback((search) => {
    setSearchTerm(search);
  },300) 

  //Maneja la eliminacion de un producto
  const handleDelete = (id) =>{
    deleteProduct(id).then(()=>{
      //Se vuelven a cargar los productos para que se actualice la tabla sin el producto eliminado
      refreshTable();
       //Mostrar una notificacion de que se agrego el producto
      toast.success('Producto eliminado',{
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl:false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme:"colored",
        transition: Bounce,
      }) 
    });
  }

  return (
    <main className="h-full px-10 py-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Search handleFilter={handleFilter} placeholder="Buscar por nombre"/> {/*Input de busqueda*/}
        <DialogToAdd refreshTable={refreshTable}/> {/*Boton para agregar un producto*/}
      </div>
      <ContainerComponents>
        <Suspense fallback={<p>Cargando...</p>}>
          <TableComponent
            data={products} //Array de productos
            itemsPerPage={6} //Cantidad de items por pagina
            columns={productsColumns} //Columnas de la tabla
            handleDelete={handleDelete} //Funcion para eliminar un producto
          />
        </Suspense>
      </ContainerComponents>
      <ToastContainer/> {/*Componente de notificacion*/}
    </main>
  );
}
