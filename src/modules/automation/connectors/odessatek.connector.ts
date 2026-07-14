import { chromium } from "playwright";
import { BaseConnector } from "./base.connector.js";

export class OdessaTekConnector implements BaseConnector {

    public async login(
        loginUrl: string,
        username: string,
        password: string
    ): Promise<boolean> {

        const browser = await chromium.launch({
            headless: false
        });

        try {

            const page = await browser.newPage();

            // Abrir la página principal
            await page.goto(
                loginUrl,
                {
                    waitUntil: "networkidle"
                }
            );

            // Abrir el modal de login
            await page
                .locator("a")
                .filter({
                    hasText: "Ingresa aquí"
                })
                .click();

            // Esperar el iframe
            const iframeLocator =
                page.locator("#exampleModal iframe");

            await iframeLocator.waitFor();

            const frame =
                await iframeLocator.contentFrame();

            if (!frame) {
                throw new Error(
                    "Login iframe not found."
                );
            }

            // Usuario
            await frame
                .getByRole("textbox", {
                    name: "Cuenta"
                })
                .fill(username);

            // Password
            await frame
                .getByRole("textbox", {
                    name: "***"
                })
                .fill(password);

            // Login
            await frame
                .getByRole("button", {
                    name: "INGRESAR"
                })
                .click();

            // Esperar unos segundos
            await page.waitForTimeout(5000);

            return true;

        } catch (error) {

            console.error(error);

            return false;

        } finally {

            await browser.close();

        }

    }

}