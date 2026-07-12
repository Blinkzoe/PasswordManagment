import { Request, Response } from "express";
import { AccountService } from "../services/account.service.js";

export class AccountController {

    private accountService = new AccountService();

    public getMyAccounts = (
        req: Request,
        res: Response
    ): void => {

        const userId = req.user.userId;

        const accounts =
            this.accountService.getMyAccounts(userId);

        res.json(accounts);

    };

}