import { Model, Types } from 'mongoose';
import { IBook } from '../books/book.interface';
import { IUser } from '../users/user.interface';

export type IReview = {
  review: string;
  book: Types.ObjectId | IBook;
  userId: Types.ObjectId | IUser | string;
  id?: string;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;

export type IReviewFilters = {
  searchTerm?: string;
  id?: string;
  book?: string;
};
