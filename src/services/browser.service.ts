import { chromium, Browser } from "playwright";


export class BrowserService {


    public async launch(): Promise<Browser> {


        const browser =
            await chromium.launch({
                headless: true
            });


        return browser;

    }

}