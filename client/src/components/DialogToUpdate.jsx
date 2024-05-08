import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
  } from "@/components/ui/dialog";
  import { ButtonCustom } from "@/components/ButtonCustom/ButtonCustom";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  import { useGetPromotions } from "@/hooks/useGetPromotions";
  import { useGetCategories } from "@/hooks/useGetCategories";
  import { handleSubmitNewProduct } from "@/lib/handleSubmitNewProduct";
  import { IconButton } from "@radix-ui/themes";
    import { FaEdit } from "react-icons/fa";
  
  export const DialogToUpdate = ({refreshTable,handleUpdate, id}) => {

    //Cosas para hacer
    //Traer el objeto lleno con los datos del producto para mostrar por defecto en el formulario
  



    //Traer las categorias
    const categories = useGetCategories();
    //Traer las distintas promociones que existen  en la base de datos para mostrarlas en el dialog
    const promotions = useGetPromotions();
  
    const [hasPromotion, setHasPromotion] = useState(false); //Estado para saber si el producto tiene promocion
  
    //Hacer: Cuando cierra el dialog tiene que volver el estado a false
    const handlePromotion = (e) => {
      if (e.target.value === "yes") {
        setHasPromotion(true);
      } else {
        setHasPromotion(false);
      }
    };
  
  
    return (
      <>
        <Dialog>
          <DialogTrigger>

            {/* <IconButton
                variant="solid"
                highContrast
                style={{ cursor: "pointer" }}
                onClick={()=>handleUpdate(id)}
            >
                
            </IconButton> */}
           
            <FaEdit onClick={()=>handleUpdate(id)}/>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modificar producto</DialogTitle>
            </DialogHeader>
            {/*Formulario */}
            <form className="grid gap-4 py-4" onSubmit={(e)=>handleSubmitNewProduct(e,hasPromotion,setHasPromotion,refreshTable)}>
              {/*Nombre */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              {/*Marca */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  Marca
                </Label>
                <Input id="brand" className="col-span-3" />
              </div>
              {/*Categoria */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoria
                </Label>
                <select id="category" className="col-span-3">
                  {categories.map(((cat, index) => (
                    <option value={cat.idCategoria} key={index}>{cat.nombre}</option>
                  )))}
                </select>
              </div>
              {/*Precio */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Precio
                </Label>
                <Input id="price" className="col-span-3" type="number"/>
              </div>
              {/*Stock */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input id="stock" className="col-span-3" type="number"/>
              </div>
              {/*Descripcion */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descripcion
                </Label>
                <Input id="description" className="col-span-3" />
              </div>
              {/*Talles */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="size" className="text-right">
                  Talles disponibles
                </Label>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="xs" name="xs" value="1" />
                  <label htmlFor="xs">XS</label>
                  <input type="checkbox" id="s" name="s" value="2" />
                  <label htmlFor="s">S</label>
                  <input type="checkbox" id="m" name="m" value="3" />
                  <label htmlFor="m">M</label>
                  <input type="checkbox" id="l" name="l" value="4" />
                  <label htmlFor="l">L</label>
                  <input type="checkbox" id="xl" name="xl" value="5" />
                  <label htmlFor="xl">XL</label>
                </div>
              </div>
              {/* Promociones */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="promotion" className="text-right">
                  ¿Posee promocion?
                </Label>
                <div className="flex gap-3 justify-center items-center">
                  <input
                    type="radio"
                    id="yes"
                    name="promotion"
                    value="yes"
                    onChange={handlePromotion}
                  />
                  <label htmlFor="yes">Si</label>
                  <input
                    type="radio"
                    id="no"
                    name="promotion"
                    value="no"
                    onChange={handlePromotion}
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>
              {
                /* Si se selecciona que si posee promocion, se muestra el select con las promociones disponibles */
                hasPromotion && (
                  <div className="flex gap-3 justify-center items-center">
                    <Label htmlFor="promotion" className="text-right">
                      Seleccionar promocion
                    </Label>
                    <select id="promotion" className="col-span-3 w-full">
                      {promotions.map((promo) => (
                        <option key={promo.id} value={promo.id}>
                          {promo.descripcion}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              }
              <DialogFooter>   
                <DialogClose asChild>
                  <Button type="submit">Guardar</Button>
                </DialogClose>           
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  