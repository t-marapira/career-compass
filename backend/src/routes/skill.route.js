import {Router} from 'express'
import { createSkill, getSkill } from '../controllers/skill.controller.js';
import { validateCreateSkill } from '../validation/skill.validation.js';

const skillRouter = Router();

skillRouter.post("/",validateCreateSkill,createSkill)
skillRouter.get("/",getSkill)

export default skillRouter;