import "express-serve-static-core";
import { AuthUser } from "../../types/auth-user.js";

declare module "express-serve-static-core" {

    interface Request {

        user: AuthUser;

    }

}