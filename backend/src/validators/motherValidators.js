import { body, param } from "express-validator";

export const motherIdParam = [
  param("id").notEmpty().withMessage("Mother ID is required"),
];

export const createMotherValidator = [
  body("fullName").notEmpty().withMessage("fullName is required"),
  body("nationalId").notEmpty().withMessage("nationalId is required"),
  body("phoneNumber").notEmpty().withMessage("phoneNumber is required"),
  body("status").notEmpty().withMessage("status is required"),
];

export const updateMotherValidator = [
  ...motherIdParam,
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error("At least one field must be provided to update");
    }
    return true;
  }),
];

