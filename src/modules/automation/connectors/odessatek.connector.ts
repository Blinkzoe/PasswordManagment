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


            await page.goto(
                loginUrl,
                {
                    waitUntil:"networkidle"
                }
            );


            await page
                .locator("a")
                .filter({
                    hasText:"Ingresa aquí"
                })
                .click();


            const frame =
                await page
                .locator("#exampleModal iframe")
                .contentFrame();


            if(!frame){
                throw new Error(
                    "Login iframe not found"
                );
            }


            await frame
            .getByRole("textbox",{
                name:"Cuenta"
            })
            .fill(username);



            await frame
            .getByRole("textbox",{
                name:"***"
            })
            .fill(password);



            await frame
            .getByRole("button",{
                name:"INGRESAR"
            })
            .click();



            await page.waitForTimeout(5000);


            return true;


        } catch(error){

            console.error(error);

            return false;

        }

    }

}