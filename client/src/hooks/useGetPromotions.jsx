import { getAllPromotions } from "@/lib/getData";
import { useState, useEffect } from "react";

export const useGetPromotions = () => {
    const [promotions, setPromotions] = useState([]);

    //Fetch de promociones
    useEffect(()=>{
        getAllPromotions().then((proms)=>{
          setPromotions(proms.map(prom => {
            return {
              id: prom.idPromocion,
              descripcion: prom.descripcion,
              descuento: prom.descuento,
              fechaInicio: prom.fechaInicio,
              fechaFin: prom.fechaFin,
              estado: prom.estado,
            }
          }));
        });
    },[])

    return promotions;
}
