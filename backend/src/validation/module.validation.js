import { body } from "express-validator";

export const validateCreateModule = [
  body("modules")
    .isArray({ min: 1 })
    .withMessage("Module[] with at least one object is required"),
  body("modules.*.fullName")
    .notEmpty()
    .withMessage("Module fullName is required "),
  body("modules.*.code").notEmpty().withMessage("Module code is required"),
];

export const validateAddSkill = [
  body("skillIds").isArray({ min: 1 }).withMessage("skillIds[] is required"),
  body("skillIds.*").notEmpty().withMessage("skill ids are required"),
];
