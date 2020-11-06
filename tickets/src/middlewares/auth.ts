import { Request, Response, NextFunction } from "express";
import { User, UserDocument } from "./../models/User";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { BadRequestError } from "../errors/bad-request-error";

interface UserPayload {
    id: string
    email: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const auth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.token) {
        req.currentUser = undefined
        throw new NotAuthorizedError()
    }
    try {
        const payload = jwt.verify(req.session.token, process.env.JWT_SECRET!) as UserPayload
        req.currentUser = payload
        next()

    } catch (error) {
        req.currentUser = undefined
        throw new BadRequestError("Session expired or invalid token. Please sign in again")
    }

};
