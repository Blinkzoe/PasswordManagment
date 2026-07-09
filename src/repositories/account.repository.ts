import fs from "fs";
import path from "path";
import { Account } from "../types/account.js";


export class AccountRepository {


    public findAll(): Account[] {

        const filePath = path.join(
            process.cwd(),
            "src",
            "database",
            "accounts.json"
        );


        const fileContent = fs.readFileSync(
            filePath,
            "utf-8"
        );


        const accounts: Account[] = JSON.parse(fileContent);


        return accounts;

    }
    
    public findByIds(ids: string[]): Account[] {

    const accounts = this.findAll();

    return accounts.filter(account => ids.includes(account.id));

    }


}