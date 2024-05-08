import { Router } from "express";
import { getUserNotifications } from "../controllers/notifications";

const router = Router();

router.get('/', getUserNotifications);

export default router;

