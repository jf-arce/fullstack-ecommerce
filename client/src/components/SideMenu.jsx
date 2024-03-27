import { IconButton } from "@radix-ui/themes";
import { NavBar } from "@/components/NavBar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
export const SideMenu = () => {
  return (
    <aside className="px-8 py-5 flex flex-col gap-5 text-white bg-slate-950">
      <div className="flex justify-between">
        <Link to="/">
          <h1 className="text-xl font-bold">Urban Drip Store DB</h1>
        </Link>
        <IconButton variant="solid" highContrast style={{ cursor: "pointer" }}>
          <IoMdNotificationsOutline />
        </IconButton>
      </div>
      <NavBar />
    </aside>
  );
};
