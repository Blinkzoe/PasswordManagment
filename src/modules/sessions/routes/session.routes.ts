import { Router } from "express";
import { SessionController } from "../controllers/session.controller.js";
import { authMiddleware } from "../../../shared/middlewares/auth.middleware.js";


const router =
    Router();



const controller =
    new SessionController();




// Obtener todas las sesiones

router.get(

    "/",

    authMiddleware,

    controller.getAll

);




// Obtener una sesión específica

router.get(

    "/:sessionId",

    authMiddleware,

    controller.getSession

);




// Cerrar sesión

router.delete(

    "/:sessionId",

    authMiddleware,

    controller.close

);



export default router;