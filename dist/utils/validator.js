"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userListItemValidator = exports.getUserSubmissionValidator = exports.loginValidator = exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
//   const trimValue = value.trim();
//   if (!trimValue.length) {
//     throw new Error(`Invalid ${path}: Whitespace is not allowed.`);
//   }
//   return value;
// };
const validateRequest = (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
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
exports.validateRequest = validateRequest;
exports.loginValidator = [
    (0, express_validator_1.check)("email").notEmpty().bail().isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .bail()
        .trim()
        .isLength({ min: 6 })
        .withMessage("Invalid Password"),
    exports.validateRequest,
];
exports.getUserSubmissionValidator = [
    (0, express_validator_1.check)('submissionId').isMongoId().withMessage('invalid submissionId'),
    exports.validateRequest
];
exports.userListItemValidator = [
    (0, express_validator_1.check)('contentId').isMongoId().withMessage('invalid contentId'),
    (0, express_validator_1.check)('title').notEmpty().withMessage('name is required'),
    (0, express_validator_1.check)('description').notEmpty().withMessage('description is required'),
    exports.validateRequest
];
