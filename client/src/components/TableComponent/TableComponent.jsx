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
 
  const [currentPage, setCurrentPage] = useState(1);
  
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);

  if (data.length === 0) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <Table className="text-white">
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
        <TableBody>
          {currentItems.map((data) => (
            <TableRow key={data.id}>
              {columns.map((column) => (
                <TableCell key={column.accesorKey}>
                  {data[column.accesorKey]}
                </TableCell>
              ))}
              <TableCell>
                <div className="flex items-center gap-4 justify-end">
                  <IconButton
                    variant="solid"
                    highContrast
                    style={{ cursor: "pointer" }}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    variant="solid"
                    highContrast
                    style={{ cursor: "pointer" }}
                    onClick={handleDelete}
                  >
                    <FaTrash />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

