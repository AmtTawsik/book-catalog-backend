import { IGenereicErrorMessage } from '../interfaces/errorMessage';

class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  status: string;
  errorMessages: IGenereicErrorMessage[];

  constructor(
    message: string | undefined,
    statusCode: number,
    errorMessages: IGenereicErrorMessage[] = [],
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errorMessages = errorMessages.length
      ? errorMessages
      : [{ path: '', message: this.message }];
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
