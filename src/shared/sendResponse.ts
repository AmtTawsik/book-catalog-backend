import { Response } from 'express';

type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  status: 'success';
  message?: string | null;
  data?: T | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};

const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: true,
    status: data.status,
    message: data.message || null,
    meta: data.meta,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
