import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog";
import { ButtonCustom } from "@/components/ButtonCustom/ButtonCustom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

//Traer las distintas promociones que existen  en la base de datos para mostrarlas en el dialog

export const DialogToAdd = () => {
  //Ejemplo de promociones para probar

  const promociones = [
    {
      id: 1,
      descripcion: "Promocion de verano",
      descuento: 20,
      fechaInicio: "2021-12-01",
      fechaFin: "2021-12-31",
      estado: "Activa",
    },
    {
      id: 2,
      descripcion: "Promocion de invierno",
      descuento: 30,
      fechaInicio: "2021-06-01",
      fechaFin: "2021-06-30",
      estado: "Activa",
    },
    {
      id: 3,
      descripcion: "Promocion de otoño",
      descuento: 10,
      fechaInicio: "2021-03-01",
      fechaFin: "2021-03-31",
      estado: "Activa",
    },
    {
      id: 4,
      descripcion: "Promocion de primavera",
      descuento: 15,
      fechaInicio: "2021-09-01",
      fechaFin: "2021-09-30",
      estado: "Activa",
    },
  ]

  const [promotions, setPromotions] = useState([]);
  const [hasPromotion, setHasPromotion] = useState(false);
  

  const handlePromotion = (e) => {
    if(e.target.value === "yes"){
      setHasPromotion(true);
    }else{
      setHasPromotion(false);
    }
  }
  return (
    <>
        <Dialog>
          <DialogTrigger>
            <ButtonCustom />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar nuevo producto</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  Marca
                </Label>
                <Input id="brand" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoria
                </Label>
                <Input id="category" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Precio
                </Label>
                <Input id="price" className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input id="stock" className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descripcion
                </Label>
                <Input id="description" className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="promotion" className="text-right">
                  ¿Posee promocion?
                </Label>
                <div className="flex gap-3 justify-center items-center">
                    <input type="radio" id="yes" name="promotion" value="yes" onChange={handlePromotion}/>
                    <label htmlFor="yes">Si</label>
                    <input type="radio" id="no" name="promotion" value="no" onChange={handlePromotion}/>
                    <label htmlFor="no">No</label>
                </div>
              </div>
              {
                /* Si se selecciona que si posee promocion, se muestra el select con las promociones dispnibles */
                hasPromotion && (
                  <div className="flex gap-3 justify-center items-center">
                    <Label htmlFor="description" className="text-right">
                      Seleccionar promocion
                    </Label>
                    <select id="description" className="col-span-3">
                      {
                        promociones.map((promo)=> (
                          <option key={promo.id} value={promo.id}>{promo.descripcion}</option>
                        ))
                      }
                    </select>
                  </div>
                )
              }
            </form>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  )
}
