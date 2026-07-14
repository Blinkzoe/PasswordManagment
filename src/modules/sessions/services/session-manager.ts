import { randomUUID } from "crypto";
import { Browser, BrowserContext, Page } from "playwright";
import { Session } from "../types/session.js";


export class SessionManager {


    private sessions =
        new Map<string, Session>();



    public createSession(

        userId: string,

        accountId: string,

        browser: Browser,

        context: BrowserContext,

        page: Page

    ): string {


        const sessionId =
            randomUUID();



        const session: Session = {


            id: sessionId,


            userId,


            accountId,


            browser,


            context,


            page,


            createdAt: new Date(),


            lastAccess: new Date()


        };



        this.sessions.set(
            sessionId,
            session
        );

        browser.on(
            "disconnected",
            () => {

                this.sessions.delete(
                    sessionId
                );

                console.log(
                    `Session ${sessionId} removed because browser closed`
                );

            }
        );

        return sessionId;

    }




    public getSession(
        sessionId: string
    ): Session | undefined {



        const session =
            this.sessions.get(
                sessionId
            );



        if (session) {


            session.lastAccess =
                new Date();


        }



        return session;

    }


        public hasSessionAlive(
            session: Session
        ): boolean {


            try {

                return session.browser.isConnected();

            } catch {

                return false;

            }

        }


        public async findByAccount(
            userId:string,
            accountId:string
        ): Promise<Session | undefined> {


            for (const session of this.sessions.values()) {


                if (
                    session.userId === userId &&
                    session.accountId === accountId
                ) {


                    console.log("CHECKING SESSION");

                    console.log({
                        id: session.id,
                        connected: session.browser.isConnected(),
                        pages: session.context.pages().length
                    });


                    const pages =
                        session.context.pages();


                    if (
                        !session.browser.isConnected() ||
                        pages.length === 0
                    ) {

                        console.log(
                            "Removing dead session:",
                            session.id
                        );


                        this.sessions.delete(
                            session.id
                        );


                        return undefined;

                    }

                    return session;

                }

            }


            return undefined;

        }


    public async closeSession(

        sessionId: string

    ): Promise<void> {



        const session =
            this.sessions.get(
                sessionId
            );



        if (!session) {


            return;


        }



        await session.browser.close();



        this.sessions.delete(
            sessionId
        );


    }


}