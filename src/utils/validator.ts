import { NextFunction, Request, Response } from "express";

import { check, body, validationResult } from "express-validator";
//   const trimValue = value.trim();
//   if (!trimValue.length) {
//     throw new Error(`Invalid ${path}: Whitespace is not allowed.`);
//   }
//   return value;
// };
export const validateRequest = (req:Request, res:Response, next:NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        error: errors.array()[0].msg,
      });
    }
    next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      error: "Some error occurred , Please Try Again Later",
    });
  }
};

export const loginValidator = [
  check("email").notEmpty().bail().isEmail().withMessage("Invalid Email"),
  check("password")
    .notEmpty()
    .bail()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Invalid Password"),
  validateRequest,
];

export const getUserSubmissionValidator = [
  check('submissionId').isMongoId().withMessage('invalid submissionId'),
  validateRequest
];


export const userListItemValidator=[
  check('contentId').isMongoId().withMessage('invalid contentId'),
  check('title').notEmpty().withMessage('name is required'),
  check('description').notEmpty().withMessage('description is required'),
  validateRequest
];