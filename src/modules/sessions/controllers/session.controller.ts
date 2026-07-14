import { Request, Response } from "express";
import { sessionManager } from "../services/session-manager.instance.js";


export class SessionController {


    public getSession = (
        req: Request,
        res: Response
    ) => {


        const { sessionId } =
            req.params;


        const session =
            sessionManager.getSession(
                sessionId
            );


        if(!session){

            return res.status(404).json({
                active:false
            });

        }


        res.json({

            active:true,

            accountId:
                session.accountId,

            userId:
                session.userId,

            createdAt:
                session.createdAt,

            lastAccess:
                session.lastAccess

        });

    };


}