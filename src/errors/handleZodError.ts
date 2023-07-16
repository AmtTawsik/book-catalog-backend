import { ZodError, ZodIssue } from 'zod';
import { IGenereicErrorMessage } from '../interfaces/errorMessage';
import ApiError from './ApiError';

export const handleZodError = (error: ZodError) => {
  const errorsObj: IGenereicErrorMessage[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    }
  );

  const message = `Validation Error`;
  const ob = new ApiError(message, 400, errorsObj);
  return ob;
};
