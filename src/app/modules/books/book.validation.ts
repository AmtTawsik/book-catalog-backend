import { z } from 'zod';

export const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Book title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationYear: z.string({
      required_error: 'Publication year is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
  }),
});

export const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publication: z.string().optional(),
    image: z.string().optional(),
  }),
});
