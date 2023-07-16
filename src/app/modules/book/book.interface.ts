import { Model, Types } from 'mongoose';
import { UserType } from '../user/user.interface';

export type BookType = {
  title: string;
  author: string;
  price: number;
  genre:
    | 'Fantasy'
    | 'Xianxia'
    | 'Horror'
    | 'Psychological'
    | 'Action'
    | 'Thriller'
    | 'Sci'
    | 'Comedy';
  publicationDate: string;
  seller: Types.ObjectId | UserType;
};

export type BookModel = Model<BookType, Record<string, unknown>>;

export type BookFilterType = {
  searchTerm?: string;
  price?: string;
  location?: string;
  category?: string;
  breed?: string;
  seller?: string;
};
