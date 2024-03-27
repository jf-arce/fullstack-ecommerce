import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "./Search";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = () => {

  const {pathname} = useLocation();
  const [title, setTitle] = useState('');

  useEffect(()=>{
    switch (pathname) {
      case '/dashboard':
        setTitle('Dashboard');
        break;
      case '/users':
        setTitle('Usuarios');
        break;
      case '/products':
        setTitle('Productos');
        break;
      case '/orders':
        setTitle('Ordenes');
        break;
      case '/shipping':
        setTitle('Envios');
        break;
      case '/transactions':
        setTitle('Transacciones');
        break;
      default:
        setTitle('Urban Drip Store DB');
        break;
    }
  },[pathname])
  
  return (
    <header className="flex items-center gap-6 justify-between py-5 px-10 ">
      <h1 className="text-white text-2xl font-bold">{title}</h1>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};
