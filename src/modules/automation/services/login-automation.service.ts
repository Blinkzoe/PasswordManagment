import { OdessaTekConnector } from "../connectors/odessatek.connector.js";
import { AccountRepository } from "../../accounts/repositories/account.repository.js";
import { PasswordService } from "../../vault/services/password.service.js";
import { BrowserService } from "./browser.service.js";
import { AuditRepository } from "../../audit/repositories/audit.repository.js";
import { randomUUID } from "crypto";
import { sessionManager } from "../../sessions/services/session-manager.instance.js";

export class LoginAutomationService {


    private connector =
        new OdessaTekConnector();


    private accountRepository =
        new AccountRepository();


    private passwordService =
        new PasswordService();


    private browserService =
        new BrowserService();

    private auditRepository =
        new AuditRepository();

    public async login(
        userId:string,
        accountId:string
    ){
        const existingSession =
            await sessionManager.findByAccount(
                userId,
                accountId
            );


        if(existingSession){


            this.auditRepository.save({

                id: randomUUID(),

                userId,

                action:"SESSION_REUSED",

                resource:accountId,

                metadata:{
                    sessionId: existingSession.id
                },

                timestamp:new Date()

            });


            return {

                success:true,

                sessionId:
                    existingSession.id,

                reused:true

            };

        }


        const account =
            this.accountRepository.findById(
                accountId
            );


        if(!account){

            throw new Error(
                "Account not found"
            );

        }



        const password =
            this.passwordService.revealPassword(
                userId,
                accountId
            );



        const browserSession =
            await this.browserService.launch();



        const success =
            await this.connector.login(
                browserSession.page,
                account.loginUrl,
                account.username,
                password
            );



        if(!success){

            await browserSession.browser.close();

            return {
                success:false
            };

        }



        const sessionId =
            sessionManager.createSession(
                userId,
                accountId,
                browserSession.browser,
                browserSession.context,
                browserSession.page
            );


        this.auditRepository.save({

            id: randomUUID(),

            userId,

            action:"LOGIN_SUCCESS",

            resource:accountId,

            metadata:{
                sessionId
            },

            timestamp:new Date()

        });

        return {

            success:true,

            sessionId

        };


    }

}