import { AccountRepository } from "../repositories/account.repository.js";
import { AccountDTO } from "../types/account.dto.js";
import { AccountDetailDTO } from "../types/account-detail.dto.js";
import { UserRepository } from "../../auth/repositories/user.repository.js";
import { PermissionRepository } from "../../permissions/repositories/permission.repository.js";
import { AppError } from "../../../shared/errors/app-error.js";

export class AccountService {

    private accountRepository = new AccountRepository();

    private userRepository = new UserRepository();

    private permissionRepository = new PermissionRepository();


    public getMyAccounts(
        userId: string
    ): AccountDTO[] {

        const user = this.userRepository.findById(userId);

        if (!user) {

            throw new AppError(
                "User not found",
                404
            );

        }

        if (user.role === "admin") {

            const accounts =
                this.accountRepository.findAll();

            return accounts.map(account => ({

                id: account.id,

                platform: account.platform,
                username: account.username

            }));

        }

        const permissions =
            this.permissionRepository.findByUserId(userId);

        const accountIds =
            permissions.map(
                permission => permission.accountId
            );

        const accounts =
            this.accountRepository.findByIds(accountIds);

        return accounts.map(account => ({

            id: account.id,

            platform: account.platform,
            username: account.username

        }));

    }


    public getAccountById(
        userId: string,
        accountId: string
    ): AccountDetailDTO {

        const account =
            this.accountRepository.findById(accountId);

        if (!account) {

            throw new AppError(
                "Account not found",
                404
            );

        }

        const user =
            this.userRepository.findById(userId);

        if (!user) {

            throw new AppError(
                "User not found",
                404
            );

        }

        if (user.role !== "admin") {

            const hasAccess =
                this.permissionRepository.hasAccess(
                    userId,
                    accountId
                );

            if (!hasAccess) {

                throw new AppError(
                    "Forbidden",
                    403
                );

            }

        }

    return {

        id: account.id,

        platform: account.platform,

        loginUrl: account.loginUrl,

        username: account.username

    };

    }

}