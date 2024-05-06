

export const createNewProduct = async (newProduct) => {
    try {
        await fetch(`http://localhost:1234/products`,
        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });         
    } catch (error) {
        console.log(error)
    }
}