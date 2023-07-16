import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';
import catchAsync from '../../shared/catchAsync';

export const validateRequest = (
  schema: AnyZodObject | ZodEffects<AnyZodObject>
) =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    }
  );
