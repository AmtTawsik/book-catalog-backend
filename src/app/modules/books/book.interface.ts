import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';

export type IStatus = 'reading' | 'soon' | 'finished';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  image: string;
  addedBy: Types.ObjectId | IUser | string;
  description?: string;
  id?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};
