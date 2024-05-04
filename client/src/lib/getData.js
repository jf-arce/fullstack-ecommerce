//Products
export const getAllProducts = async () => {
    try{
        const res = await fetch('http://localhost:1234/products');
        const data = await res.json();
        return data;
    }catch(err){
        console.log('No se pudo obtener los productos: ', err.message);
    };
};
export const getProductsFilteredByName = async(name)=>{
    try{
        const res =  await fetch(`http://localhost:1234/products/?name=${name}`);
        const data = await res.json();
        
        return data;
    }catch(e){
        console.log(e);
    }
}

//Users
export const getAllUsers = async () =>{
    try{
        const res = await fetch('http://localhost:1234/users');
        const users = await res.json();
        return users;
    }catch(err){
        console.log('No se pudo obtener los usuarios: ', err.message);
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
    }
}

//Categories
export const getAllCategories = async () => {
    try{
        const res = await fetch(`http://localhost:1234/categories`);
        const data = res.json();
    
        return data;
    }catch(e){

    }
}

//Promotions
export const getAllPromotions = async () => {
    const res = await fetch("http://localhost:1234/promotions");
    const data = await res.json();
  
    return data;
}