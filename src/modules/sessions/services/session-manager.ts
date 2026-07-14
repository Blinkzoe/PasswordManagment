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

                console.log(
                    "Browser disconnected:",
                    sessionId
                );

                this.sessions.delete(
                    sessionId
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



    public getAllSessions(): Session[] {

        return Array.from(
            this.sessions.values()
        );

    }



    public findByAccount(

        userId: string,

        accountId: string

    ): Session | undefined {

        for (const session of this.sessions.values()) {

            if (

                session.userId === userId &&

                session.accountId === accountId

            ) {

                const pages =
                    session.context.pages();

                console.log("Checking session");

                console.log({

                    id:
                        session.id,

                    connected:
                        session.browser.isConnected(),

                    pages:
                        pages.length,

                    pageClosed:
                        pages.length > 0
                            ? pages[0].isClosed()
                            : true

                });

                if (

                    !session.browser.isConnected() ||

                    pages.length === 0 ||

                    pages[0].isClosed()

                ) {

                    console.log(
                        "Removing dead session"
                    );

                    this.sessions.delete(
                        session.id
                    );

                    return undefined;

                }

                session.lastAccess =
                    new Date();

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