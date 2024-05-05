//Products
export const getAllProducts = async () => {
    try{
        const res = await fetch('http://localhost:1234/products');
        const data = await res.json();
        //Si la respuesta es correcta devolvemos los datos sino devolvemos un array vacio
        if(res.ok){
            return data;
        }else{
            return [];
        }

    }catch(err){
        console.log('No se pudo obtener los productos: ', err.message);
        return []; //Si hay un error en la peticion devolvemos un array vacio
    };
};
export const getProductsFilteredByName = async(name)=>{
    try{
        const res =  await fetch(`http://localhost:1234/products/?name=${name}`);
        const data = await res.json();

        if(res.ok){
            return data;
        }else{
            return [];
        }
        
    }catch(e){
        console.error('Error al obtener productos filtrados:', e.message);
        return [];
    }
}

//Users
export const getAllUsers = async () =>{
    try{
        const res = await fetch('http://localhost:1234/users');
        const data = await res.json();
        
        if(res.ok){
            return data;
        }else{
            return [];
        }
    }catch(err){
        console.log('No se pudo obtener los usuarios: ', err.message);
        return [];
    }   
}

export const getUsersFilteredByName = async(name)=>{
    try{
        const res = await fetch(`http://localhost:1234/users/?name=${name}`);
        if (!res.ok){
            return undefined;
        }
        const data = await res.json();
        return data;
    }catch(err){
        console.log(err);
        return [];
    }
}

//Categories
export const getAllCategories = async () => {
    try{
        const res = await fetch(`http://localhost:1234/categories`);
        const data = res.json();
    
        if(res.ok){
            return data;
        }else{
            return [];
        }
    }catch(e){
        console.log("Error al recuperar las categorias");
        return [];
    }
}

//Promotions
export const getAllPromotions = async () => {
    try{
        const res = await fetch("http://localhost:1234/promotions");
        const data = await res.json();
      
        if(res.ok){
            return data;
        }else{
            return [];
        }
    }catch(e){
        console.log("Error al recuperar las promociones");
        return [];
    }
}