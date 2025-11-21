import { body } from "express-validator";

export const registerValidator = [
  body("chwId").notEmpty().withMessage("chwId is required"),
  body("fullName").notEmpty().withMessage("fullName is required"),
  body("gender").notEmpty().withMessage("gender is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("nationalId").notEmpty().withMessage("nationalId is required"),
  body("cell").notEmpty().withMessage("cell is required"),
  body("village").notEmpty().withMessage("village is required"),
  body("district").notEmpty().withMessage("district is required"),
  body("sector").notEmpty().withMessage("sector is required"),
  body("phoneNumber").notEmpty().withMessage("phoneNumber is required"),
  body("dateJoined").isISO8601().withMessage("dateJoined must be a valid date"),
  body("status").notEmpty().withMessage("status is required"),
  body("password").isLength({ min: 8 }).withMessage("password must be >= 8 chars"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("password is required"),
];

