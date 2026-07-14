export interface Account {

    id: string;

    platform: string;

    loginUrl: string;

    username: string;

    encryptedPassword: string;

    totpSecret: string;

}