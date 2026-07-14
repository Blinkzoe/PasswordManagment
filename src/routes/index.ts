import { Router } from "express";
import accountRoutes from "./account.routes.js";
import authRoutes from "./auth.routes.js";
import passwordRoutes from "./password.routes.js";
import loginRoutes from "./login.routes.js";

const router = Router();


router.use(
    "/accounts",
    accountRoutes
);


router.use(
    "/accounts",
    passwordRoutes
);


router.use(
    "/auth",
    authRoutes
);

router.use(
    "/accounts",
    loginRoutes
);
export default router;