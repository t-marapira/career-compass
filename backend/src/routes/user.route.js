import { Router } from "express";
import { addUserModules, addUserSkill, getUserSkills } from "../controllers/user.controller.js";
import { validateAddUserModule as validateAddUserModules, validateAddUserSkill as validateAddUserSkills } from "../validation/user.validation.js";

const userRouter = Router();

userRouter.get("/:id/skills", getUserSkills);
userRouter.post("/:id/skills",validateAddUserSkills,addUserSkill)

// Add modules
userRouter.post("/:id/modules",validateAddUserModules,addUserModules)

export default userRouter;
