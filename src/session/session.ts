import { Browser, BrowserContext, Page } from "playwright";

export interface Session {

    id: string;

    userId: string;

    accountId: string;

    browser: Browser;

    context: BrowserContext;

    page: Page;

    createdAt: Date;

    lastAccess: Date;

}