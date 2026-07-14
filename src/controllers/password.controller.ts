import { Request, Response } from "express";
import { PasswordService } from "../services/password.service.js";


export class PasswordController {


    private passwordService =
        new PasswordService();



    public revealPassword = (
        req: Request,
        res: Response
    ): void => {


        const userId =
            req.user.userId;


        const { accountId } =
            req.params;



        const password =
            this.passwordService.revealPassword(
                userId,
                accountId
            );


        res.json({
            password
        });

    };

}