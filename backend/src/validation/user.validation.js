import { body } from "express-validator";

export const validateAddUserModule = [
  body("moduleIds").isArray({ min: 1 }).withMessage("moduleIds[] is required"),
  body("moduleIds.*").notEmpty().withMessage("module Ids are required"),
];

export const validateAddUserSkill = [
  body("skillIds").isArray({ min: 1 }).withMessage("skillIds[] is required"),
  body("skillIds.*").notEmpty().withMessage("skill Ids are required"),
];
