import { z } from 'zod';
import { genre } from './book.constant';
const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    author: z.string({
      required_error: 'author is required',
    }),
    genre: z.enum([...genre] as [string, ...string[]], {
      required_error: 'location is required',
    }),
    publicationDate: z.string({
      required_error: 'publication date is required',
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    location: z.enum([...genre] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
