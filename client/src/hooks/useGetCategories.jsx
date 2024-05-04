import { getAllCategories } from "@/lib/getData";
import { useEffect, useState } from "react";

export const useGetCategories = () => {
    const [categories, setCategories ]= useState([]);

    //Fetch de categorias
    useEffect(()=>{
      getAllCategories().then((data) => {
        setCategories(data);
      });
    },[])

    return categories;
}
