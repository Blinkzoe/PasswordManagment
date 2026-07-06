import { Router } from "express";
import { HomeController } from "../controllers/home.controller.js";
import accountRouter from "./account.routes.js";

const router = Router();

const homeController = new HomeController();

router.get("/", homeController.getStatus);
router.use("/accounts", accountRouter);

export default router;