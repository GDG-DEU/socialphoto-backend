import { Router } from "express";
import { authController } from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, (req, res) => authController.getMe(req, res));

export default router;