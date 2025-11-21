import { Router } from "express";
import { updateProfile } from "../controllers/profileController.js";
import { authenticate } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";
import { updateProfileValidator } from "../validators/profileValidators.js";

const router = Router();

router.use(authenticate);
router.put("/updateProfile", updateProfileValidator, handleValidation, updateProfile);

export default router;

