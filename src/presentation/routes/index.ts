import { Router } from "express";
import registerRouter from "./register.js";
import loginRouter from "./login.js";
import meRouter from "./me.js";

const router = Router();

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/me", meRouter);

export default router;
