import { Router } from "express";
import { readJson } from "../utils/readFiles.js";
import { ProductController } from "../controllers/products.controller.js";

const products = readJson('src/db/products.json');

export const productsRouter = Router();    

productsRouter.get('/', ProductController.getAll);

productsRouter.get('/:id', ProductController.getProduct)

productsRouter.post('/', ProductController.addProduct);

productsRouter.delete('/:id', ProductController.deleteProduct);

productsRouter.patch('/:id', ProductController.updateProduct);