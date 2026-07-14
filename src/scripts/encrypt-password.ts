import { encrypt } from "../utils/encryption.js";

const password = "asdsdpkpdkpainfe";

const encrypted = encrypt(password);

console.log(encrypted);