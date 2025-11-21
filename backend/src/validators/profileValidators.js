import { body } from "express-validator";

export const updateProfileValidator = [
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error("Provide at least one profile field to update");
    }
    return true;
  }),
];

