import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { JwtPayload } from "../types/jwt-payload.js";

export function generateToken(payload: object): string {

    return jwt.sign(
        payload,
        env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

}

export function verifyToken(
    token: string
): JwtPayload {

    return jwt.verify(
        token,
        env.JWT_SECRET
    ) as JwtPayload;

}