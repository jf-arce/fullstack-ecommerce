import { ButtonCustom } from "@/components/ButtonCustom/ButtonCustom";
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { useEffect, useState } from "react";
import { getAllProducts, getProductsFilteredByName } from "@/lib/getData";
import { productsColumns } from "@/components/TableComponent/columns/productsColumns";
import { Search } from "@/components/Search";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ContainerComponents from "@/components/ContainerComponents";
import { useDebouncedCallback } from 'use-debounce';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllProducts().then((products) =>
      setProducts(
        products.map((prod) => ({
          id: prod.idProducto,
          name: prod.nombre,
          price: prod.precio,
          brand: prod.marca,
          category: prod.categoria,
          stock: prod.stock,
        }))
      )
    );
  }, []);

  useEffect(()=>{
    if(searchTerm){
      getProductsFilteredByName(searchTerm)
        .then((prod)=>{
          if(prod){
            setFilteredProducts(
              prod.map((prod) => ({
                id: prod.idProducto,
                name: prod.nombre,
                price: prod.precio,
                brand: prod.marca,
                category: prod.categoria,
                stock: prod.stock,
              }))
            )
          }
        })
    }else{
      setFilteredProducts([]);
    }
  },[searchTerm])

  const handleFilter = useDebouncedCallback((search) => {
    setSearchTerm(search);
  },300) 

  const tableConfig = {
    data: filteredProducts.length > 0 ? filteredProducts : products,
    itemsPerPage: 6,
    columns: productsColumns,
  };

  return (
    <main className="h-full px-10 py-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Search handleFilter={handleFilter} placeholder="Buscar por nombre" />
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
            </form>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ContainerComponents>
        <TableComponent {...tableConfig} />
      </ContainerComponents>
    </main>
  );
}
