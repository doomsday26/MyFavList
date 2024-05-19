
import expressAsyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

// Define a custom User interface
interface User {
  _id: string;
}

// Extend the Request interface to include the user property
interface AuthenticatedRequest extends Request {
  user?: User;
}

// Middleware to simulate user authentication
export const isAuthenticated = expressAsyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  // Simulate a user object
  const user: User = {
    _id: '6647004c04fa3053ea1de20e'
  };

  // Attach the user object to the request
  req.user = user;

  // Proceed to the next middleware or route handler
  next();
});