import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'first name is required',
      }),
      lastName: z.string({
        required_error: 'last name is required',
      }),
    }),
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    role: z.string().optional(),
    password: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
  }),
});

const userLoginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

// Export the validation schema as part of the UserValidation object
export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  userLoginZodSchema,
};
