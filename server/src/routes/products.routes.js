import { Router } from "express";
import { readJson } from "../utils/readFiles.js";

const products = readJson('src/db/products.json');

export const productsRouter = Router();    

productsRouter.get('/', (req, res) => {
    res.json(products);
});