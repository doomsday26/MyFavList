import { getLogDataFromReqObject } from '../logger/index';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError, ErrorButOk, ForbiddenError, InternalError, NotFoundError, PaymentRequiredError, TooManyRequestsError, UnauthorizedError, UnprocessableError } from './error';
import logger from '../logger/index';
import config from '../utils/config';

export const asyncHandler = (fnc: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    return Promise.resolve(fnc(req, res, next)).catch((err) => {
        const reqObjectData = getLogDataFromReqObject(req);
        logger.error(`${reqObjectData} , Message -  ${JSON.stringify(err)}`);
        config.ENV === 'development' && console.log(err);
        let status = 500;
        let error = err.message;
        if (err instanceof BadRequestError) {
            status = 400;
        }
        else if (err instanceof NotFoundError) {
            status = 404;
        }
        else if (err instanceof UnauthorizedError) {
            status = 401;
        }
        else if (err instanceof ForbiddenError) {
            status = 403;
        }
        else if (err instanceof UnprocessableError) {
            status = 422;
        }
        else if (err instanceof InternalError) {
            status = 500;
        }
        else if (err instanceof TooManyRequestsError) {
            status = 429;
        }
        else if (err instanceof ErrorButOk) {
            status = 200;
        } else if (err instanceof PaymentRequiredError) {
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
