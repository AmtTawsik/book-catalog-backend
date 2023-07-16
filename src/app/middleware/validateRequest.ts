import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Request validator

    try {
      // checks if the req is consistent with the schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      // next middleware if validated successfully
      return next();
    } catch (error) {
      // failsafe for failed validation
      return next(error);
    }
  };

export default validateRequest;
