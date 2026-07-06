import { Router } from "express";
import { AccountController } from "../controllers/account.controller.js";


const router = Router();

const accountController = new AccountController();


router.get("/", accountController.getAccounts);


export default router;