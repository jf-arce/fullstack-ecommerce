export const getAllProducts = async () => {
    try{
        const res = await fetch('http://localhost:1234/products');
        const data = await res.json();
        return data;
    }catch(err){
        console.log('No se pudo obtener la informacion: ', err.message);
    };
};