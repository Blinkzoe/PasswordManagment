import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";


export class AuthController {

    private authService = new AuthService();


    public login = (
        req: Request,
        res: Response
    ): void => {


        const { username, password } = req.body;


        const result = this.authService.login(
            username,
            password
        );


        res.json(result);

    };

}