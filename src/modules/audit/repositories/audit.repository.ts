import fs from "fs";
import path from "path";
import { AuditLog } from "../../../shared/types/audit-log.js";

export class AuditRepository {


    private filePath = path.join(
        process.cwd(),
        "src",
        "database",
        "audit-logs.json"
    );



    public save(
        log: AuditLog
    ): void {


        const fileContent =
            fs.readFileSync(
                this.filePath,
                "utf-8"
            );


        const logs: AuditLog[] =
            JSON.parse(fileContent);



        logs.push(log);



        fs.writeFileSync(
            this.filePath,
            JSON.stringify(
                logs,
                null,
                4
            )
        );

    }


    public findAll(): AuditLog[] {


        const fileContent =
            fs.readFileSync(
                this.filePath,
                "utf-8"
            );


        return JSON.parse(
            fileContent
        );

    }

}