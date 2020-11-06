import mongoose from "mongoose";
import { Password } from "./../services/password";
import bcrypt from "bcrypt";

// interface for creating user
// interface UserAttributes {
//     email: string;
//     password: string;
// }

// interface for user model properties
// interface UserModel extends mongoose.Model<UserDocument> {
//     build(attrs: UserAttributes): UserDocument;
// }


// an interface that describes properties of a user document
export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    comparePasswords(password: string, cb: Function): any;
}

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            index: true,
            sparse: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        // toJSON: {
        //     transform(doc, ret) {
        //         ret.id = ret._id;
        //         delete ret._id;
        //         delete ret.__v;
        //         delete ret.createdAt;
        //         delete ret.updatedAt;
        //         delete ret.password;
        //     },
        // },
    }
);

// userSchema.pre<IUser>("save", async function (next) {
//     let user = this;
//     if (user.password && user.isModified("password")) {
//         bcrypt.genSalt(10, (err, salt) => {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, (err, hash) => {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 console.log("HASHHH", user.password)
//                 return next();
//             });
//         });
//     }

//     return next();
// });

// userSchema.methods.comparePasswords = function (
//     candidatePassword: string,
//     cb: Function
// ) {
//     bcrypt.compare(candidatePassword, this.get("password"), function (
//         err,
//         isMatch
//     ) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

// userSchema.statics.build = (attributes: UserAttributes) => {
//     return new User(attributes);
// };

const User = mongoose.model<UserDocument>("User", userSchema);
export { User };
