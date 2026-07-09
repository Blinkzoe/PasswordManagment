import fs from "fs";
import path from "path";
import { User } from "../types/user.js";

export class UserRepository {

    public findById(id: string): User | undefined {

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

        const users: User[] = JSON.parse(fileContent);

        return users.find(user => user.id === id);

    }

}