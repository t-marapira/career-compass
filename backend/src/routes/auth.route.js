import { Router } from "express";

import * as authController from "../controllers/auth.controller.js";
import {
  validateCreateUser,
  validateGetUser,
} from "../validation/auth.validation.js";

const authRouter = Router();

authRouter.get("/", validateGetUser, authController.getUser);
authRouter.post("/", validateCreateUser, authController.createUser);

export default authRouter;
