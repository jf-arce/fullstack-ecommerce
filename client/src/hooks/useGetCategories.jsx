import { getAllCategories } from "@/services/getData";
import { useEffect, useState } from "react";

export const useGetCategories = () => {
    const [categories, setCategories ]= useState([]);

    //Fetch de categorias
    useEffect(()=>{
      async function getCats(){
        const cat = await getAllCategories();
        if(cat.length > 0){
          setCategories(cat);
        }else{
          setCategories([]);
        }
      }
      getCats();
    },[])

    return categories;
}
