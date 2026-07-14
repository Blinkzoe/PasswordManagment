import dotenv from "dotenv";

dotenv.config();

export const env = {

    port: Number(process.env.PORT) || 3000,

    JWT_SECRET: process.env.JWT_SECRET || "",

    BCRYPT_SALT_ROUNDS: Number(
        process.env.BCRYPT_SALT_ROUNDS
    ),

    ENCRYPTION_KEY:
        process.env.ENCRYPTION_KEY || ""

};