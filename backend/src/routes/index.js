import { Router } from "express";
import authRoutes from "./authRoutes.js";
import motherRoutes from "./motherRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import profileRoutes from "./profileRoutes.js";

const router = Router();

router.use("/mobile/healthworkers", authRoutes);
router.use("/mobile/healthworkers", motherRoutes);
router.use("/mobile/healthworkers/appointments", appointmentRoutes);
router.use("/mobile/healthworkers/notifications", notificationRoutes);
router.use("/mobile/healthworkers", profileRoutes);

export default router;

