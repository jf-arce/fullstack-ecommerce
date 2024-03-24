import { IconButton } from "@radix-ui/themes";
import { NavBar } from "../components/NavBar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Header } from "../components/Header";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <aside className="bg-neutral-900 px-8 py-5 flex flex-col gap-5 text-white">
        <div className="flex justify-between">
          <Link to="/">
            <h1 className="text-xl font-bold">Urban Drip Store DB</h1>
          </Link>
          <IconButton variant="solid" highContrast style={{cursor:"pointer"}} >
            <IoMdNotificationsOutline/>
          </IconButton>
        </div>
        <NavBar/>
      </aside>
      <div className="flex flex-col">
        <Header/>
        {/*El componente outlet es donde se van a renderizar todas la rutas hijas que indicamos en el children */}
        <Outlet/>
      </div>
    </div>
  );
}
