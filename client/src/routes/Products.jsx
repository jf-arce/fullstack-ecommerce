import { ButtonCustom } from "@/components/ButtonCustom/ButtonCustom";
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/getData";
import { columns } from "@/components/TableComponent/columns";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then((data) =>
            setProducts(
                data.map((product) => ({
                id: product.id,
                name: product.title,
                price: product.price,
                brand: product.brand,
                category: product.category,
                }))
            )
        );
    }, []);

    const tableConfig = {
        data: products,
        itemsPerPage: 6,
        columns,
    }

  return (
    <main className="bg-neutral-800 h-full px-10 py-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl">Productos</h2>
        <ButtonCustom />
      </div>
      <TableComponent {...tableConfig}/>
    </main>
  );
}
