import { Router } from "express";
import { AccountController } from "../controllers/account.controller.js";
import { LoginAutomationController } from "../../automation/controllers/login-automation.controller.js";
import { authMiddleware } from "../../../shared/middlewares/auth.middleware.js";

const router = Router();

const accountController = new AccountController();

const loginAutomationController =
    new LoginAutomationController();


router.get(
    "/",
    authMiddleware,
    accountController.getMyAccounts
);


router.get(
    "/:accountId",
    authMiddleware,
    accountController.getAccountById
);


router.post(
    "/:accountId/login",
    authMiddleware,
    loginAutomationController.login
);


export default router;