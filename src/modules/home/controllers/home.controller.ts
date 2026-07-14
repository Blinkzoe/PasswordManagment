import { Request, Response } from "express";
import { HomeService } from "../services/home.service.js";

export class HomeController {

    private homeService = new HomeService();

    public getStatus=(req: Request, res: Response): void => {
        const status = this.homeService.getStatus();
        res.json(status);
    };

}