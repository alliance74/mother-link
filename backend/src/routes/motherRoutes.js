import { Router } from "express";
import {
  createMother,
  deleteMother,
  listMothers,
  totalMothers,
  updateMother,
} from "../controllers/motherController.js";
import { authenticate } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";
import {
  createMotherValidator,
  motherIdParam,
  updateMotherValidator,
} from "../validators/motherValidators.js";

const router = Router();

router.use(authenticate);

router.get("/allMothers", listMothers);
router.get("/totalMothers", totalMothers);
router.post("/createMother", createMotherValidator, handleValidation, createMother);
router.put("/update/:id", updateMotherValidator, handleValidation, updateMother);
router.delete("/delete/:id", motherIdParam, handleValidation, deleteMother);

export default router;

