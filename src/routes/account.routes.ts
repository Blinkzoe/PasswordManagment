import { Router } from "express";
import { AccountController } from "../controllers/account.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

const accountController = new AccountController();


router.get(
    "/",
    authMiddleware,
    accountController.getMyAccounts
);


export default router;