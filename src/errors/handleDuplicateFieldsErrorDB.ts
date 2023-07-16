import ApiError from './ApiError';

export const handleDuplicateFieldsErrorDB = (err: any) => {
  const path = Object?.keys(err?.keyValue)[0];
  const value = Object?.values(err?.keyValue)[0];
  const errorObj = [
    {
      path: path,
      message: `Duplicate field ${path}, value: ${value}`,
    },
  ];
  const message = `Duplicate ${path}`;
  return new ApiError(message, 400, errorObj);
};
