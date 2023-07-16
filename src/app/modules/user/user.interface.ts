import { Model } from 'mongoose';

export type UserNameType = {
  firstName: string;
  lastName: string;
};

export type UserType = {
  role: 'seller' | 'buyer';
  name: UserNameType;
  password: string;
  email: string;
  address: string;
};

export type UserModel = Model<UserType, Record<string, unknown>>;

export type UserFilterType = {
  searchTerm?: string;
  role?: string;
  email?: string;
  address?: string;
};
