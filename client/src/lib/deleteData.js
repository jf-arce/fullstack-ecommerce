export const deleteProduct = async(id)=>{
    
    try {
        await fetch(`http://localhost:1234/products/${id}`,
        {
            method: 'DELETE',
        })
        console.log(id);

    } catch (error) {
        console.log(error);
    }
}