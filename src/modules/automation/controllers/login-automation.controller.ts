import { Request, Response } from "express";
import { LoginAutomationService } from "../services/login-automation.service.js";


export class LoginAutomationController {


    private service =
        new LoginAutomationService();



    public login = async (
        req: Request,
        res: Response
    ) => {


        const userId =
            req.user.userId;


        const accountId =
            String(req.params.accountId);



        const result =
            await this.service.login(
                userId,
                accountId
            );


        res.json(result);

    };

}