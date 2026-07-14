import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { LoginAutomationController } from "../controllers/login-automation.controller.js";


const router = Router();


const controller =
    new LoginAutomationController();



router.post(
    "/:accountId/login",
    authMiddleware,
    controller.login
);


export default router;