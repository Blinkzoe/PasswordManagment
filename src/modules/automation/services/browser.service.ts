import { chromium, Browser, BrowserContext, Page } from "playwright";


export interface BrowserSession {
    browser: Browser;
    context: BrowserContext;
    page: Page;
}


export class BrowserService {


    public async launch(): Promise<BrowserSession> {


        const browser =
            await chromium.launch({
                headless:false
            });


        const context =
            await browser.newContext();


        const page =
            await context.newPage();


        return {
            browser,
            context,
            page
        };

    }

}