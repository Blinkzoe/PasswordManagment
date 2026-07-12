export interface Account {

    id: string;

    userId: string;

    platform: string;

    loginUrl: string;

    username: string;

    encryptedPassword: string;

    totpSecret: string;

}