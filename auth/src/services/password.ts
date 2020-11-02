import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
const bcrypt = require("bcrypt");

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        // const salt = randomBytes(10).toString("hex");
        // const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        // return `${buf.toString('hex')}.${salt}`
        let hash;
        bcrypt.hash(password, 10, (err: Error, hashh: string) => {
            // Now we can store the password hash in db.
            if (err) throw Error("Error in hashing password");
            hash = hashh;
        });
        return hash;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        // const [hashedPassword, salt] = storedPassword.split('.')
        // const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
        // return buf.toString("hex") === hashedPassword
        let res
        bcrypt.compare(suppliedPassword, storedPassword, function (
            err: Error,
            ress: boolean
        ) {
            if (err) throw new Error("Error in comparing passwords");
            if (ress == true) {
                res = true
            } else {
                res = false
            }

        });
        return res
    }
}
