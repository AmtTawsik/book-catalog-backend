import mongoose from 'mongoose';
import { GenericErrorResponseType } from '../interface/common';
import { GenericErrorMessageType } from '../interface/error';
import httpStatus from 'http-status';

const handleCastError = (
  error: mongoose.Error.CastError // Mongoose cast error has it's own type
): GenericErrorResponseType => {
  // Extract the error messages from the validation error
  const errors: GenericErrorMessageType[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];

  const statusCode: number = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
