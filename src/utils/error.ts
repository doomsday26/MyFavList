export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
export class InternalError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class UnprocessableError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnprocessableError.prototype);
  }
}

export class TooManyRequestsError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

export class ErrorButOk extends Error { // for handling razorpay non 2xx errors
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ErrorButOk.prototype);
  }
}

export class PaymentRequiredError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, PaymentRequiredError.prototype);
  }
}
