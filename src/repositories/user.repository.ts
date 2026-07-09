import fs from "fs";
import path from "path";
import { User } from "../types/user.js";


export class UserRepository {


    private getUsers(): User[] {

        const filePath = path.join(
            process.cwd(),
            "src",
            "database",
            "users.json"
        );


        const fileContent = fs.readFileSync(
            filePath,
            "utf-8"
        );


        return JSON.parse(fileContent);

    }



    public findById(id: string): User | undefined {

        const users = this.getUsers();

        return users.find(
            user => user.id === id
        );

    }



    public findByUsername(
        username: string
    ): User | undefined {


        const users = this.getUsers();


        return users.find(
            user => user.username === username
        );

    }

}