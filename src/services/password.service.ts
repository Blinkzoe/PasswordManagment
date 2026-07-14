import { AccountRepository } from "../repositories/account.repository.js";
import { PermissionRepository } from "../repositories/permission.repository.js";
import { decrypt } from "../utils/encryption.js";
import { AppError } from "../errors/app-error.js";
import { AuditRepository } from "../repositories/audit.repository.js";
import crypto from "crypto";

export class PasswordService {


    private accountRepository =
        new AccountRepository();


    private permissionRepository =
        new PermissionRepository();

    
    private auditRepository =
        new AuditRepository();


    public revealPassword(
        userId: string,
        accountId: string
    ): string {


        const hasAccess =
            this.permissionRepository.hasAccess(
                userId,
                accountId
            );


        if (!hasAccess) {

            throw new AppError(
                "Access denied",
                403
            );

        }


        const account =
            this.accountRepository.findById(
                accountId
            );


        if (!account) {

            throw new AppError(
                "Account not found",
                404
            );

        }


        const password =
            decrypt(
                account.encryptedPassword
            );


        this.auditRepository.save({

            id: crypto.randomUUID(),

            userId,

            action: "REVEAL_PASSWORD",

            resource: accountId,

            timestamp:
                new Date().toISOString()

        });


        return password;
    }

}