import ApiError from './ApiError';

export const handleTokenError = () => {
  const message = `JWT expired`;
  return new ApiError(message, 401);
};