import { z } from 'zod';

export const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' }),
    userName: z.string({
      required_error: 'Username is required',
    }),
  }),
});

export const userLoginZodSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
