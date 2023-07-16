import { z } from 'zod';

export const createWishlistZodSchema = z.object({
  body: z.object({
    book: z.string({
      required_error: 'Book id is required',
    }),
  }),
});

export const updateWishlistZodSchema = z.object({
  body: z.object({
    book: z.string().optional(),
  }),
});
