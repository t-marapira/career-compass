import { Router } from "express";
import { validateGetData } from "../validation/data.validation.js";
import { getData } from "../controllers/data.controller.js";

const dataRouter = Router();

dataRouter.get("/",validateGetData,getData)

export default dataRouter;