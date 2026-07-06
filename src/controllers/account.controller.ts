import { Request, Response } from "express";
import { AccountService } from "../services/account.service.js";


export class AccountController {

    private accountService = new AccountService();


    public getAccounts = (req: Request, res: Response): void => {

        const accounts = this.accountService.getAccounts();

        res.json(accounts);

    };

}