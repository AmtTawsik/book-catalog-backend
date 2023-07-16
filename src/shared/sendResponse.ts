import { Response } from 'express';

/**
@ApiResponseType is a generic type that represents the structure of an API response.
It defines the statusCode, success, message, meta and data properties.
The statusCode indicates the HTTP status code of the response.
The success indicates whether the request was successful.
The message provides an optional descriptive message about the response.
The meta provide some extra necessary information like pagination info. Can be null if not applicable.
The data holds the payload of the response. Can be null if not applicable.
*/
type ApiResponseType<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta: {
    page: number;
    limit: number;
    total: number;
  } | null;
  data: T | null;
};

/**
 * @sendResponse is a utility function that sends an API response with the provided data.
 * It constructs a response object using the statusCode, success, message, and data properties.
 * The constructed response object is sent as a JSON response using the res parameter.
 *
 * @param res The Express Response object used to send the response.
 * @param data The data object containing the properties of the API response.
 * @returns The Express Response object representing the sent response.
 */
const sendResponse = <T>(res: Response, data: ApiResponseType<T>): Response => {
  const responseData: ApiResponseType<T> = {
    statusCode: data?.statusCode,
    success: data?.success,
    message: data?.message || null,
    meta: data?.meta || null,
    data: data?.data || null,
  };
  return res.status(data?.statusCode).json(responseData);
};

export default sendResponse;
