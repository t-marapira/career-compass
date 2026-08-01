import { Router } from "express";
import { validateAddSkill, validateCreateModule } from "../validation/module.validation.js";
import { addSkills, createModule, getModules } from "../controllers/module.controller.js";

const moduleRouter = Router();

moduleRouter.post("/", validateCreateModule, createModule);
moduleRouter.get("/", getModules);
moduleRouter.post("/:id",validateAddSkill,addSkills)

export default moduleRouter;
