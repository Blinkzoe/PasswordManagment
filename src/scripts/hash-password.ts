import { hashPassword } from "../utils/password.js";

async function main(): Promise<void> {

    const password = "123456";

    const hash = await hashPassword(password);

    console.log(hash);

}

main();