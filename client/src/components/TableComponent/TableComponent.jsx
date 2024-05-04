import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconButton } from "@radix-ui/themes";
import { FaTrash, FaEdit } from "react-icons/fa";
import { PaginationComponent } from "./PaginationComponent.jsx";
import { useState } from "react";

export const TableComponent = ({data,columns,itemsPerPage, handleDelete }) => {
 
  const [currentPage, setCurrentPage] = useState(1); //estado para guardar la pagina actual
  
  const lastItemIndex = currentPage * itemsPerPage; //calcula el ultimo item de la pagina
  const firstItemIndex = lastItemIndex - itemsPerPage; // calcula el primer item de la pagina
  const currentItems = data.slice(firstItemIndex, lastItemIndex); //obtiene los items de la pagina actual

  if (data.length === 0) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <Table className="text-white">
        {/*Cabecera de la tabla*/}
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accesorKey} className="font-bold">
                {column.header}
              </TableHead>
            ))}
            <TableHead className="text-right font-bold">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        {/*Cuerpo de la tabla*/}
        <TableBody>
          {/*Renderiza los items de la pagina actual*/}
          {currentItems.map((data) => (
            <TableRow key={data.id}>
              {/*Renderiza las columnas de cada item*/}
              {columns.map((column) => (
                <TableCell key={column.accesorKey}>
                  {data[column.accesorKey]}
                </TableCell>
              ))}
               {/* Botones de editar y eliminar */}
              <TableCell>
                <div className="flex items-center gap-4 justify-end">
                  {/* Boton de editar*/}
                  <IconButton
                    variant="solid"
                    highContrast
                    style={{ cursor: "pointer" }}
                  >
                    <FaEdit />
                  </IconButton>
                  {/* Boton de eliminar*/}
                  <IconButton
                    variant="solid"
                    highContrast
                    style={{ cursor: "pointer" }}
                    onClick={()=> handleDelete(data.id)} //llama a la funcion handleDelete pasandole el id del item
                  >
                    <FaTrash />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*Componente de paginacion*/}
      <PaginationComponent
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

