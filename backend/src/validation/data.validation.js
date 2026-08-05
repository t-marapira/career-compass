import { body } from "express-validator";

export const validateGetData = [
  body("id").optional().notEmpty().withMessage("Valid id is required"),
  body("moduleIds").isArray({ min: 1 }).withMessage("moduleIds[] is required"), //TODO : Add a way to choose between a user and/or modules
  body("targetRoleId").notEmpty().withMessage("targetRoleId is required"),
];
