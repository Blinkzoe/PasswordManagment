import { Page } from "playwright";

export interface BaseConnector {

    login(
        page: Page,
        loginUrl: string,
        username: string,
        password: string
    ): Promise<boolean>;

}