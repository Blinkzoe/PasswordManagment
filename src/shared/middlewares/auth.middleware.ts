import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";
import { verifyToken } from "../utils/jwt.js";
import { JwtPayload } from "../types/jwt-payload.js";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authorization = req.headers.authorization;

    if (!authorization) {
        throw new AppError(
            "Authentication token is required",
            401
        );
    }

    const token = authorization.replace(
        "Bearer ",
        ""
    );

    try {

       const payload = verifyToken(token);
       req.user = {

            userId: payload.userId,
            role: payload.role

        };

        next();

    } catch {

        throw new AppError(
            "Invalid or expired token",
            401
        );

    }

}