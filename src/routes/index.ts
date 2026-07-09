import { Router } from "express";
import accountRoutes from "./account.routes.js";
import authRoutes from "./auth.routes.js";


const router = Router();


router.use("/accounts", accountRoutes);

router.use("/auth", authRoutes);


export default router;