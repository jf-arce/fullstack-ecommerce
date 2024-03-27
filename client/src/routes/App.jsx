import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import { SideMenu } from "@/components/SideMenu";


export default function App() {
  return (
    <div className="antialiased grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-gradient-to-b from-slate-950 to-slate-900 text-slate-50 font-sans">
      <SideMenu />
      <div className="flex flex-col">
        <Header />
        {/*El componente outlet es donde se van a renderizar todas la rutas hijas que indicamos en el children */}
        <Outlet />
      </div>
    </div>
  );
}
