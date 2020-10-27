import { Request, Response, NextFunction } from "express";
import { User, UserDocument } from "./../models/User";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "./../services/password";
import jwt from "jsonwebtoken";


const currentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(200).json({
        loggedInUser: req.currentUser
    })

};

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    // generate jwt
    async function generateSignUPJWT(user: UserDocument) {
        try {
            const token = await jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                },
                // config.get("jwtSecret"),
                process.env.JWT_SECRET!,
                { expiresIn: "1h" }
            );
            return token;
        } catch (error) {
            console.log("TE", error.message);
            throw new BadRequestError("Error occured. Try again Later");
        }
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new BadRequestError("Email is taken");
    }

    const newUser = User.build({ email, password });
    generateSignUPJWT(newUser)
        .then((token) => {
            req.session = {
                token,
            };
            newUser
                .save()
                .then((user) => {
                    return res.status(201).json({
                        message: "User created successfully",
                        token,
                        user,
                    });
                })
                .catch((err) => {
                    return res.status(400).json({
                        message: "Could not save user",
                        error: err,
                    });
                });
        })
        .catch((err) => {
            // throw new BadRequestError(err.message)
            res.status(400).json({
                error: err.message,
            });
        });
};

const signInUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        throw new BadRequestError("Email provided is not registered")
    }

    const passwordsMatch = await Password.compare(existingUser.password, password)
    if (!passwordsMatch) {
        throw new BadRequestError("Wrong password. Please try again")
    }

    generateSignINJWT(existingUser)
        .then(token => {
            req.session = {
                token,
            }

            // req.user = {
            //     existingUser
            // }

            res.status(200).json({
                message: "Sign in was successfull",
                user: existingUser,
                token,
                sessionToken: req.session
            })


        })
        .catch(err => {
            res.status(400).json({
                error: err.message,
            });
        })
    async function generateSignINJWT(user: UserDocument) {
        try {
            const token = await jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                },
                // config.get("jwtSecret"),
                process.env.JWT_SECRET!,
                { expiresIn: "1h" }
            );
            return token;
        } catch (error) {
            throw new BadRequestError("Error occured. Try again Later");
        }
    }


};

const signOutUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.session = null
    return res.status(200).json({})

};

export { currentUser, signUpUser, signInUser, signOutUser };
