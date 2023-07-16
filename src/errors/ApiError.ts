class ApiError extends Error {
  statusCode: number;

  /**
   * Custom Error class for API errors.
   * @param statusCode The HTTP status code for the error.
   * @param message The error message.
   * @param stack Optional stack trace string.
   */
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);
    this.statusCode = statusCode;

    // Set the stack trace if provided, otherwise capture the stack trace.
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
