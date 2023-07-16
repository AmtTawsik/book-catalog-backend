import config from '../../config';
import ApiError from '../../errors/ApiError';
import { ErrorRequestHandler } from 'express';
import { GenericErrorMessageType } from '../../interface/error';
import handleValidationError from '../../errors/handleValidationError';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import httpStatus from 'http-status';
import handleCastError from '../../errors/handleCastError';

/* 
we can use ErrorRequestHandler type for (err, req, res, next) all of the parameters
*/
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  /*
   This function takes a generic error for the whole project meaning, all the error converges here
   */
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = 'Something went wrong!' as string;
  let errorMessages: GenericErrorMessageType[] = [];

  // for simplification because the complex info is not always recognized
  let simplifiedError;

  // For mongoose validation
  switch (true) {
    case error?.name === 'ValidationError':
      /*The mongoose error is reshaped into a general error response format by "handleValidation". because faults can come in a variety of forms across various technologies.

       * It provides a consistent format for the status code, message, and error messages.
       */
      simplifiedError = handleValidationError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorMessages = simplifiedError?.errorMessages;
      break;

    case error?.name === 'CastError':
      /**
       The mongoose's error is transformed into a generic error response format by "handleCastError" because errors can take on different representations depending on the technology. 
       It provides a consistent format for the status code, message, and error messages..
       */
      simplifiedError = handleCastError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorMessages = simplifiedError?.errorMessages;
      // ...
      break;

    case error instanceof ZodError:
      /*"handleZodError" aids in transforming the Zod error into a generic error response format. 
      Because faults can come in a variety of forms across various technologies. 
      The status code, message, and error messages are returned.
       */
      simplifiedError = handleZodError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorMessages = simplifiedError?.errorMessages;
      // ...
      break;

    case error instanceof ApiError:
      /*Services may send errors using a specially created "ApiError" when an error comes from any API service. 
      Here, the error is reshaped to appear like a general response
       */
      statusCode = error?.statusCode;
      message = error?.message;
      errorMessages = error?.message
        ? [
            {
              path: '',
              message: error?.message,
            },
          ]
        : [];
      // ...
      break;

    case error instanceof Error:
      /*
      We catch the error and reshape it to appear as a generic answer when an error is issued by the built-in Error constructor.
       */
      message = error?.message;
      errorMessages = error?.message
        ? [
            {
              path: '',
              message: error?.message,
            },
          ]
        : [];
      // ...
      break;
  }

  // Generic response for Error
  next();
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config?.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
