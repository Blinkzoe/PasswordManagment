import { Request, Response } from "express";
import { sessionManager } from "../services/session-manager.instance.js";
import { AuditRepository } from "../../audit/repositories/audit.repository.js";
import { randomUUID } from "crypto";


export class SessionController {


    private auditRepository =
        new AuditRepository();



    public getSession = (

        req: Request,

        res: Response

    ) => {


        const sessionId =
            String(req.params.sessionId);



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


            id:
                session.id,


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





    public getAll = (

        req: Request,

        res: Response

    ) => {



        const sessions =
            sessionManager.getAllSessions();



        res.json(

            sessions.map(

                session => ({


                    id:
                        session.id,


                    accountId:
                        session.accountId,


                    userId:
                        session.userId,


                    createdAt:
                        session.createdAt,


                    lastAccess:
                        session.lastAccess,


                    browserConnected:
                        session.browser.isConnected()


                })

            )

        );


    };






    public close = async (

        req: Request,

        res: Response

    ) => {


        const sessionId =
            String(req.params.sessionId);



        const userId =
            req.user.userId;



        const session =
            sessionManager.getSession(
                sessionId
            );



        if(!session){


            return res.status(404).json({

                message:"Session not found"

            });


        }




        if(session.userId !== userId){


            return res.status(403).json({

                message:"Forbidden"

            });


        }




        await sessionManager.closeSession(
            sessionId
        );




        this.auditRepository.save({

            id: randomUUID(),


            userId,


            action:"SESSION_CLOSED",


            resource:session.accountId,


            metadata:{

                sessionId

            },


            timestamp:new Date()


        });




        res.json({

            closed:true,

            sessionId

        });


    };


}