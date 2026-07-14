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