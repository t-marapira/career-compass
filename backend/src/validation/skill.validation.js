import { body } from "express-validator";

export const validateCreateSkill=[
    body("name").notEmpty().withMessage("name is required"),
    body("recommendations").isArray({min:1}).withMessage("reccommendations[] is required with atleast 1 value"),
    body("recommendations.*").isString().withMessage("recommendations must be strings"),
]