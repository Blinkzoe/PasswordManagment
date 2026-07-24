import { Browser, Page } from "playwright";
import { BaseConnector } from "./base.connector.js";

export class FacebookConnector implements BaseConnector {

    public async login(
        page: Page,
        loginUrl: string,
        username: string,
        password: string
    ): Promise<boolean> {

        try {

            await page.goto(
                loginUrl,
                {
                    waitUntil: "networkidle"
                }
            );

            console.log(
                "Username:",
                username
            );

            console.log(
                "Password received"
            );

            // TODO:
            // Implement Facebook automation here

            return true;

        } catch (error) {

            console.error(error);

            return false;

        }

    }

}