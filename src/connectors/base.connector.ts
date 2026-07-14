export interface BaseConnector {


    login(
        loginUrl: string,
        username: string,
        password: string
    ): Promise<boolean>;


}