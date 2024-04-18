import { Router } from "express";
import { readJson } from "../utils/readFiles.js";
import { ProductController } from "../controllers/products.controller.js";

const products = readJson('src/db/products.json');

export const productsRouter = Router();    

productsRouter.get('/', ProductController.getAll);

productsRouter.post('/', ProductController.addProduct)