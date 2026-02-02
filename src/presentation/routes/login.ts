import { Router } from "express";
import { authController } from "../controllers/AuthController.js";

const router = Router();

router.post("/", (req, res) => authController.login(req, res));

export default router;
