import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";


export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {


    if (err instanceof AppError) {

        res
            .status(err.statusCode)
            .json({
                message: err.message
            });

        return;
    }


    res
        .status(500)
        .json({
            message: "Internal server error"
        });

}