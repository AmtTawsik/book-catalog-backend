import { Model, Types } from 'mongoose';
import { IBook } from '../books/book.interface';
import { IUser } from '../users/user.interface';

export type IWishlist = {
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser | string;
  id?: string;
};

export type WishlistModel = Model<IWishlist, Record<string, unknown>>;

export type IWishlistFilters = {
  searchTerm?: string;
  id?: string;
  book?: string;
  user?: string;
};
