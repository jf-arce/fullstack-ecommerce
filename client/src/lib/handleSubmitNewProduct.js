import { createNewProduct } from "@/services/postData";
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const handleSubmitNewProduct = (e,hasPromotion,setHasPromotion,refreshTable) => {
    e.preventDefault();
    //Obtener los valores del formulario
    const name = e.target.querySelector("#name").value;
    const brand = e.target.querySelector("#brand").value;
    const category = parseInt(e.target.querySelector("#category").value);
    const price = parseFloat(e.target.querySelector("#price").value);
    const stock = parseInt(e.target.querySelector("#stock").value);
    const description = e.target.querySelector("#description").value;
    //Obtener los talles seleccionados
    const size = e.target.querySelectorAll('input[type="checkbox"]'); //Devuelve un NodeList
    const sizeChecked = Array.from(size) //Convertir a un array
      .filter((input) => input.checked === true) //Filtrar los que esten seleccionados
      .map((input) =>  parseInt(input.value)); //y luego mapeo para obtener solo los valores 
    
    //Si tiene promocion, se obtiene el valor del select
    if(hasPromotion){
      const promotion = parseFloat(e.target.querySelector("#promotion").value);
      const newProduct = {
        name,
        brand,
        category,
        price,
        stock,
        description,
        size: sizeChecked,
        promotion,
      };
      createNewProduct(newProduct).then(()=>{
        refreshTable(); //Se renderiza de nuevo la tabla
      });
    }else{ //Si no tiene promocion, se crea el producto sin el campo sale
      const newProduct = {
        name,
        brand,
        category,
        price,
        stock,
        description,
        size: sizeChecked
      };
      createNewProduct(newProduct).then(()=>{ 
        refreshTable(); //Se renderiza de nuevo la tabla
      });
    }
    //Mostrar una notificacion de que se agrego el producto
    toast.success('Producto agregado',{
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl:false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme:"colored",
      transition: Bounce
    })
    setHasPromotion(false); //Se vuelve a poner el estado de si tiene promocion en false
};