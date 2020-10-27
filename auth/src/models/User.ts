import mongoose from "mongoose";
import { Password } from "./../services/password";

// interface for creating user
interface UserAttributes {
    email: string;
    password: string;
}

// interface for user model properties
interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserAttributes): UserDocument;
}

// an interface that describes properties of a user document
interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
                delete ret.createdAt
                delete ret.updatedAt
                delete ret.password

            }
        }
    }
);

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }

    done();
});

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
export { User, UserDocument, UserModel };
