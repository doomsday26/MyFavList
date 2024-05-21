"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const index_1 = require("../logger/index");
const error_1 = require("./error");
const index_2 = __importDefault(require("../logger/index"));
const config_1 = __importDefault(require("../utils/config"));
const asyncHandler = (fnc) => (req, res, next) => {
    return Promise.resolve(fnc(req, res, next)).catch((err) => {
        const reqObjectData = (0, index_1.getLogDataFromReqObject)(req);
        index_2.default.error(`${reqObjectData} , Message -  ${JSON.stringify(err)}`);
        config_1.default.ENV === 'development' && console.log(err);
        let status = 500;
        let error = err.message;
        if (err instanceof error_1.BadRequestError) {
            status = 400;
        }
        else if (err instanceof error_1.NotFoundError) {
            status = 404;
        }
        else if (err instanceof error_1.UnauthorizedError) {
            status = 401;
        }
        else if (err instanceof error_1.ForbiddenError) {
            status = 403;
        }
        else if (err instanceof error_1.UnprocessableError) {
            status = 422;
        }
        else if (err instanceof error_1.InternalError) {
            status = 500;
        }
        else if (err instanceof error_1.TooManyRequestsError) {
            status = 429;
        }
        else if (err instanceof error_1.ErrorButOk) {
            status = 200;
        }
        else if (err instanceof error_1.PaymentRequiredError) {
            status = 402;
        }
        else {
            error = 'Internal Server Error Occured';
        }
        return res.status(status).json({
            error: error
        });
    });
};
exports.asyncHandler = asyncHandler;
