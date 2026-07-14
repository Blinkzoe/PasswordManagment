import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";


export class AuthController {

    private authService = new AuthService();


    public login = async (
        req: Request,
        res: Response
    ): Promise<void> => {


        const { username, password } = req.body;


        const result = await this.authService.login(
            username,
            password
        );


        res.json(result);

    };

}