import ApiError from './ApiError';

export const handleBadValueError = () => {
  const message = `Invalid value or api url`;
  return new ApiError(message, 400);
};
