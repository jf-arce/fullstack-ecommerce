import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

export const categoriesRouter = Router();

categoriesRouter.get('/', CategoryController.getAll);