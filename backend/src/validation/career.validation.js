import { body } from "express-validator";

export const validateCreateCareer = [
  body("name").notEmpty(),
  body("skillIds").isArray(),
];

export const validateAddSkill = [body("skillIds").isArray({ min: 1 })];
