import { encrypt } from "../modules/vault/services/encryption.js";

const password = "asdsdpkpdkpainfe";

const encrypted = encrypt(password);

console.log(encrypted);