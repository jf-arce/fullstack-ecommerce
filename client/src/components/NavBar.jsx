import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { MdInventory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";

export const NavBar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-4">
        <li className="flex gap-2 items-center hover:font-black hover:translate-x-6 transition-all hover:text-blue-800">
            <MdSpaceDashboard/>
          <Link to="/">Dashboard</Link>
        </li>
        <li className="flex gap-2 items-center hover:font-black hover:translate-x-6 transition-all hover:text-blue-800">
            <FaUsers/>
            <Link to="/users">Users</Link>
        </li>
        <li className="flex gap-2 items-center hover:font-black hover:translate-x-6 transition-all hover:text-blue-800"> 
          <MdInventory/>
          <Link to="/products">Products</Link>
        </li>
        <li className="flex gap-2 items-center hover:font-black hover:translate-x-6 transition-all hover:text-blue-800">
          <FaShoppingCart/>
          <Link to="/orders">Pedidos</Link>
        </li>
        <li className="flex gap-2 items-center hover:font-black hover:translate-x-6 transition-all hover:text-blue-800"> 
          <MdLocalShipping/>
          <Link to="/shipping">Envios</Link>
        </li>
        <li className="flex gap-2 items-center hover:font-black hover:translate-x-6 transition-all hover:text-blue-800">
          <FaMoneyCheckDollar/>
          <Link to="/transactions">Transacciones</Link>
        </li>
      </ul>
    </nav>
  );
};
