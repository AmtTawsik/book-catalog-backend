import { ZodError, ZodIssue } from 'zod';
import { GenericErrorResponseType } from '../interface/common';
import { GenericErrorMessageType } from '../interface/error';
import httpStatus from 'http-status';

/**
 * Reshaping the validation error from Zod into a generic error response.
 * @param error The Zod error.
 * @returns The generic error response with status code, message, and error messages.
 {
  statusCode = statusCode;
  message = message;
  errorMessages = message
    ? [
        {
          path: '',
          message: error?.message,
        },
      ]
    : []
  };
 */
const handleZodError = (error: ZodError): GenericErrorResponseType => {
  // Extract the error messages from the Zod error
  const errors: GenericErrorMessageType[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    }
  );

  const statusCode: number = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Zod Error',
    errorMessages: errors,
  };
};

export default handleZodError;
