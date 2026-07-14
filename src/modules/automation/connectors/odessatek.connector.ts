import { Page } from "playwright";
import { BaseConnector } from "./base.connector.js";

export class OdessaTekConnector implements BaseConnector {

    public async login(
        page: Page,
        loginUrl: string,
        username: string,
        password: string
    ): Promise<boolean> {

        try {

            console.log("Opening page...");

            await page.goto(
                loginUrl,
                {
                    waitUntil: "networkidle"
                }
            );

            console.log("Opening login dialog...");

            await page
                .locator("a")
                .filter({
                    hasText: "Ingresa aquí"
                })
                .click();

            console.log("Getting iframe...");

            const frame =
                await page
                    .locator("#exampleModal iframe")
                    .contentFrame();

            if (!frame) {
                throw new Error("Login iframe not found");
            }

            console.log("Typing username...");

            await frame
                .getByRole("textbox", {
                    name: "Cuenta"
                })
                .fill(username);

            console.log("Typing password...");

            await frame
                .getByRole("textbox", {
                    name: "***"
                })
                .fill(password);

            console.log("Clicking login...");

            await frame
                .getByRole("button", {
                    name: "INGRESAR"
                })
                .click();

            console.log("Waiting for portal...");

            try {

                await page
                    .locator(".principalOptionWelcome")
                    .waitFor({
                        state: "visible",
                        timeout: 20000
                    });

                console.log("Portal detected.");

            } catch (error) {

                console.log("Portal NOT detected.");

            }

            console.log("Current URL:", page.url());

            console.log("Current title:", await page.title());

            console.log("Frames:");

            for (const frame of page.frames()) {
                console.log(frame.url());
            }

            console.log("Finished login.");

            return true;

        } catch (error) {

            console.error(error);

            return false;

        }

    }

}