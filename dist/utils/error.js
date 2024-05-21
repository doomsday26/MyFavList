"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRequiredError = exports.ErrorButOk = exports.TooManyRequestsError = exports.UnprocessableError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.InternalError = exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
class InternalError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}
exports.InternalError = InternalError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
exports.ForbiddenError = ForbiddenError;
class UnprocessableError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, UnprocessableError.prototype);
    }
}
exports.UnprocessableError = UnprocessableError;
class TooManyRequestsError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, TooManyRequestsError.prototype);
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
class ErrorButOk extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ErrorButOk.prototype);
    }
}
exports.ErrorButOk = ErrorButOk;
class PaymentRequiredError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, PaymentRequiredError.prototype);
    }
}
exports.PaymentRequiredError = PaymentRequiredError;
