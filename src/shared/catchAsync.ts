/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

type FnType = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsync = (fn: FnType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
