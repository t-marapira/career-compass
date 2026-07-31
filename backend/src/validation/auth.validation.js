import { body } from "express-validator";

export const validateGetUser = [
  body("email").isEmail().withMessage("Valid Email Required"),
  body("password").notEmpty().withMessage("Password Required"),
];

export const validateCreateUser = [
  body("email").isEmail().withMessage("Valid Email Required"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 1,
    })
    .withMessage(
      "Valid Password Containing:\nAt Least One Uppercase letter\nAt Least One Special Character\nAt Least One Number\nAt Least 8 Characters",
    ),
];
