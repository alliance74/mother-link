import { Router } from "express";
import { loginHealthWorker, registerHealthWorker } from "../controllers/authController.js";
import { handleValidation } from "../middleware/validate.js";
import { loginValidator, registerValidator } from "../validators/authValidators.js";

const router = Router();

router.post("/register", registerValidator, handleValidation, registerHealthWorker);
router.post("/login", loginValidator, handleValidation, loginHealthWorker);

export default router;

