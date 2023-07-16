import mongoose from 'mongoose';
import { GenericErrorMessageType } from '../interface/error';
import { GenericErrorResponseType } from '../interface/common';
import httpStatus from 'http-status';

/**
 * Reshaping the validation error from Mongoose into a generic error response.
 * @param error The Mongoose validation error.
 * @returns The generic error response with status code, message, and error messages.
 * @The_shape will be like:
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
const handleValidationError = (
  error: mongoose.Error.ValidationError // Mongoose validation has it's own type
): GenericErrorResponseType => {
  // Extract the error messages from the validation error
  const errors: GenericErrorMessageType[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const statusCode: number = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
