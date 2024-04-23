import { Router } from "express";
import { PromotionController } from "../controllers/promotion.controller.js";

export const promotionsRouter = Router();


promotionsRouter.get('/', PromotionController.getAll)