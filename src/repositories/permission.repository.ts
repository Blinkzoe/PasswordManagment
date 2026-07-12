import fs from "fs";
import path from "path";
import { Permission } from "../types/permission.js";


export class PermissionRepository {


    public findByUserId(
        userId: string
    ): Permission[] {


        const filePath = path.join(
            process.cwd(),
            "src",
            "database",
            "permissions.json"
        );


        const fileContent =
            fs.readFileSync(
                filePath,
                "utf-8"
            );


        const permissions: Permission[] =
            JSON.parse(fileContent);


        return permissions.filter(
            permission =>
                permission.userId === userId
        );

    }

}