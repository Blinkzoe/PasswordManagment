import { Request, Response } from "express";
import { AccountService } from "../services/account.service.js";


export class AccountController {

    private accountService = new AccountService();


    public getAccountsByUserId = (
        req: Request,
        res: Response
    ): void => {

        const { userId } = req.params;

        if (typeof userId !== "string") {
            res.status(400).json({
                message: "Invalid user id"
            });
            return;
        }

        const accounts = this.accountService.getAccountsByUserId(userId);

        res.json(accounts);

    };

}