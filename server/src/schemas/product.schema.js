import {z} from 'zod';

const productSchema = z.object({
    name: z.string({
        invalid_type_error: 'Title must be a string',
        required_error: 'Title is required'
    }),
    brand: z.string({
        invalid_type_error: 'Brand must be a string',
        required_error: 'Brand is required'
    }),
    category: z.number().int().positive(),
    price: z.number().positive(),
    stock: z.number().int().positive(),
    description: z.string({
        invalid_type_error: 'Description must be a string',
        required_error: 'Description is required'
    }),
    size: z.array(z.number().int().positive()), //Especificamos que tipos de datos contiene el array
    promotion: z.number().int().positive().optional()
})

export const validateProduct = (prod)=>{
    return productSchema.safeParse(prod);
}

export const validatePartialProduct = (prod) => {
    //Con el partial decimos que solo se validen los datos que se pasan,
    //No necesariamente deben estar todos
    return productSchema.partial().safeParse(prod); 
}