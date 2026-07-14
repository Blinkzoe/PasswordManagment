import { chromium } from "playwright";
import { BaseConnector } from "./base.connector.js";


export class FacebookConnector
implements BaseConnector {


    public async login(
        loginUrl: string,
        username: string,
        password: string
    ): Promise<boolean> {


        const browser =
            await chromium.launch({
                headless:false
            });


        const page =
            await browser.newPage();



        await page.goto(
            loginUrl
        );



        await page.waitForTimeout(
            3000
        );



        console.log(
            "Username:",
            username
        );


        console.log(
            "Password received"
        );



        await browser.close();



        return true;

    }

}