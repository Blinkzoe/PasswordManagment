import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { PasswordController } from "../controllers/password.controller.js";


const router = Router();


const passwordController =
    new PasswordController();



router.post(
    "/:accountId/reveal-password",
    authMiddleware,
    passwordController.revealPassword
);



export default router;