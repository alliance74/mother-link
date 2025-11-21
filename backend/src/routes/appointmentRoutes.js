import { Router } from "express";
import { getUpcomingAppointments } from "../controllers/appointmentController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);
router.get("/upcoming", getUpcomingAppointments);

export default router;

