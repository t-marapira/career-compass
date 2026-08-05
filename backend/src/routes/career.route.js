import { Router } from "express";
import {
  validateAddSkill,
  validateCreateCareer,
} from "../validation/career.validation.js";
import {
  addSkill,
  createCareer,
  getCareerByID,
  getCareers,
} from "../controllers/career.controller.js";

const careerRouter = Router();

careerRouter.post("/", validateCreateCareer, createCareer);
careerRouter.get("/", getCareers);
careerRouter.post("/:id", validateAddSkill, addSkill);
careerRouter.get("/:id", getCareerByID);

export default careerRouter;
