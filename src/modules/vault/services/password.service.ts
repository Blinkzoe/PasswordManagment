import { AccountRepository } from "../../accounts/repositories/account.repository.js";
import { PermissionRepository } from "../../permissions/repositories/permission.repository.js";
import { decrypt } from "./encryption.js";
import { AppError } from "../../../shared/errors/app-error.js";
import { AuditRepository } from "../../audit/repositories/audit.repository.js";
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