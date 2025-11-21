import { Router } from "express";
import { getTodayNotifications } from "../controllers/notificationController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);
router.get("/today", getTodayNotifications);

export default router;

