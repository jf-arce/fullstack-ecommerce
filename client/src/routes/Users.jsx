import { ButtonCustom } from "@/components/ButtonCustom/ButtonCustom";
import { Search } from "@/components/Search";
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { usersColumns } from "@/components/TableComponent/columns/usersColumns";
import { getAllUsers } from "@/lib/getData";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

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

  const handleFilter = (search) => {
    const userFiltered = users.filter((user) =>
      user.nombre.toLowerCase().includes(search.toLowerCase()) || 
      user.userName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(userFiltered);
  };

  const tableConfig = {
    data: filteredUsers.length > 0 ? filteredUsers : users,
    itemsPerPage: 6,
    columns: usersColumns,
  };

  return (
    <main className="bg-neutral-800 h-full px-10 py-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Search handleFilter={handleFilter} placeholder="Buscar por nombre" />
        <ButtonCustom />
      </div>
      <TableComponent {...tableConfig} />
    </main>
  );
}
