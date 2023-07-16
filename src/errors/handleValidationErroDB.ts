import mongoose from 'mongoose';
import { IGenereicErrorMessage } from '../interfaces/errorMessage';
import ApiError from './ApiError';

export const handleValidationErrorDB = (
  err: mongoose.Error.ValidationError
) => {
  const errorsObj: IGenereicErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    }
  );

  const message = `Validation Error`;
  return new ApiError(message, 400, errorsObj);
};
