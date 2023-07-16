import { Model, Types } from 'mongoose';
import { IBook } from '../books/book.interface';
import { IUser } from '../users/user.interface';

export type IStatus = 'notStarted' | 'reading' | 'soon' | 'finished';

export type ITrack = {
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser | string;
  status: IStatus;
  id?: string;
};

export type TrackModel = Model<ITrack, Record<string, unknown>>;

export type ITrackFilters = {
  searchTerm?: string;
  id?: string;
  book?: string;
  user?: string;
};
