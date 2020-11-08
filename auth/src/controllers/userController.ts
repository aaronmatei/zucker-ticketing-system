import { Request, Response, NextFunction } from "express";
import { User } from "./../models/User";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "./../services/password";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        loggedInUser: req.currentUser || null,
    });
};

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    // generate jwt
    async function generateSignUPJWT(user: any) {
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

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new BadRequestError("Email is taken");
    }

    const newUser = new User({ email, password });
    generateSignUPJWT(newUser)
        .then((token) => {
            req.session = {
                token,
            };

            // hash password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    throw new Error("Error in generating salt");
                }
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw new Error("Error in hashing password");
                    }
                    newUser.password = hash;

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
                            throw new BadRequestError("Error in saving user");
                        });
                });
            });
        })
        .catch((err) => {
            throw new BadRequestError("Error in generating token");
            // res.status(400).json({
            //     error: err.message,
            // });
        });
};

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    await User.findOne({ email }).exec((err, foundUser) => {
        if (err) {
            throw new Error("Error in getting user with that email");
        }
        if (!foundUser) {
            return res.status(400).json({
                errors: [{ message: "Email provided is not registered" }]
            });
            // throw new Error("Email provided is not registered");
        }
        if (foundUser) {

            bcrypt.compare(password, foundUser.password, function (
                err: Error,
                isMatch: boolean
            ) {
                if (err) {
                    throw new Error("Error in comparing passwords.....");
                }
                if (!isMatch) {
                    return res.status(400).json({
                        errors: [{ message: "Ooops....Wrong password" }]

                    });
                    // throw new BadRequestError("Ooops....Wrong password");
                    // throw new Error("Ooops....Wrong password");
                }

                generateSignINJWT(foundUser)
                    .then((token) => {
                        req.session = {
                            token,
                        };

                        // req.user = {
                        //     existingUser
                        // }

                        res.status(200).json({
                            message: "Sign in was successfull",
                            user: foundUser,
                            token,
                            sessionToken: req.session,
                        });
                    })
                    .catch((err) => {
                        throw new BadRequestError("Error in generating sign in token");
                        // res.status(400).json({
                        //     error: err.message,
                        // });
                    });
            });
        }
    });

    // generate signin token
    async function generateSignINJWT(user: any) {
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
            throw new Error("Error occured in generating sign in token");
        }
    }
};

const signOutUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session = null;
        return res.status(200).json({
            message: "Signed out",
        });
    } catch (error) {
        throw new BadRequestError("Error occured while signing you out");
    }
};

export { getCurrentUser, signUpUser, signInUser, signOutUser };
