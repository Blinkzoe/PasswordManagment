import { OdessaTekConnector } from "../connectors/odessatek.connector.js";
import { AccountRepository } from "../repositories/account.repository.js";
import { PasswordService } from "./password.service.js";

export class LoginAutomationService {

    private connector =
        new OdessaTekConnector();

    private accountRepository =
        new AccountRepository();

    private passwordService =
        new PasswordService();

    public async login(
        userId: string,
        accountId: string
    ) {

        const account =
            this.accountRepository.findById(
                accountId
            );

        if (!account) {

            throw new Error(
                "Account not found"
            );

        }

        const password =
            this.passwordService.revealPassword(
                userId,
                accountId
            );

        const success =
            await this.connector.login(
                account.loginUrl,
                account.username,
                password
            );

        return {
            success
        };

    }

}