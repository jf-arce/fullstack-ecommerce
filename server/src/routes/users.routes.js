import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";

export const usersRouter = Router();

usersRouter.get('/', UserController.getAll);