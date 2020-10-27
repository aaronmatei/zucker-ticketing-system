import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
import { RequestValidationError } from "./../../errors/request-validation-errors"

export const runValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    next()
}