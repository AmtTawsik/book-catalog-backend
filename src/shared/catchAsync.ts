import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
catchAsync is a higher-order function that wraps an asynchronous Express route handler function
to handle any errors that may occur during its execution.
It catches errors thrown by the wrapped function and forwards them to the next error handling middleware.
@param fn The asynchronous route handler function to be wrapped.
@returns A new function that wraps the route handler function.

@Here is how it works:
The catchAsync function takes an asynchronous route handler function as an argument.
It returns a new function that wraps the route handler function.
Inside the wrapper function, the route handler function is called and awaited.
If the route handler function resolves successfully, the result is passed to the next middleware.
If an error occurs during the execution of the route handler function, it is caught by the wrapper function's try-catch block.
The caught error is forwarded to the next middleware by calling next(error).
This ensures that the error is passed to the Express error handling middleware, where it can be handled and an appropriate response can be sent.
Using catchAsync helps to simplify error handling in asynchronous Express route handlers by abstracting away the try-catch block and the need to manually call next(error) in case of errors. It promotes cleaner and more concise code by handling errors in a centralized manner.
*/
const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Execute the wrapped route handler function and await its result
      await fn(req, res, next);
    } catch (error) {
      // Forward any caught error to the next error handling middleware
      next(error);
    }
  };
};
export default catchAsync;
