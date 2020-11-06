import { check } from "express-validator"

const validateUserSignUp = [
    check('email')
        .isEmail()
        .withMessage('Email not valid')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .trim()
        .escape(),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6, max: 32 })
        .withMessage('Password length must be between 6 and 32 characters')
        .trim()
        .escape()
]

const validateUserSignIn = [
    check('email')
        .isEmail()
        .withMessage('Email not valid')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .trim()
        .exists(),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6, max: 32 })
        .withMessage('Password length must be between 6 and 32 characters')
        .trim()
        .escape()
]

export { validateUserSignIn, validateUserSignUp }