import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import bcrypt from "bcrypt";
const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        // const salt = randomBytes(10).toString("hex");
        // const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        // return `${buf.toString('hex')}.${salt}`
        let hash;
        bcrypt.genSalt(10, function (error: Error, salt: any) {
            if (error) {
                console.log("ERR SALT GEN", error);
                throw Error("Error in generating salt");
            }
            bcrypt.hash(password, salt, (err: Error, hashh: any) => {
                // Now we can store the password hash in db.
                if (err) {
                    console.log("ERR HASHING", err);
                    throw Error("Error in hashing password");
                }
                hash = hashh;
                console.log("HASH", hash);
            });
        });
        return hash;
    }

    static async compare(suppliedPassword: string, storedHashedPassword: string) {
        // const [hashedPassword, salt] = storedPassword.split('.')
        // const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
        // return buf.toString("hex") === hashedPassword
        let res;
        bcrypt.compare(suppliedPassword, storedHashedPassword, function (
            err: Error,
            ress: any
        ) {
            if (err) {
                console.log("ERR COMPARE PASS", err);
                throw new Error("Error in comparing passwords");
            }
            if (ress == true) {
                res = true;
            } else {
                res = false;
            }

            console.log("RES", res);
        });
        return res;
    }
}
