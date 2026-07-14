import { Router } from "express";
import accountRoutes from "../modules/accounts/routes/account.routes.js";
import authRoutes from "../modules/auth/routes/auth.routes.js";
import passwordRoutes from "../modules/vault/routes/password.routes.js";
import loginRoutes from "../modules/automation/routes/login.routes.js";;
import sessionRoutes from "../modules/sessions/routes/session.routes.js";

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
router.use(
    "/sessions",
    sessionRoutes
);
export default router;