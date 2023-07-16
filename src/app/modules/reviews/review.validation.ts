import { z } from 'zod';

export const createReviewZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: 'Review is required',
    }),
    book: z.string({
      required_error: 'Book id is required',
    }),
  }),
});

export const updateBookZodSchema = z.object({
  body: z.object({
    review: z.string().optional(),
    book: z.string().optional(),
  }),
});
