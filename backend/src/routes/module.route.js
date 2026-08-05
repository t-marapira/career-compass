import { Router } from "express";
import { validateAddSkill, validateCreateModule } from "../validation/module.validation.js";
import { addSkills, createModule, getModuleByID, getModules } from "../controllers/module.controller.js";

const moduleRouter = Router();

moduleRouter.post("/", validateCreateModule, createModule);
moduleRouter.get("/", getModules);
moduleRouter.post("/:id",validateAddSkill,addSkills)
moduleRouter.get("/:id",getModuleByID)

export default moduleRouter;
