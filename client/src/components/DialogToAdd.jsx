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
import { createNewProduct } from "@/lib/postData";


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

  const [newProduct, setNewProduct] = useState({});
  const [hasPromotion, setHasPromotion] = useState(false);
  

  const handlePromotion = (e) => {
    if(e.target.value === "yes"){
      setHasPromotion(true);
    }else{
      setHasPromotion(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.querySelector('#name').value;
    const brand = e.target.querySelector('#brand').value;
    const category = e.target.querySelector('#category').value;
    const price = parseFloat(e.target.querySelector('#price').value);
    const stock = parseInt(e.target.querySelector('#stock').value);
    const description = e.target.querySelector('#description').value;
    const size = e.target.querySelectorAll('input[type="checkbox"]');
    const sizeChecked = Array.from(size).filter((input)=> input.checked === true).map((input)=> input.value);
    const sale = parseFloat(e.target.querySelector('#sale').value); 

    setNewProduct(
      {
        title,
        brand,
        category,
        price,
        stock,
        description,
        size: sizeChecked,
        sale
      }
    );
  }

  //Fecth para crear el producto y mandarlo al backend

  useEffect(()=>{
    createNewProduct(newProduct)
  },[newProduct]);

  
  
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
            <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
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
                <Label htmlFor="size" className="text-right">
                  Talles disponibles del producto
                </Label>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="xs" name="xs" value="1"/>
                  <label htmlFor="xs">XS</label>
                  <input type="checkbox" id="s" name="s" value="2"/>
                  <label htmlFor="s">S</label>
                  <input type="checkbox" id="m" name="m" value="3"/>
                  <label htmlFor="m">M</label>
                  <input type="checkbox" id="l" name="l" value="4"/>
                  <label htmlFor="l">L</label>
                  <input type="checkbox" id="xl" name="xl" value="5"/>
                  <label htmlFor="xl">XL</label>
                </div>
              </div>
              {/* Promociones */}
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
                    <Label htmlFor="sale" className="text-right">
                      Seleccionar promocion
                    </Label>
                    <select id="sale" className="col-span-3">
                      {
                        promociones.map((promo)=> (
                          <option key={promo.id} value={promo.id}>{promo.descripcion}</option>
                        ))
                      }
                    </select>
                  </div>
                )
              }
              <DialogFooter>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    </>
  )
}
