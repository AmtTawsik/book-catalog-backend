import { Schema, model } from 'mongoose';
import { genre } from './book.constant';
import { BookModel, BookType } from './book.interface';

const bookSchema = new Schema<BookType, BookModel>(
  {
    title: {
      type: String,
      required: [true, 'name is missing!'],
    },
    author: {
      type: String,
      required: [true, 'Author is missing!'],
    },
    publicationDate: {
      type: String,
      required: [true, 'Publication date is missing!'],
    },
    genre: {
      type: String,
      enum: {
        values: genre,
        message: '{VALUE} is not matched',
      },
      required: [true, 'genre is missing!'],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'seller is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<BookType, BookModel>('Book', bookSchema);
