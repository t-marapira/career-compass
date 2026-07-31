import { Router } from "express";

import * as authController from "../controllers/auth.controller.js";
import {
  validateCreateUser,
  validateGetUser,
} from "../validation/auth.validation.js";

const authRoute = Router();

authRoute.get("/", validateGetUser, authController.getUser);
authRoute.post("/", validateCreateUser, authController.createUser);

export default authRoute;
