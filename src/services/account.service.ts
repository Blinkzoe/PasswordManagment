import { AccountRepository } from "../repositories/account.repository.js";
import { Account } from "../types/account.js";


export class AccountService {

    private accountRepository = new AccountRepository();


    public getAccounts(): Account[] {

        return this.accountRepository.findAll();

    }

}