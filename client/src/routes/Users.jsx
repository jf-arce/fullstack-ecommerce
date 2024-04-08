import { ButtonCustom } from "@/components/ButtonCustom/ButtonCustom";
import ContainerComponents from "@/components/ContainerComponents";
import { Search } from "@/components/Search";
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { usersColumns } from "@/components/TableComponent/columns/usersColumns";
import { getAllUsers, getUsersFilteredByName } from "@/lib/getData";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllUsers().then((users) => {
      setUsers(
        users.map((user) => ({
          id: user.idUsuario,
          userName: user.nombre_usuario,
          nombre: user.nombre_cliente,
          correo: user.correo,
          telefono: user.telefono,
          direccion: user.direccion,
        }))
      );
    });
  }, []);

  useEffect(()=>{
    if(searchTerm){
      getUsersFilteredByName(searchTerm).then((users)=>{
        if(users){
          setFilteredUsers(
            users.map((user) => ({
              id: user.idUsuario,
              userName: user.nombre_usuario,
              nombre: user.nombre_cliente,
              correo: user.correo,
              telefono: user.telefono,
              direccion: user.direccion,
            }))
          );
        }
      })
    }else{
      setFilteredUsers([]);
    }
  },[searchTerm])
  
  const handleFilter = useDebouncedCallback((search) => {
    setSearchTerm(search);
  },300);

  const tableConfig = {
    data: filteredUsers.length > 0 ? filteredUsers : users,
    itemsPerPage: 6,
    columns: usersColumns,
  };

  return (
    <main className="h-full px-10 py-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Search handleFilter={handleFilter} placeholder="Buscar por nombre" />
        <ButtonCustom />
      </div>
      <ContainerComponents>
        <TableComponent {...tableConfig} />
      </ContainerComponents>
    </main>
  );
}
