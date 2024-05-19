"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { check, body, validationResult } = require("express-validator");
// const hasNoWhitespace = (value:any, { path:any }) => {
//   const trimValue = value.trim();
//   if (!trimValue.length) {
//     throw new Error(`Invalid ${path}: Whitespace is not allowed.`);
//   }
//   return value;
// };
const validateRequest = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                error: errors.array()[0].msg,
            });
        }
        next();
    }
    catch (error) {
        return res.status(422).json({
            success: false,
            error: "Some error occurred , Please Try Again Later",
        });
    }
};
const loginValidator = [
    check("email").notEmpty().bail().isEmail().withMessage("Invalid Email"),
    check("password")
        .notEmpty()
        .bail()
        .trim()
        .isLength({ min: 6 })
        .withMessage("Invalid Password"),
    validateRequest,
];
const getUserSubmissionValidator = [
    check('submissionId').isMongoId().withMessage('invalid submissionId'),
    validateRequest
];
module.exports = {
    loginValidator,
    getUserSubmissionValidator
};
