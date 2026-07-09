import { AccountRepository } from "../repositories/account.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { PermissionRepository } from "../repositories/permission.repository.js";
import { AccountDTO } from "../types/account.dto.js";
import { AppError } from "../errors/app-error.js";

export class AccountService {

    private accountRepository = new AccountRepository();
    private userRepository = new UserRepository();
    private permissionRepository = new PermissionRepository();

    public getAccountsByUserId(userId: string): AccountDTO[] {

        const user = this.userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                "User not found",
                404
            );
        }

        const permissions = this.permissionRepository.findByUserId(userId);

        const accountIds = permissions.map(
            permission => permission.accountId
        );

        const accounts = this.accountRepository.findByIds(accountIds);

        const accountsDTO = accounts.map(account => {

            return {
                id: account.id,
                platform: account.platform
            };

        });

        return accountsDTO;

    }

}