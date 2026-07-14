import { Router } from "express";
import { SessionController } from "../controllers/session.controller.js";
import { authMiddleware } from "../../../shared/middlewares/auth.middleware.js";


const router = Router();


const controller =
    new SessionController();


router.get(
    "/:sessionId",
    authMiddleware,
    controller.getSession
);


export default router;