import { z } from 'zod';

export const createTrackZodSchema = z.object({
  body: z.object({
    book: z.string({
      required_error: 'Book id is required',
    }),
  }),
});

export const updateTrackZodSchema = z.object({
  body: z.object({
    book: z.string().optional(),
    status: z.string().optional(),
  }),
});
