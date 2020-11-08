import { check } from "express-validator"

const validateAddTicket = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required')
        .trim()
        .escape(),
    check('price')
        .not()
        .isEmpty()
        .withMessage('Price is required')
        .isFloat({ gt: 0.0 })
        .withMessage("Price must be float and greater than 0")
        .trim()
        .escape()
]

const validateEditTicket = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required')
        .trim()
        .escape(),
    check('price')
        .not()
        .isEmpty()
        .withMessage('Price is required')
        .isFloat({ gt: 0.0 })
        .withMessage("Price must be float and greater than 0")
        .trim()
        .escape()
]

export { validateAddTicket, validateEditTicket }